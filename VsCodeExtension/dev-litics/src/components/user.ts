import * as vscode from 'vscode';
import { validateUser } from '../services/api';
export class UserManager {
    private userKey?: string;

    async promptForUserKey(): Promise<string | undefined> {
        this.userKey = await vscode.window.showInputBox({
            placeHolder: 'Enter your unique key',
            prompt: 'This key is required to start tracking',
            ignoreFocusOut: true
        });

        if (!this.userKey) {
            vscode.window.showErrorMessage('Tracking cannot start without a valid key.');
            return undefined;
        }

        // Validate the user key
        try {
            const isValid = await validateUser(this.userKey);
            if (isValid) {
                vscode.window.showInformationMessage('Key validated successfully! You can now start tracking.');
                return this.userKey;
            } else {
                vscode.window.showErrorMessage('Invalid user key. Please try again.');
                this.userKey = undefined; // Clear invalid key
                return undefined;
            }
        } catch (error) {
            console.error('Error validating user key:', error);
            vscode.window.showErrorMessage('Failed to validate key. Please check your connection or key.');
            this.userKey = undefined; // Clear on error
            return undefined;
        }
    }

    getUserKey(): string | undefined {
        return this.userKey;
    }
}