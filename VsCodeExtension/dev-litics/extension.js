const vscode = require("vscode");

class DevLitics {
    constructor() {
        this.languageTracking = new Map(); // Efficient data storage
        this.currentLanguage = null;
        this.startTime = null;
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        this.idleTimer = null;
        this.IDLE_THRESHOLD = 60 * 1000; // 1-minute idle timeout
    }

    // Start tracking a new language session
    startTracking(language) {
        if (this.currentLanguage) this.updateTracking();

        this.currentLanguage = language;
        this.startTime = Date.now();
        this.resetIdleTimer();
        this.updateStatusBar();
    }

    // Update elapsed time for the current language
    updateTracking() {
        if (!this.currentLanguage || !this.startTime) return;

        const elapsed = (Date.now() - this.startTime) / 1000;
        this.languageTracking.set(
            this.currentLanguage,
            (this.languageTracking.get(this.currentLanguage) || 0) + elapsed
        );

        this.startTime = Date.now();
    }

    // Reset idle timeout to prevent false inactivity detection
    resetIdleTimer() {
        if (this.idleTimer) clearTimeout(this.idleTimer);

        this.idleTimer = setTimeout(() => {
            this.updateTracking();
            this.startTime = null;
            this.currentLanguage = null;
            this.updateStatusBar();
        }, this.IDLE_THRESHOLD);
    }

    // Display tracking info in the status bar
    updateStatusBar() {
        if (this.currentLanguage) {
            const timeSpent = this.languageTracking.get(this.currentLanguage) || 0;
            this.statusBarItem.text = `$(clock) ${this.currentLanguage}: ${timeSpent.toFixed(1)}s`;
            this.statusBarItem.show();
        } else {
            this.statusBarItem.hide();
        }
    }

    // Generate a summary of all tracked languages
    getSessionSummary() {
        let summary = "🕒 **Time Spent Per Language:**\n\n";
        if (this.languageTracking.size === 0) {
            summary += "No data recorded in this session.";
        } else {
            this.languageTracking.forEach((time, lang) => {
                summary += `📌 ${lang}: **${time.toFixed(1)} sec**\n`;
            });
        }
        return summary;
    }
}

// Initialize DevLitics tracking instance
const devLitics = new DevLitics();

// VS Code activation hook
function activate(context) {
    console.log("✅ Dev-Litics initialized.");

    vscode.workspace.onDidOpenTextDocument((doc) => {
        devLitics.startTracking(doc.languageId);
    });

    vscode.window.onDidChangeActiveTextEditor((editor) => {
        if (editor) devLitics.startTracking(editor.document.languageId);
    });

    vscode.workspace.onDidChangeTextDocument(() => devLitics.resetIdleTimer());
    vscode.window.onDidChangeTextEditorSelection(() => devLitics.resetIdleTimer());

    vscode.window.onDidChangeWindowState((state) => {
        if (!state.focused) {
            devLitics.updateTracking();
            devLitics.startTime = null;
        } else if (devLitics.currentLanguage) {
            devLitics.startTime = Date.now();
            devLitics.resetIdleTimer();
        }
    });

    // Register commands
    const showSummaryCommand = vscode.commands.registerCommand("dev-litics.showTimeSummary", () => {
        vscode.window.showInformationMessage(devLitics.getSessionSummary());
    });

    const resetCommand = vscode.commands.registerCommand("dev-litics.resetTimer", () => {
        devLitics.languageTracking.clear();
        devLitics.currentLanguage = null;
        devLitics.startTime = null;
        devLitics.updateStatusBar();
        vscode.window.showInformationMessage("🔄 Timer reset successfully!");
    });

    context.subscriptions.push(showSummaryCommand, resetCommand, devLitics.statusBarItem);
}

// VS Code deactivation hook
function deactivate() {
    console.log("⏹️ Dev-Litics deactivated.");
    devLitics.updateTracking();
}

module.exports = { activate, deactivate };
