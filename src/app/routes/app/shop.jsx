import ShopItem from "../../../components/shop/shop-item";
import ShopLoading from "../../../components/ui/loading-screens/shop-loading";
import useDocumentTitle from "../../../hooks/use-document-title";
import useShop from "../../../hooks/use-shop";
import styles from "./shop.module.css";

const Shop = () => {
  useDocumentTitle("Shop | Mercado Negro");

  const { allProducts, loading, error } = useShop();

  return (
    <>
      {error && (
        <div data-testid="shop-fetching-error">
          <div>There was a problem loading the shop items.</div>
          <div>Please try again later.</div>
        </div>
      )}
      {loading ? (
        <ShopLoading />
      ) : (
        <ul className={styles.shopItems} aria-label="All products">
          {allProducts.map((product) => (
            <ShopItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default Shop;
