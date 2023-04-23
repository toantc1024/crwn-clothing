import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectCartCount = createSelector(
  [selectCartReducer],
  (cartSlice) =>
    cartSlice.cartItems.reduce((acc, item) => acc + item.quantity, 0)
);

export const selectCartTotal = createSelector(
  [selectCartReducer],
  (cartSlice) =>
    cartSlice.cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    )
);

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.isCartOpen
);
