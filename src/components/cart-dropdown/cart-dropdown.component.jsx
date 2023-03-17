import Button from "../button/button.component";
import "./cart-dropdown.styles.scss";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";

import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
  const { setIsCartOpen } = useContext(CartContext);

  let navigate = useNavigate();
  const routeChange = () => {
    setIsCartOpen(false);
    let path = `checkout`;
    navigate(path);
  };
  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <Button onClick={routeChange}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
