import { useState } from "react";

import styles from "./categorias.module.css"

const Categorias = ({scrolled}) => {
  const [abierto, setAbierto] = useState(false);

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
          <p>perfumes</p>
          <p>ejercicio</p>
          <p>refrescos</p>
        </div>
      )}
    </div>
  );
};

export default Categorias;