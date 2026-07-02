import { Link, useNavigate } from "react-router-dom";
import styles from "./nav.module.css";
import Categorias from "../pages/Categorias";
import { useState } from "react";

const Nav = ({ scrolled }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className={styles.nav}>
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

        <button
          className={scrolled ? styles.scrolled : styles.link}
          onClick={() => navigate("/productos")}
        >
          Productos
        </button>

        <Categorias scrolled={scrolled} />
      </div>
    </nav>
  );
};

export default Nav;