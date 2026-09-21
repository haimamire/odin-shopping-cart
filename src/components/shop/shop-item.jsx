import { useNavigate, useOutletContext } from "react-router";
import Swal from "sweetalert2";
import styles from "./shop-item.module.css";
import { ShoppingCartPlus } from "lucide-react";

const ShopItem = ({ id, title, price, description, image }) => {
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
    <div className={styles.shopItem}>
      <div className={styles.imgContainer}>
        <img src={image} alt={description} height="200px" width="200px" />
      </div>
      <div className={styles.infoContainer}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.priceContainer}>
          <div className={styles.price}>${price}</div>
          <button className={styles.cartBtn} onClick={addCurrentProduct}>
            <ShoppingCartPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
