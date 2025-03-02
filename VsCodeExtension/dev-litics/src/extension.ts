// src/extension.ts
import * as vscode from 'vscode';
import * as path from 'path';
import { DevConstants } from './utils/constants';
import { LanguageTracker } from './components/tracker';
import { UserManager } from './components/user';
import { DevServices } from './services/dev-services';
import { formatTime } from './utils/script';
import StatsTreeDataProvider from './components/stats-provider'; 
import { ProjectTracker } from './components/project-tracker'; // Import the new ProjectTracker

const projectTracker = new ProjectTracker();
const tracker = new LanguageTracker();
const userManager = new UserManager();
const devServices = new DevServices(tracker, userManager);

export function activate(context: vscode.ExtensionContext) {
    const statsProvider = new StatsTreeDataProvider(tracker,userManager);
    vscode.window.registerTreeDataProvider('devlitics.stats', statsProvider);

    let inactivityTimeout: NodeJS.Timeout | undefined; // Timeout for inactivity
    const INACTIVITY_DELAY = 30 * 1000; // 30 seconds of inactivity to trigger API call
    
    // Get current project name from workspace
    const getCurrentProjectName = (): string => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
            return workspaceFolders[0].name;
        }
        return 'Unnamed Project';
    };

    // Function to handle activity and reset inactivity timer
    const handleActivity = () => {
        tracker.userActivityDetected();
        tracker.trackTimeSpent(userManager.getUserKey());
        statsProvider.refresh();

        // Clear existing timeout
        if (inactivityTimeout) {
            clearTimeout(inactivityTimeout);
        }

        // Set new timeout to send data after inactivity
        inactivityTimeout = setTimeout(async () => {
            await devServices.sendDataToAPI();
            statsProvider.refresh(); // Update view after sending data
        }, INACTIVITY_DELAY);
    };

    context.subscriptions.push(
        vscode.commands.registerCommand(`${DevConstants.EXTENSION_PREFIX}.enterUserKey`, async () => {
            await userManager.promptForUserKey();
            await devServices.fetchPreviousData();
            statsProvider.refresh();
        })
    );
    
    context.subscriptions.push(
        vscode.commands.registerCommand(`${DevConstants.EXTENSION_PREFIX}.startTracking`, async () => {
            const userKey = userManager.getUserKey();
            if (!userKey) {
                const resUserKey = await userManager.promptForUserKey();
                if (!resUserKey) {return;} // Exit if no valid key
            }
            
            await devServices.fetchPreviousData();
            vscode.window.showInformationMessage('Tracking Started!');
            tracker.setActive(true);
            statsProvider.refresh();
        })
    );
    
    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument((e) => {
            handleActivity();

            const filePath = e.document.uri.fsPath;
            const projectName = getCurrentProjectName();
            projectTracker.trackFileActivity(filePath, projectName);

        })
    );

    context.subscriptions.push(
        vscode.window.onDidChangeTextEditorSelection(() => {
            handleActivity();

            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const projectName = getCurrentProjectName();
                projectTracker.trackFileActivity(editor.document.uri.fsPath, projectName);
            }
        })
    );

    // Periodic syncing as a fallback
    const interval = setInterval(() =>{
         devServices.sendDataToAPI();
         statsProvider.refresh();
    
    }, DevConstants.SYNC_INTERVAL);
    
    context.subscriptions.push({ 
        dispose: () => {
            clearInterval(interval);
            if (inactivityTimeout) {clearTimeout(inactivityTimeout);} // Clean up inactivity timeout
        }
    });
}

export async function deactivate() {
    tracker.trackTimeSpent(userManager.getUserKey());
    tracker.cleanup();
    const projectName = vscode.workspace.workspaceFolders?.[0]?.name || 'Unnamed Project';
    projectTracker.trackTimeSpent(projectName);
    projectTracker.cleanup();
    await devServices.sendDataToAPI(); // Final send on deactivation
}