import { createContext, useEffect, useState } from "react";

const addCardItem = (cartItems, productToAdd) => {
  // find if cardItems contains productToAdd
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );
  // If found, increase quantity by 1
  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  // If not found, add productToAdd to cardItems
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== existingCartItem.id);
  }

  return cartItems.map((item) =>
    item.id === existingCartItem.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

const deleteItemFromCart = (cartItems, productToRemove) => {
  return cartItems.filter((item) => item.id !== productToRemove.id);
};

const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);
  const addItemToCart = (productToAdd) => {
    setCartItems(addCardItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = (productToRemove) => {
    setCartItems(deleteItemFromCart(cartItems, productToRemove));
  };

  const value = {
    addItemToCart,
    removeItemFromCart,
    isCartOpen,
    setIsCartOpen,
    cartItems,
    cartCount,
    setCartItems,
    clearItemFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartProvider, CartContext };

/**
 * id,
 * name,
 * price,
 * imageUrl,
 * quantity,
 */
