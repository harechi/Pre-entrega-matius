import { Link } from "react-router-dom";
import styles from "../../styles/nav.module.css"
import Categorias from "../pages/Categorias";


const Nav = ({ scrolled }) => {
  return (
    <nav className={styles.nav} >
      <Link to="/" className={scrolled ? styles.scrolled : styles.link}>
        Inicio
      </Link>
      <Link to="/productos" className={scrolled ? styles.scrolled : styles.link}>
        Productos
      </Link>

      <button to="/Categorias" className={scrolled ? styles.scrolledCateg : styles.button}>
        <Categorias scrolled={scrolled}  />
      </button>
    </nav>
  );
};

export default Nav;