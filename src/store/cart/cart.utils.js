// import { useDispatch, useSelector } from "react-redux";
// import { setCartItems } from "./cart.action";
// import { selectCartItems } from "./cart.selector";

// const addCartItem = (cartItems, productToAdd) => {
//   // find if cardItems contains productToAdd
//   const existingCartItem = cartItems.find(
//     (item) => item.id === productToAdd.id
//   );
//   // If found, increase quantity by 1
//   if (existingCartItem) {
//     return cartItems.map((item) =>
//       item.id === productToAdd.id
//         ? { ...item, quantity: item.quantity + 1 }
//         : item
//     );
//   }
//   // If not found, add productToAdd to cardItems
//   return [...cartItems, { ...productToAdd, quantity: 1 }];
// };

// const removeCartItem = (cartItems, productToRemove) => {
//   const existingCartItem = cartItems.find(
//     (item) => item.id === productToRemove.id
//   );

//   if (existingCartItem.quantity === 1) {
//     return cartItems.filter((item) => item.id !== existingCartItem.id);
//   }

//   return cartItems.map((item) =>
//     item.id === existingCartItem.id
//       ? { ...item, quantity: item.quantity - 1 }
//       : item
//   );
// };

// const deleteItemFromCart = (cartItems, productToRemove) => {
//   return cartItems.filter((item) => item.id !== productToRemove.id);
// };

// const UpdateCartItemsReducer = (newCartItems) => {
//   const dispatch = useDispatch();
//   const newCartCount = newCartItems.reduce(
//     (acc, item) => acc + item.quantity,
//     0
//   );
//   const newCartTotal = newCartItems.reduce(
//     (acc, item) => acc + item.quantity * item.price,
//     0
//   );

//   dispatch(
//     setCartItems({
//       cartCount: newCartCount,
//       cartTotal: newCartTotal,
//       cartItems: newCartItems,
//     })
//   );
// };

// const AddItemToCart = (productToAdd) => {
//   const cartItems = useSelector(selectCartItems);

//   const newCartItems = addCartItem(cartItems, productToAdd);
//   UpdateCartItemsReducer(newCartItems);
// };

// const RemoveItemFromCart = (productToRemove) => {
//   const cartItems = useSelector(selectCartItems);

//   const newCartItems = removeCartItem(cartItems, productToRemove);
//   UpdateCartItemsReducer(newCartItems);
// };

// const ClearItemFromCart = (productToRemove) => {
//   const cartItems = useSelector(selectCartItems);

//   const newCartItems = deleteItemFromCart(cartItems, productToRemove);
//   UpdateCartItemsReducer(newCartItems);
// };

// export { AddItemToCart, RemoveItemFromCart, ClearItemFromCart };
