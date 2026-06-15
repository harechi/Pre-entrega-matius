import { useEffect, useState } from "react";
import styles from "../../styles/header.module.css";
import Nav from "./Nav"

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 26);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${
        scrolled ? styles.scrolled : ""
      }`}
    >
      <h1 className={styles.title}>NovaMarket</h1>
      <Nav scrolled={scrolled} />
    </header>
  );
};

export default Header;