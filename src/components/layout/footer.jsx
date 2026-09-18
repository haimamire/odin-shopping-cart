import styles from "./footer.module.css";

const Footer = () => {
  const thisYear = new Date().getFullYear();

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.innerFooter}>
          © {thisYear} mercado negro | All Rights Reserved
        </div>
      </footer>
    </>
  );
};

export default Footer;
