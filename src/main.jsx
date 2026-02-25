import { createRoot } from "react-dom/client";
import "./index.css";
import "../src/styles/globals.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./app/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
