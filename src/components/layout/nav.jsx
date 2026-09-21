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
              <Link
                className={styles.logoLink}
                to="/"
                aria-label="Return back home"
              >
                <div className={styles.logo} aria-hidden="true">
                  <Handshake size="32px" strokeWidth="1.5px" />
                </div>
                <div className={styles.siteName} aria-hidden="true">
                  <div>mercado</div>
                  <div>negro</div>
                </div>
              </Link>
            </div>
            <form action="" className={styles.searchBar} role="search">
              <input
                type="text"
                placeholder="This thing doesn't work..."
                aria-label="Search input"
              />
              <button type="submit" onClick={disableForm} aria-label="Search">
                <Search size="18px" />
              </button>
            </form>
          </div>
          <div className={styles.rightSide}>
            <ul>
              <li>
                <Link to="/shop" aria-label="Go to shop">
                  <span aria-hidden="true">Shop</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className={styles.cart}
                  aria-label={`Go to shopping cart, ${cartLength} items added`}
                >
                  <ShoppingCart size="18px" />
                  <span aria-hidden="true">{cartLength}</span>
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
