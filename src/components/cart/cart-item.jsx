import { Trash } from "lucide-react";
import styles from "./cart-item.module.css";

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
    <div className={styles.itemContainer}>
      <div className={styles.imgContainer}>
        <img src={product.image} alt="" width="50px" />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.nameQuantityContainer}>
          <div className={styles.nameRemoveBtn}>
            <div className={styles.name}>
              <p>{product.title}</p>
            </div>
            <button
              title="Remove from shopping cart"
              className={styles.removeBtn}
              onClick={handleRemove}
            >
              <Trash size="18px" color="black" opacity={0.4} />
            </button>
          </div>
          <div className={styles.quantity}>
            <button
              disabled={product.quantity === 1}
              onClick={decreaseQuantity}
            >
              -
            </button>
            <input
              type="number"
              value={product.quantity}
              onChange={handleInputQuantity}
            />
            <button onClick={increaseQuantity}>+</button>
          </div>
        </div>
        <div className={styles.price}>${product.price * product.quantity}</div>
      </div>
    </div>
  );
};

export default CartItem;
