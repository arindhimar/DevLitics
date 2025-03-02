import * as vscode from 'vscode';
import * as path from 'path';

import { DevConstants } from '../utils/constants';
import { LanguageTracker } from '../components/tracker';
import { formatTime } from '../utils/script';
import languageIcons from '../utils/languageIcons.json';
import { UserManager } from './user';

export default class StatsTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | null | void> = new vscode.EventEmitter<vscode.TreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

    constructor(private tracker: LanguageTracker , private user : UserManager) {}

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: vscode.TreeItem): Thenable<vscode.TreeItem[]> {
        if (element) {return Promise.resolve([]);} // No children for items

        const usage = this.tracker.getLanguageUsage();
        const items: vscode.TreeItem[] = [];
        const user_id = this.user.getUserKey();

        // If there's usage data, show it
        for (const [language, time] of Object.entries(usage)) {
            const timeString = formatTime(time);
            const treeItem = new vscode.TreeItem(
                `${language}: ${timeString}`,
                vscode.TreeItemCollapsibleState.None
            );
            treeItem.iconPath = this.getLanguageIcon(language);
            items.push(treeItem);
        }

        // If no data, show appropriate message
        if (items.length === 0) {
            if (!user_id) {
                const startItem = new vscode.TreeItem(
                    'Start Tracking',
                    vscode.TreeItemCollapsibleState.None
                );
                startItem.command = {
                    command: `${DevConstants.EXTENSION_PREFIX}.startTracking`,
                    title: 'Start Tracking',
                    tooltip: 'Click to start tracking your coding time'
                };
                startItem.iconPath = new vscode.ThemeIcon('play'); // Use a play icon
                items.push(startItem);
            } else {
                const waitingItem = new vscode.TreeItem(
                    "Let's start coding..",
                    vscode.TreeItemCollapsibleState.None
                );
                waitingItem.tooltip = 'Statistics will appear once you start coding';
                waitingItem.iconPath = new vscode.ThemeIcon('sync'); // Use a statistics/graph icon
                items.push(waitingItem);
            }
        }

        return Promise.resolve(items);
    }

    private getLanguageIcon(language: string): vscode.Uri | vscode.ThemeIcon {
        const iconFile = (languageIcons as { [key: string]: string })[language.toLowerCase()] || languageIcons.default;
        return vscode.Uri.file(path.join(__dirname, '..', 'media', 'icons', iconFile));
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }
}