import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { id, name, imageUrl, price } = product;

  const { addItemToCart } = useContext(CartContext);
  const addProductToCart = () => {
    addItemToCart(product);
  };

  return (
    <div key={id} className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to card
      </Button>
    </div>
  );
};

export default ProductCard;
