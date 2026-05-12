import styles from "../../styles/header.module.css";
import Nav from "./Nav"

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>NovaMarket</h1>
      <Nav />
    </header>
  );
};

export default Header;