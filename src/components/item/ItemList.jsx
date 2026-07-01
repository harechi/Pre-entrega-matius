import Item from './Item';
import styles from './itemList.module.css';

const ItemList = ({ productos }) => {
  return (
    <section className={styles.container}>
      {productos.map(prod =>
        <Item key={prod.id} producto={prod} />
      )}
    </section>
  );
};

export default ItemList;