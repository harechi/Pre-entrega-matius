import ItemListContainer from "../item/ItemListContainer";
import styles from "./products.module.css";

const Products = () => {
  return (
    <div className={styles.div}>
      <h2>Productos</h2>
      <ItemListContainer />
    </div>
  );
};

export default Products;