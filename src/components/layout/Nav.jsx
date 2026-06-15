import { Link } from "react-router-dom";
import styles from "../../styles/nav.module.css"

const Nav = ({ scrolled }) => {
  return (
    <nav className={styles.nav} >
      <Link to="/" className={scrolled ? styles.scrolled : styles.link}>
        Inicio
      </Link>
      <Link to="/productos" className={scrolled ? styles.scrolled : styles.link}>
        Productos
      </Link>
      <Link to="/carrito" className={scrolled ? styles.scrolled : styles.link}>
        Carrito
      </Link>
    </nav>
  );
};

export default Nav;