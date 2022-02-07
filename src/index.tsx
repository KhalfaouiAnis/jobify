import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context/appContext";
import { ConfirmContextProvider } from "./context/confirmContext";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <ConfirmContextProvider>
        <App />
      </ConfirmContextProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
