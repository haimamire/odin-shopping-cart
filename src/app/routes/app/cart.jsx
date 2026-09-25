import { Link, useOutletContext } from "react-router";
import { useEffect, useMemo } from "react";
import CartItem from "../../../components/cart/cart-item";
import styles from "./cart.module.css";
import { toFixed } from "../../../utils/roundNumber";
import useDocumentTitle from "../../../hooks/use-document-title";

const Cart = () => {
  useDocumentTitle("Cart | Mercado Negro");

  const { cartProducts, removeCartItem, updateCartItem } = useOutletContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const priceTotal = useMemo(
    () =>
      cartProducts.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
    [cartProducts],
  );

  const shipping = priceTotal < 20 ? 8 : 0;

  if (cartProducts.length === 0)
    return (
      <div data-testid="empty-cart">
        <h2>Why aren't you buying anything?</h2>
        <p>
          Go to <Link to="/shop">our shop</Link> and give us money now! We can't
          afford rent anymore :(
        </p>
      </div>
    );

  return (
    <div className={styles.cart} data-testid="cart">
      <section className={styles.cartItems}>
        <h2>Shopping Cart</h2>
        <hr aria-hidden="true" />
        <ul>
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
        </ul>
      </section>
      <section className={styles.summary}>
        <h2>Order Summary</h2>
        <hr aria-hidden="true" />
        <div>
          <div className={styles.namePrice} aria-label="Items total">
            <div aria-hidden="true">Items</div>
            <div>{`$${toFixed(priceTotal, 2)}`}</div>
          </div>
          <div className={styles.namePrice} aria-label="Shipping total">
            <div aria-hidden="true">Shipping</div>
            {shipping ? (
              <div data-testid="shipping-price">{`$${shipping}`}</div>
            ) : (
              <div style={{ color: "green" }} data-testid="shipping-free">
                Free!
              </div>
            )}
          </div>
        </div>
        <hr aria-hidden="true" />
        <div>
          <div className={styles.namePrice} aria-label="Total">
            <div aria-hidden="true">Total</div>
            <div data-testid="total-price">
              ${toFixed(priceTotal + shipping, 2)}
            </div>
          </div>
          <button className={styles.checkoutBtn}>Checkout</button>
        </div>
      </section>
    </div>
  );
};

export default Cart;
