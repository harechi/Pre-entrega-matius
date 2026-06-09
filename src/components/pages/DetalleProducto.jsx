import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

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
    <div>

      <h2>{producto.nombre}</h2>

      <img
        src={producto.imagen}
        alt={producto.nombre}
        width="300"
      />

      <p>{producto.descripcion}</p>

      <p>${producto.precio}</p>

      <p>Stock: {producto.stock}</p>

      <button onClick={restar}>-</button>

      <span>{cantidad}</span>

      <button onClick={sumar}>+</button>

      <button onClick={handleAgregar} disabled={agregado}>
        {agregado ? "Agregado" : "Agregar al carrito"}
      </button>

    </div>
  );
};

export default DetalleProducto;