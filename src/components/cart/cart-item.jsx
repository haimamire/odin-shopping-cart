import { Trash } from "lucide-react";
import styles from "./cart-item.module.css";
import { toFixed } from "../../utils/roundNumber";

const CartItem = ({ product, removeItem, updateItem }) => {
  const increaseQuantity = () => {
    updateQuantity(product.quantity + 1);
  };

  const decreaseQuantity = () => {
    updateQuantity(product.quantity - 1);
  };

  const handleInputQuantity = (e) => {
    let quantity = e.target.value;

    // Doesn't let you delete the item just from the input
    if (e.target.value === "") quantity = 1;

    updateQuantity(Number(quantity));
  };

  const updateQuantity = (quantity) => {
    if (quantity <= 0) {
      removeItem(product.id);
      return;
    }
    updateItem(product.id, quantity);
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  return (
    <li className={styles.itemContainer} data-testid="cart-item">
      <div className={styles.imgContainer}>
        <img
          src={product.image}
          alt=""
          width="50px"
          data-testid="product-img"
        />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.nameQuantityContainer}>
          <div className={styles.nameRemoveBtn}>
            <div className={styles.name}>
              <p>{product.title}</p>
            </div>
            <button
              title="Remove from shopping cart"
              aria-label={`Remove ${product.title} from shopping cart`}
              className={styles.removeBtn}
              onClick={handleRemove}
              data-testid="remove-btn"
            >
              <Trash size="18px" color="black" opacity={0.4} />
            </button>
          </div>
          <div className={styles.quantity}>
            <button
              disabled={product.quantity === 1}
              onClick={decreaseQuantity}
              aria-label="Remove 1 of the same item"
              data-testid="decrease-quantity-btn"
            >
              <span aria-hidden="true">-</span>
            </button>
            <input
              type="number"
              value={product.quantity}
              onChange={handleInputQuantity}
              aria-label="Current number of the same item"
              data-testid="cart-item-quantity"
            />
            <button
              onClick={increaseQuantity}
              aria-label="Add 1 more of the same item"
              data-testid="increase-quantity-btn"
            >
              <span aria-hidden="true">+</span>
            </button>
          </div>
        </div>
        <div
          className={styles.price}
          aria-label="Price"
          data-testid="product-price"
        >
          {`$${toFixed(product.price * product.quantity, 2)}`}
        </div>
      </div>
    </li>
  );
};

export default CartItem;
