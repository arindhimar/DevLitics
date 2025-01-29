import React from "react"
import ReactDOM from "react-dom/client"
import { ThemeProvider } from "./lib/theme-provider"
import LandingPage from "./pages/LandingPage"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <LandingPage />
    </ThemeProvider>
  </React.StrictMode>,
)

