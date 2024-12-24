import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { StyleSheetManager } from "styled-components";
import { Suspense } from "react";
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <StyleSheetManager shouldForwardProp={(prop) => prop !== "shake"}>
          <App />
        </StyleSheetManager>
      </BrowserRouter>
    </Suspense>
  </Provider>
);
