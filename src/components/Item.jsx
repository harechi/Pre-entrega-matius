import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

import styles from "../styles/item.module.css";

const Item = ({ producto }) => {

  const { addToCart } = useContext(CartContext);
  
  const [agregado, setAdd] = useState(false);

  const handleAgregar = () => {
    addToCart(producto, 1)
    setAdd(true);
  };

  return (
    <div className={styles.card}>

      <Link
        to={`/producto/${producto.id}`}
        className={styles.link}
      >
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className={styles.image}
        />

        <div className={styles.info}>

          <p className={styles.category}>
            {producto.categoria}
          </p>

          <h3>{producto.nombre}</h3>

          <p className={styles.description}>
            {producto.descripcion}
          </p>

          <p className={styles.stock} >{producto.stock}</p>

          <p className={styles.price}>
            ${producto.precio}
          </p>

        </div>
      </Link>

      <button
        className={
                  agregado
                  ? styles.addedButton
                  : styles.cartButton
                  }

        onClick={handleAgregar}

        disabled={agregado === true}
      >{
        agregado
        ? "Agregado"
        : "Agregar al carrito"
      }

      </button>

    </div>
  );
};

export default Item;