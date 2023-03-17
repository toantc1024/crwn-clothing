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

const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  console.log(cartCount);
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCardItem(cartItems, productToAdd));
  };

  const value = {
    addItemToCart,
    isCartOpen,
    setIsCartOpen,
    cartItems,
    cartCount,
    setCartItems,
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
