import styles from "./shop-loading.module.css";

const ShopLoading = () => {
  return (
    <div
      className={styles.mainContainer}
      aria-label="Loading items..."
      data-testid="shop-loading"
    >
      <div className={styles.loadingCard}>
        <div className={styles.imgContainer}></div>
        <div className={styles.infoContainer}>
          <div className={styles.titleAnimation}></div>
        </div>
      </div>
      <div className={styles.loadingCard}>
        <div className={styles.imgContainer}></div>
        <div className={styles.infoContainer}>
          <div className={styles.titleAnimation}></div>
        </div>
      </div>
      <div className={styles.loadingCard}>
        <div className={styles.imgContainer}></div>
        <div className={styles.infoContainer}>
          <div className={styles.titleAnimation}></div>
        </div>
      </div>
      <div className={styles.loadingCard}>
        <div className={styles.imgContainer}></div>
        <div className={styles.infoContainer}>
          <div className={styles.titleAnimation}></div>
        </div>
      </div>
    </div>
  );
};

export default ShopLoading;
