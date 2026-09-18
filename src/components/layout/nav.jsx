import { Handshake, Search, ShoppingCart } from "lucide-react";
import styles from "./nav.module.css";
import { disableForm } from "/src/utils/form";
import { Link } from "react-router";

const NavBar = ({ cartLength }) => {
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.innerNav}>
          <div className={styles.leftSide}>
            <div>
              <Link className={styles.logoLink} to="/">
                <div className={styles.logo}>
                  <Handshake size="32px" strokeWidth="1.5px" />
                </div>
                <div className={styles.siteName}>
                  <div>mercado</div>
                  <div>negro</div>
                </div>
              </Link>
            </div>
            <form action="" className={styles.searchBar}>
              <input type="text" placeholder="This thing doesn't work..." />
              <button type="submit" onClick={disableForm}>
                <Search size="18px" />
              </button>
            </form>
          </div>
          <div className={styles.rightSide}>
            <ul>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/cart" className={styles.cart}>
                  <ShoppingCart size="18px" />
                  {cartLength}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
