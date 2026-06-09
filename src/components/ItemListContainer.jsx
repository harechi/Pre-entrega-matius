import { useEffect, useState } from "react";
import Item from "./Item";
import styles from "../styles/itemList.module.css"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {

  const getProducts = async () => {

    const querySnapshot = await getDocs(
      collection(db, "productos")
    );

    const productosFirebase = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setProductos(productosFirebase);
  };

  getProducts();

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