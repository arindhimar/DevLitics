// src/tracker.ts
import * as vscode from 'vscode';
import { DevInterfaces } from '../utils/interfaces';
import { DevConstants } from '../utils/constants';

export class LanguageTracker {
    private startTime: number = Date.now();
    private activeLanguage?: string;
    private languageUsage: DevInterfaces.LanguageUsage = {};
    private isUserActive: boolean = false;
    private typingTimer?: NodeJS.Timeout; // For debouncing
    private lastHeartbeatTime?: number; // Track last update
    private static readonly HEARTBEAT_INTERVAL = 5000; // 2 minutes in ms

    trackTimeSpent(userKey?: string) {
        if (!this.isUserActive || !userKey) {return;}

        // Clear existing timer if user is still active
        if (this.typingTimer) {
            clearTimeout(this.typingTimer);
        }

        const editor = vscode.window.activeTextEditor;
        if (editor) {
            this.activeLanguage = editor.document.languageId.toLowerCase();

            // Set a debounced timer to update time after inactivity
            this.typingTimer = setTimeout(() => {
                this.updateLanguageUsage();
            }, LanguageTracker.HEARTBEAT_INTERVAL);
        }
    }

    private updateLanguageUsage() {
        if (!this.activeLanguage || !this.lastHeartbeatTime) {
            this.lastHeartbeatTime = this.startTime;
            return;
        }

        const now = Date.now();
        if (now - this.lastHeartbeatTime >= LanguageTracker.HEARTBEAT_INTERVAL) {
            const timeSpent = now - this.lastHeartbeatTime; // Time since last heartbeat
            console.log(`Updating ${this.activeLanguage} with ${timeSpent} ms`);
            this.languageUsage[this.activeLanguage] = 
                (this.languageUsage[this.activeLanguage] || 0) + timeSpent;
            this.lastHeartbeatTime = now;
        }
    }

    userActivityDetected() {
        this.isUserActive = true;
        if (!this.lastHeartbeatTime) {
            this.startTime = Date.now(); // Initial start time
            this.lastHeartbeatTime = this.startTime;
        }
    }

    convertToApiFormat(): DevInterfaces.LanguageEntry[] {
        const afterConv =  Object.entries(this.languageUsage).map(([language, time]) => ({
            language_name: language.toLowerCase(),
            language_time: (time / DevConstants.TIME_CONVERSION_UNIT).toString() // Convert ms to min
        }));
        console.log(afterConv);
        return afterConv;
    }

    setLanguageUsage(usage: DevInterfaces.LanguageUsage) {
        this.languageUsage = Object.fromEntries(
            Object.entries(usage).map(([lang, time]) => [lang.toLowerCase(), time])
        );
    }

    getLanguageUsage(): DevInterfaces.LanguageUsage {
        return this.languageUsage;
    }

    setActive(active: boolean) {
        this.isUserActive = active;
        if (!active && this.typingTimer) {
            clearTimeout(this.typingTimer); // Clean up timer on deactivation
            this.updateLanguageUsage(); // Final update when deactivated
        }
    }

    // Cleanup method for extension unload
    cleanup() {
        if (this.typingTimer) {
            clearTimeout(this.typingTimer);
        }
        this.updateLanguageUsage(); // Ensure final time is recorded
    }
}