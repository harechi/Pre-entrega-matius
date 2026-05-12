import { useEffect, useState } from "react";
import Item from "./Item";
import styles from "../styles/itemList.module.css"

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("/data/baseDeDatos.json")
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  return (
    <div className={styles.container}>
      {productos.map(prod => (
        <Item key={prod.id} producto={prod} />
      ))}
    </div>
  );
};

export default ItemListContainer;