import styles from "./header.module.css";
const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <button className={styles.settings}>Settings</button>
      <h1 className={styles.title}>My TO-DO</h1>
      <button className={styles.calendar}>calendar</button>
    </div>
  );
};

export default Header;
