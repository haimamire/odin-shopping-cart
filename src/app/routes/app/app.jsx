import { Link, Outlet } from "react-router";
import styles from "./app.module.css";
import { disableForm } from "/src/utils/form";
import useShoppingCart from "../../../hooks/use-shopping-cart";

const App = () => {
  const { cartProducts, addCartProduct, removeCartItem } = useShoppingCart();

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.innerNav}>
          <div>
            <Link to="/">home</Link>
          </div>
          <form action="">
            <input type="text" />
            <button type="submit" onClick={disableForm}></button>
          </form>
          <ul>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link> {cartProducts.length}
            </li>
          </ul>
        </div>
      </nav>
      <div className={styles.main}>
        <main className={styles.innerMain}>
          <Outlet context={{ cartProducts, addCartProduct, removeCartItem }} />
        </main>
      </div>
      <footer className={styles.footer}>
        <div className={styles.innerFooter}>Footer</div>
      </footer>
    </>
  );
};

export default App;
