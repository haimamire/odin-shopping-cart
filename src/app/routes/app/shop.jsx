import ShopItem from "../../../components/shop/shop-item";
import useShop from "../../../hooks/use-shop";
import styles from "./shop.module.css";

const Shop = () => {
  const { allProducts, loading, error } = useShop();

  return (
    <>
      {error && (
        <>
          <div>There was a problem loading the shop items.</div>
          <div>Please try again later.</div>
        </>
      )}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.shopItems}>
          {allProducts.map((product) => (
            <ShopItem
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Shop;
