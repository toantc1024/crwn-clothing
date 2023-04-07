import React from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store/store";
import { CartProvider } from "./contexts/cart.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </Provider>
);
