import styles from "../../styles/home.module.css"
import Carrusel from "../Carrusel"
import { Link } from "react-router-dom";
const Home = () => {
  return (
    

    <div className={styles.div}>
      <h1>
        Bienvenido a NovaMarket
        <br />
        encuentra lo que necesitas
       </h1>
      <h3>Contamos con una amplia selección de chistes</h3>
      <Link to="/productos" className={styles.button}>
        Explorar
      </Link>
      <Carrusel className={styles.carrusel} />
    </div>



  );
};

export default Home;