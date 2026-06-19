import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

import Cruz from "../../assets/icons/Cruz"

import styles from "./detalleProducto.module.css";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const DetalleProducto = () => {

  const { id } = useParams();

  const { addToCart } = useContext(CartContext);
    
  const [agregado, setAdd] = useState(false);
  

  const [producto, setProducto] = useState(null);

  useEffect(() => {

    const getProduct = async () => {

      const docRef = doc(db, "productos", id);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        setProducto({
          id: docSnap.id,
          ...docSnap.data()
        });

      }

    };

    getProduct();

  }, [id]);

  const [cantidad, setCantidad] = useState(1);

  if (!producto) {
    return <p>Cargando...</p>;
  }

  const sumar = () => {
    if (cantidad < producto.stock) {
      setCantidad(cantidad + 1);
    }
  };

  const restar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

    const handleAgregar = () => {
    addToCart(producto, cantidad)
    setAdd(true);
  };

return (
  <div className={styles.detalleContainer}>

    <Link to="/productos" className={styles.cruz}>
      <Cruz />
    </Link>
    

    <div className={styles.imagenContainer}>
      <img
        src={producto.imagen}
        alt={producto.nombre}
      />
    </div>

    <div className={styles.infoContainer}>

      <h1>{producto.nombre}</h1>

      <p className={styles.precio}>
        ${producto.precio}
      </p>

      <p className={styles.descripcion}>
        {producto.descripcion}
      </p>

      <p className={styles.stock}>
        Stock: {producto.stock}
      </p>

      <div className={styles.controles}>

        <button
          className={styles.cantidadBtn}
          onClick={restar}
        >
          -
        </button>

        <span className={styles.cantidad}>
          {cantidad}
        </span>

        <button
          className={styles.cantidadBtn}
          onClick={sumar}
        >
          +
        </button>

        <button
          className={styles.botonCarrito}
          onClick={handleAgregar}
          disabled={agregado}
        >
          {agregado ? "Agregado" : "Agregar al carrito"}
        </button>


      </div>

    </div>

  </div>
);
};

export default DetalleProducto;