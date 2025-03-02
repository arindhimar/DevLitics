import * as vscode from 'vscode';
import { DevConstants } from '../utils/constants';
export class ProjectTracker {
    private projectUsage: Record<string, { totalTime: number; files: Set<string> }> = {};
    private lastActivity: number = Date.now();
    private active: boolean = false;
    private heartbeatInterval: NodeJS.Timeout | undefined;

    constructor() {
        this.startHeartbeat();
    }

    private startHeartbeat() {
        this.heartbeatInterval = setInterval(() => {
            if (this.active) {
                const currentProject = this.getCurrentProject();
                if (currentProject) {
                    this.trackTimeSpent(currentProject);
                    console.log(`Heartbeat: Updated time for ${currentProject}`);
                }
            }
        }, DevConstants.PROJECT_HEARTBEAT_INTERVAL);
    }

    private stopHeartbeat() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = undefined;
            console.log('Heartbeat stopped');
        }
    }

    // Helper to get the current project (assumes workspace folder name)
    private getCurrentProject(): string | undefined {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
            return workspaceFolders[0].name;
        }
        return undefined;
    }

    setActive(active: boolean) {
        this.active = active;
        if (active) {
            this.lastActivity = Date.now();
            console.log('Tracking activated, lastActivity reset to:', this.lastActivity);
            if (!this.heartbeatInterval) {
                this.startHeartbeat();
            }
        } else {
            this.stopHeartbeat();
            console.log('Tracking deactivated');
        }
    }

    userActivityDetected() {
        if (this.active) {
            this.lastActivity = Date.now();
            console.log('Activity detected, lastActivity updated to:', this.lastActivity);
        }
    }

    trackTimeSpent(projectName: string) {
        if (!this.active) {
            console.log('Tracking is not active, skipping time tracking');
            return;
        }

        const now = Date.now();
        const timeSpent = now - this.lastActivity;

        if (!this.projectUsage[projectName]) {
            this.projectUsage[projectName] = { totalTime: 0, files: new Set() };
        }

        if (timeSpent > 0) {
            this.projectUsage[projectName].totalTime += timeSpent;
            console.log(`Time tracked for ${projectName}: ${timeSpent}ms, Total: ${this.projectUsage[projectName].totalTime}ms`);
        } else {
            console.log(`No time spent recorded for ${projectName}, timeSpent: ${timeSpent}ms`);
        }

        this.lastActivity = now;
    }

    trackFileActivity(filePath: string, projectName: string) {
        if (!this.projectUsage[projectName]) {
            this.projectUsage[projectName] = { totalTime: 0, files: new Set() };
        }
        this.projectUsage[projectName].files.add(filePath);
        console.log(`File activity tracked for ${projectName}: ${filePath}, Total files: ${this.projectUsage[projectName].files.size}`);
    }

    getProjectUsage() {
        console.log('Current project usage:', this.projectUsage);
        return this.projectUsage;
    }

    cleanup() {
        this.stopHeartbeat();
        console.log('Cleaning up ProjectTracker');
        // Add any additional cleanup logic if needed
    }
}