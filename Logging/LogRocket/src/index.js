import React from "react";
import ReactDOM from "react-dom/client";
import LogRocket from "logrocket";
import App from "./App";

// ──────────────────────────────────────────────
// LogRocket Initialization
// All sensitive values come from .env (prefixed with REACT_APP_)
// ──────────────────────────────────────────────
// LogRocket records user sessions (clicks, network requests, console logs, errors)
// so you can replay exactly what the user did when a bug happened.
LogRocket.init(process.env.REACT_APP_LOGROCKET_APP_ID);

// Optional: Identify the user so sessions are tied to a specific user
LogRocket.identify("demo-user-123", {
  name: "Demo User",
  email: "demo@example.com",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
