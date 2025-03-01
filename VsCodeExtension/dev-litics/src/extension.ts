// src/extension.ts
import * as vscode from 'vscode';
import * as path from 'path';
import { DevConstants } from './utils/constants';
import { LanguageTracker } from './components/tracker';
import { UserManager } from './components/user';
import { DevServices } from './services/dev-services';
import { formatTime } from './utils/script';
import StatsTreeDataProvider from './components/stats-provider'; 

const tracker = new LanguageTracker();
const userManager = new UserManager();
const devServices = new DevServices(tracker, userManager);

export function activate(context: vscode.ExtensionContext) {
    const statsProvider = new StatsTreeDataProvider(tracker);
    vscode.window.registerTreeDataProvider('devlitics.stats', statsProvider);

    let inactivityTimeout: NodeJS.Timeout | undefined; // Timeout for inactivity
    const INACTIVITY_DELAY = 30 * 1000; // 30 seconds of inactivity to trigger API call

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
        vscode.workspace.onDidChangeTextDocument(() => {
            handleActivity();
        })
    );

    context.subscriptions.push(
        vscode.window.onDidChangeTextEditorSelection(() => {
            handleActivity();
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
    await devServices.sendDataToAPI(); // Final send on deactivation
}