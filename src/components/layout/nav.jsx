import styles from "./nav.module.css";
import { disableForm } from "/src/utils/form";
import { Link } from "react-router";

const NavBar = ({ cartLength }) => {
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
              <Link to="/cart">Cart</Link> {cartLength}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
