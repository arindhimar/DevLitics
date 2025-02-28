const vscode = require("vscode");

class LanguageTracker {
    constructor() {
        this.trackingData = new Map();
        this.activeLanguage = null;
        this.lastActivityTime = performance.now();
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        this.statusBarItem.show();
        this.disposables = [];
        this.isEditorFocused = true;
        this.startListeners();
    }

    startListeners() {
        this.disposables.push(
            vscode.window.onDidChangeActiveTextEditor(this.handleEditorChange.bind(this)),
            vscode.workspace.onDidChangeTextDocument(this.registerActivity.bind(this)),
            vscode.window.onDidChangeTextEditorSelection(this.registerActivity.bind(this)),
            vscode.window.onDidChangeWindowState(this.handleWindowFocus.bind(this))
        );
    }

    handleEditorChange(editor) {
        if (editor && editor.document) {
            this.activeLanguage = editor.document.languageId;
            this.registerActivity();
        } else {
            this.activeLanguage = null;
        }
        this.updateStatusBar();
    }

    handleWindowFocus(windowState) {
        this.isEditorFocused = windowState.focused;
        if (!this.isEditorFocused) {
            this.lastActivityTime = null;
        } else {
            this.registerActivity();
        }
    }

    registerActivity() {
        if (!this.isEditorFocused || !this.activeLanguage) return;
        const currentTime = performance.now();
        if (this.lastActivityTime) {
            const elapsedTime = (currentTime - this.lastActivityTime) / 1000; // Convert ms to sec
            this.trackingData.set(
                this.activeLanguage,
                (this.trackingData.get(this.activeLanguage) || 0) + elapsedTime
            );
        }
        this.lastActivityTime = currentTime;
        this.updateStatusBar();
    }

    updateStatusBar() {
        if (this.activeLanguage) {
            const time = this.trackingData.get(this.activeLanguage) || 0;
            this.statusBarItem.text = `$(clock) ${this.activeLanguage}: ${this.formatTime(time)}`;
        } else {
            this.statusBarItem.text = "$(clock) No active language";
        }
    }

    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${hours}h ${minutes}m ${remainingSeconds}s`;
    }

    getSessionSummary() {
        if (this.trackingData.size === 0) {
            return "No activity recorded.";
        }
        return Array.from(this.trackingData.entries())
            .sort(([, a], [, b]) => b - a)
            .map(([lang, time]) => `${lang}: ${this.formatTime(time)}`)
            .join("\n");
    }

    resetTimer() {
        this.trackingData.clear();
        this.activeLanguage = null;
        this.lastActivityTime = performance.now();
        this.updateStatusBar();
    }

    dispose() {
        this.disposables.forEach((d) => d.dispose());
        this.statusBarItem.dispose();
    }
}

let languageTracker;

function activate(context) {
    console.log("✅ Dev-Litics initialized.");
    languageTracker = new LanguageTracker();

    context.subscriptions.push(
        vscode.commands.registerCommand("dev-litics.showTimeSummary", () => {
            vscode.window.showInformationMessage(languageTracker.getSessionSummary());
        }),
        vscode.commands.registerCommand("dev-litics.resetTimer", () => {
            languageTracker.resetTimer();
            vscode.window.showInformationMessage("🔄 Timer reset successfully!");
        })
    );
}

function deactivate() {
    console.log("⏹️ Dev-Litics deactivated.");
    if (languageTracker) {
        languageTracker.dispose();
    }
}

module.exports = { activate, deactivate };
