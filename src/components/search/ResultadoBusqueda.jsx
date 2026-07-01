import { useBusqueda } from "../../context/BusquedaContext";
import { useProductos } from "../../context/ProductsContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./resultadoBusqueda.module.css";
import estilosCard from "../item/item.module.css"; 

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useState, useEffect } from "react";

const ResultadoBusqueda = () => {
  const { busqueda } = useBusqueda();
  
  const [productos, setProductos] = useState([]);

  const navigate = useNavigate(); 

  useEffect(() => {
  const obtenerProductos = async () => {
    try {
      const snapshot = await getDocs(collection(db, "productos"));

      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setProductos(lista);
    } catch (error) {
      console.error(error);
    }
  };

  obtenerProductos();
}, []);

  useEffect(() => {
    if (!busqueda || busqueda.trim() === "") 
      navigate("/productos");

  }, [busqueda, navigate]);

console.log("Busqueda:", busqueda);

console.log("Productos:", productos);

  const productosFiltrados = productos ? productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  ) : [];

  return (
      <div className={styles.container}>
      <h2 className={styles.titulo}>Productos Encontrados</h2>
      <div className={styles.grid}>
        {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
                <article key={producto.id} className={estilosCard.card}>
                    <Link to={`/producto/${producto.id}`}>
                <img 
                  src={producto.imagen} 
                  alt={producto.nombre} 
                  className={estilosCard.image} 
                  />
                  </Link>
                <div className={estilosCard.imagenOverlay} />

              <div className={estilosCard.body}>
                <div className={estilosCard.header}>
                    <h2 className={estilosCard.title}>{producto.nombre}</h2>
                </div>

                <p className={estilosCard.price}>
                  <span className={estilosCard.price}>ARS</span>
                  {Number(producto.precio).toLocaleString("es-AR")}
                </p>

              </div>
            </article>
          ))
        ) : (
            <p className={styles.noResultados}>
            No hay productos que coincidan con la búsqueda.
          </p>
        )}
      </div>
    </div>
  );
};

export default ResultadoBusqueda;