import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import IconoBoton from "../assets/icons/IconoBoton"

import styles from "../styles/item.module.css";

const Item = ({ producto }) => {

  const { addToCart } = useContext(CartContext);
  
  const [agregado, setAdd] = useState(false);

  const handleAgregar = (e) => {
  e.preventDefault();
  e.stopPropagation();

    addToCart(producto, 1)
    setAdd(true);
  };

 let stockSuf = false
  if (producto.stock > 5) {
    stockSuf = true;
  }

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

  <h3 className={styles.title}>
    {producto.nombre}
  </h3>

  <p className={styles.description}>
    {producto.descripcion}
  </p>

  <p className={stockSuf ? styles.stock : styles.stockBajo}>
    {producto.stock}
  </p>

  <div className={styles.containerPrecio}>

    <p className={styles.price}>
      ${producto.precio.toLocaleString("es-AR")}
    </p>

    <button
      className={
        agregado
          ? styles.addedButton
          : styles.cartButton
      }
      onClick={handleAgregar}
      disabled={agregado}
    >
      <span className={styles.textoBoton}>
        {agregado ? "Agregado" : "Agregar al carrito"}
      </span>

      <span className={styles.iconoBoton}>
        <IconoBoton />
      </span>

    </button>

  </div>

        </div>
      </Link>
    </div>
  );
};



export default Item;