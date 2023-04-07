import { useContext } from "react";
import {
  ShoppingIcon,
  CartIconContainer,
  ItemCount,
} from "./cart-icon.styles.jsx";
import { CartContext } from "../../contexts/cart.context.jsx";

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
