import { useEffect, useState } from "react";
import { Link } from "react-router-dom" 

import Nav from "./Nav"

import styles from "../../styles/header.module.css";

import CarritoIcon from "../../assets/icons/CarritoIcon";

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

      <Link to="/carrito" className={scrolled ? styles.iconScrolled : styles.link}>
        <CarritoIcon />
      </Link>
    </header>
  );
};

export default Header;