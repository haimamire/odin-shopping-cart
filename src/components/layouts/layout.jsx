import { Link, Outlet } from "react-router";
import styles from "./layout.module.css";
import { disableForm } from "../../utils/form";

const Layout = () => {
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
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className={styles.main}>
        <main className={styles.innerMain}>
          <Outlet />
        </main>
      </div>
      <footer className={styles.footer}>
        <div className={styles.innerFooter}>Footer</div>
      </footer>
    </>
  );
};

export default Layout;
