import "./checkout-item.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemToCart,
} from "../../store/cart/cart.action";

const CheckoutItem = ({ item }) => {
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  const clearItemHandler = () => {
    dispatch(clearItemFromCart(cartItems, item));
  };

  const removeItemHandler = () => {
    dispatch(removeItemToCart(cartItems, item));
  };

  const addItemHandler = () => {
    dispatch(addItemToCart(cartItems, item));
  };
  const { name, price, imageUrl, quantity } = item;
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>

      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        {quantity}
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">${price}</span>
      <div onClick={clearItemHandler} className="remove-button">
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
