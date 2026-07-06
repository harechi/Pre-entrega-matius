import { useParams } from "react-router-dom";
import ItemListContainer from "../item/ItemListContainer";
import styles from "./products.module.css";

const Products = () => {
  const { categoria } = useParams();

  return (
    <div className={styles.div}>
      <h2 className={styles.titulo}>Nuestros Productos</h2>
      <ItemListContainer categoria={categoria || ""} />
    </div>
  );
};

export default Products;