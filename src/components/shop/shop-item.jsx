import { useNavigate, useOutletContext } from "react-router";
import Swal from "sweetalert2";
import styles from "./shop-item.module.css";
import { ShoppingCartPlus } from "lucide-react";

const ShopItem = ({ id, title, price, image }) => {
  const { addCartProduct } = useOutletContext();
  const navigate = useNavigate();

  const addCurrentProduct = () => {
    addCartProduct({ id, title, quantity: 1, price, image });

    Swal.fire({
      title: `New item added to the cart!`,
      icon: "success",
      showCloseButton: true,
      confirmButtonText: "Check shopping cart",
      confirmButtonColor: "var(--color-light-blue)",
    }).then((result) => {
      if (result.isConfirmed) navigate("/cart");
    });
  };

  return (
    <li className={styles.shopItem} tabIndex="1">
      <div className={styles.imgContainer}>
        <img src={image} alt="" height="200px" width="200px" />
      </div>
      <div className={styles.infoContainer}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.priceContainer}>
          <div className={styles.price} aria-label="Price">{`$${price}`}</div>
          <button
            className={styles.cartBtn}
            onClick={addCurrentProduct}
            aria-label="Add item to cart"
            tabIndex="1"
          >
            <ShoppingCartPlus />
          </button>
        </div>
      </div>
    </li>
  );
};

export default ShopItem;
