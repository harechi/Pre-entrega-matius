import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ProductoDetalle = () => {
  const {id} = useParams()
  const [producto, setProducto] = useState(null);

    useEffect(() => {

    fetch("/data/baseDeDatos.json")
      .then(res => res.json())
      .then(data => {

        const productoEncontrado = data.find(
          prod => prod.id == id
        );

        setProducto(productoEncontrado);
      });

  }, [id]);

 if (!producto) {
    return <p>Cargando...</p>;
  }

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

    </div>
  );
};

export default ProductoDetalle;