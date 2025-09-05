import styles from "./header.module.css";

// Header component displays app title with subtle hover effects
const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.title}>My TO-DO</h1>
    </header>
  );
};

export default Header;
