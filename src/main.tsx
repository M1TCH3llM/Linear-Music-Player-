import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

   // Don't need tsc - r to run the typescript compiler for building the project in Package.json

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);