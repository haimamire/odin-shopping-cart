import styles from "./footer.module.css";

const Footer = () => {
  const thisYear = new Date().getFullYear();

  return (
    <>
      <footer className={styles.footer} aria-label="Footer">
        <div className={styles.innerFooter}>
          <p>{`© ${thisYear} mercado negro | All Rights Reserved`}</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
