import { Outlet } from "react-router";
import styles from "./app.module.css";
import useShoppingCart from "../../../hooks/use-shopping-cart";
import Footer from "../../../components/layout/footer";
import NavBar from "../../../components/layout/nav";

const App = () => {
  const { cartProducts, addCartProduct, removeCartItem, updateCartItem } =
    useShoppingCart();

  return (
    <>
      <NavBar cartLength={cartProducts.length} />
      <main>
        <div className={styles.innerMain}>
          <Outlet
            context={{
              cartProducts,
              addCartProduct,
              removeCartItem,
              updateCartItem,
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
