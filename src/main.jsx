import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {Toaster} from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store/index.js";
import ModalProvider from "./context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <Provider store={store}>
        <ModalProvider>
          <App/>
        </ModalProvider>
      </Provider>
      <Toaster position="bottom-right" reverseOrder={false}/>
  </StrictMode>
);
