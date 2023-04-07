import Button from "../button/button.component";
import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles.jsx";

import CartItem from "../cart-item/cart-item.component";

import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";

const CartDropdown = () => {
  const { setIsCartOpen, cartItems } = useContext(CartContext);
  let navigate = useNavigate();
  const goToCheckoutHandler = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
