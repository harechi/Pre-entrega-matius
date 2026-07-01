import { useState } from "react";
import { useCategoria } from "../../context/CategoriaContext";
import styles from "./categorias.module.css"

const Categorias = ({scrolled}) => {
  const [abierto, setAbierto] = useState(false);

  const { setCategoria } = useCategoria();


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
          <p onClick={() => setCategoria("perfumes")}>
            Perfumes
          </p>

          <p onClick={() => setCategoria("ejercicio")}>
            Ejercicio
          </p>

          <p onClick={() => setCategoria("refrescos")}>
            Refrescos
          </p>

        </div>
      )}
    </div>
  );
};

export default Categorias;