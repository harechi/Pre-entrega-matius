import { Link } from "react-router-dom";
import styles from "./nav.module.css"
import Categorias from "../pages/Categorias";
import { useState } from "react";


const Nav = ({ scrolled }) => {
  const [open, setOpen] = useState(false);
  return (
    <nav className={styles.nav} >

      <button
        className={styles.hamburger}
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      <div className={`${styles.menu} ${open ? styles.active : ""}`}>

        <Link to="/" className={scrolled ? styles.scrolled : styles.link}>
          Inicio
        </Link>
        <Link to="/productos" className={scrolled ? styles.scrolled : styles.link}
         onClick={() => setCategoria("")}>
          Productos
        </Link>
        <Categorias scrolled={scrolled} className={scrolled ? styles.scrolledCateg : styles.button} />

      </div>
    </nav>
  );
};

export default Nav;