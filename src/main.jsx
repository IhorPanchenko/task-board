import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import { Suspense } from "react";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <StyleSheetManager shouldForwardProp={(prop) => prop !== "shake"}>
        <App />
      </StyleSheetManager>
    </BrowserRouter>
  </Suspense>
);
