import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

import styles from "../styles/item.module.css";

const Item = ({ producto }) => {

  const { agregarAlCarrito } = useContext(CartContext);


  // const sumar = () => {
  //   if (cantidad < producto.stock) {
  //     setCantidad(cantidad + 1);
  //   }
  // };

  // const restar = () => {
  //   if (cantidad > 0) {
  //     setCantidad(cantidad - 1);
  //   }
  // };
  
  const [agregado, setAgregado] = useState(false);

  const handleAgregar = () => {
    agregarAlCarrito(producto);
    setAgregado(true);
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

          <p>{producto.descripcion}</p>

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