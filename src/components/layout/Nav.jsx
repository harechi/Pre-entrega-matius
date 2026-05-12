import { Link } from "react-router-dom";
import styles from "../../styles/nav.module.css"

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/">Inicio</Link>
      <Link to="/productos">Productos</Link>
      <Link to="/carrito">Carrito</Link>
    </nav>
  );
};

export default Nav;