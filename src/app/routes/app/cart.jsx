import { Link, useOutletContext } from "react-router";
import { useMemo } from "react";
import CartItem from "../../../components/cart/cart-item";
import styles from "./cart.module.css";

const Cart = () => {
  const { cartProducts, removeCartItem, updateCartItem } = useOutletContext();

  const priceTotal = useMemo(
    () =>
      cartProducts.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
    [cartProducts],
  );

  if (cartProducts.length === 0)
    return (
      <div>
        <h2>Why aren't you buying anything?</h2>
        <p>
          Go to <Link to="/shop">our shop</Link> and give us money now! We can't
          afford rent anymore :(
        </p>
      </div>
    );

  return (
    <div className={styles.cart}>
      <section className={styles.cartItems}>
        <h2>Shopping Cart</h2>
        <hr />
        {cartProducts.map((product) => (
          <CartItem
            key={product.id}
            product={{
              id: product.id,
              title: product.title,
              quantity: product.quantity,
              price: product.price,
              image: product.image,
            }}
            removeItem={removeCartItem}
            updateItem={updateCartItem}
          />
        ))}
      </section>
      <section className={styles.summary}>
        <h2>Order Summary</h2>
        <hr />
        <div>
          <div className={styles.namePrice}>
            <div>Items</div>
            <div>${priceTotal}</div>
          </div>
          <div className={styles.namePrice}>
            <div>Shipping</div>
            <div style={{ color: "green" }}>Free!</div>
          </div>
        </div>
        <hr />
        <div>
          <div className={styles.namePrice}>
            <div>Total</div>
            <div>${priceTotal}</div>
          </div>
          <button className={styles.checkoutBtn}>Checkout</button>
        </div>
      </section>
    </div>
  );
};

export default Cart;
