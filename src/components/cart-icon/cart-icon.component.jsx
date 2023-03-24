import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import {
  ShoppingIcon,
  CartIconContainer,
  ItemCount,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
  const { cartCount, isCartOpen, setIsCartOpen } = useContext(CartContext);

  const toggleCartDropdown = () => setIsCartOpen(!isCartOpen);
  return (
    <CartIconContainer onClick={() => toggleCartDropdown()}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
