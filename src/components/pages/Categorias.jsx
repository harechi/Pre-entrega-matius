import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./categorias.module.css"

const Categorias = ({scrolled}) => {
  const [abierto, setAbierto] = useState(false);

  const navigate = useNavigate();


  return (
    <div className={styles.contenedorCategorias}
     onMouseEnter={() => setAbierto(true)}
     onMouseLeave={() => setAbierto(false)}
     >
      <button className={abierto || scrolled ? styles.botonChange : styles.boton}>
        Categorías
      </button>

      {abierto && (
        <div className={styles.menu}>
          <p onClick={() => navigate("/productos/perfumes")}>
            Perfumes
          </p>

          <p onClick={() => navigate("/productos/ejercicio")}>
            Ejercicio
          </p>

          <p onClick={() => navigate("/productos/refrescos")}>
            Refrescos
          </p>

        </div>
      )}
    </div>
  );
};

export default Categorias;