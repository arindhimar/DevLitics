# DevLitics - VS Code Extension

## 🚀 Overview
DevLitics is a VS Code extension that tracks coding time per project based on workspace activity. It provides real-time stats on coding hours, helping developers stay productive and analyze their workflow.

## 📥 Installation
### **From VSIX (Local Installation)**
1. Clone the repository:
   ```sh
   git clone link_to_repo
   cd dev-litics
   ```
2. Install dependencies:
   ```sh
   npm install
   npm run watch
   ```
3. Goto visual studio code extension guide : [View](./vsc-extension-quickstart.md).

## ⚙️ Setup & Running
1. Open the **Command Palette** (`Ctrl+Shift+P`)
2. Run `DevLitics: Enter User Key` and input your tracking key
3. Run `DevLitics: Start Tracking` to begin tracking coding time (prompts for key if unset)
4. View coding stats in the **DevLitics Statistics** panel (Activity Bar)

## 📊 Features
✅ Tracks active coding time per project
✅ Displays time spent per file & folder
✅ Stores data locally with an option to sync
✅ Works seamlessly with multiple workspaces
✅ Dedicated **DevLitics Statistics** view

## 🛠️ Usage Guide
- Open a workspace folder to start tracking
- View time spent per project in the **Activity Bar**
- Stop tracking anytime using `DevLitics: Stop Tracking`

## ❓ Troubleshooting
| Issue                | Cause                         | Solution                             |
|----------------------|-----------------------------|--------------------------------------|
| No data recorded    | Tracking not started        | Run `DevLitics: Start Tracking`     |
| Time not updating   | Extension issue             | Restart VS Code, check console logs |
| Wrong project name  | No folder opened            | Open a workspace folder             |

## 📜 License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## 🤝 Contributing
Pull requests and feature suggestions are welcome! Open an issue to discuss improvements.
