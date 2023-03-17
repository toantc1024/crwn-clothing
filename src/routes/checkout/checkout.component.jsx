import { Fragment, useContext } from "react";
import CartItem from "../../components/cart-item/cart-item.component";
import { CartContext } from "../../contexts/cart.context";

const Checkout = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const totalMoney = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  return (
    <div>
      {cartItems.map((item) => (
        <Fragment>
          <button
            onClick={() => {
              if (item.quantity > 1) {
                item.quantity -= 1;
              }
              setCartItems([...cartItems]);
            }}
          >
            Decrease
          </button>
          <button>{item.quantity}</button>
          <button
            id={`inc${item.id}`}
            onClick={() => {
              item.quantity += 1;
              console.log(item);
              setCartItems([...cartItems]);
              const btn = document.getElementById(`inc${item.id}`);
              btn.addEventListener("click", () => {
                item.quantity += 9;
                setCartItems([...cartItems]);
              });
            }}
          >
            Increase
          </button>
          <button
            onClick={() => {
              // Remove item from array
              const newCartItems = cartItems.filter(
                (cartItem) => cartItem.id !== item.id
              );

              console.log(item.id, cartItems, newCartItems);
              setCartItems(newCartItems);
            }}
          >
            Remove
          </button>
          <CartItem item={item} />
        </Fragment>
      ))}
      <div>Total: ${totalMoney}</div>
    </div>
  );
};

export default Checkout;
