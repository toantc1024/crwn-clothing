import React from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";

import App from "./App";
import { UserProvider } from "./contexts/user.context";
import { CategoriesProvider } from "./contexts/categories.context";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./contexts/cart.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <CategoriesProvider>
      <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProvider>
    </CategoriesProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
