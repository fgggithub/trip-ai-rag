import React, { ErrorInfo } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";
import App from "./App.tsx";
import "./index.css";
import config from "../amplify_outputs.json";
import ErrorBoundary from "./ErrorBoundary.tsx";

Amplify.configure(config);



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <ErrorBoundary>
      <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
