import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import App from "./App";

// ──────────────────────────────────────────────
// Sentry Initialization
// All sensitive values come from .env (prefixed with REACT_APP_)
// ──────────────────────────────────────────────
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),   // Tracks page-load & navigation performance
    Sentry.replayIntegration(),           // Records session replays on errors
  ],
  tracesSampleRate: parseFloat(process.env.REACT_APP_SENTRY_TRACES_SAMPLE_RATE) || 1.0,
  replaysSessionSampleRate: parseFloat(process.env.REACT_APP_SENTRY_REPLAYS_SESSION_SAMPLE_RATE) || 0.1,
  replaysOnErrorSampleRate: parseFloat(process.env.REACT_APP_SENTRY_REPLAYS_ERROR_SAMPLE_RATE) || 1.0,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Sentry ErrorBoundary catches React rendering errors */}
    <Sentry.ErrorBoundary fallback={<h2>Something went wrong (Sentry caught it).</h2>}>
      <App />
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);
