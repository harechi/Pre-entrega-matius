import { useContext } from "react";

import { CartContext } from "../../context/CartContext";

import styles from "./cart.module.css";

const Cart = () => {

  const { cart, setCart } = useContext(CartContext);

  const total = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const incQuantity = (id) => {

  const newCart = cart.map(item =>

    item.id === id
      ? {
          ...item,
          cantidad:
            item.cantidad < item.stock
              ? item.cantidad + 1
              : item.cantidad
        }
      : item

  );

  setCart(newCart);
};

  const decQuantity = (id) => {
    const newCart = cart.map(item =>
      item.id === id ? { ...item, cantidad: Math.max(item.cantidad - 1, 1) } : item
    );
      setCart(newCart);

  };
    const removeItem = (id) => {
    const newCart = cart.filter(item => item.id !== id);

    setCart(newCart);

  };

  return (

    <div className={styles.container}>

      <div className={styles.products}>

        <h2>Carrito</h2>


        {
          cart.length === 0
            ? (
              <p>El carrito está vacío</p>
            )
            : (
              
              cart.map(item => (

                <div
                  key={item.id}
                  className={styles.card}
                >

                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className={styles.image}
                  />

                  <div className={styles.info}>

                    <h3>{item.nombre}</h3>

                    <p>{item.descripcion}</p>

                    <p>
                      Cantidad: {item.cantidad}
                    </p>

                  </div>

                  <div className={styles.priceContainer}>

                    <p className={styles.price}>
                      $
                      {
                        item.precio * item.cantidad
                      }
                    </p>
                    
                  </div>
                  
                  <div className={styles.quantityContainer}>
                    
                    <button className={styles.quantityButton} onClick={() => decQuantity(item.id)}>
                      -
                    </button>

                    <span className={styles.quantityValue}>
                      {item.cantidad}
                    </span>

                    <button className={styles.quantityButton} onClick={() => incQuantity(item.id)}>
                      +
                    </button>

                  </div>

                  <button
                    className={styles.removeButton}
                    onClick={() => removeItem(item.id)}
                  >
                    Eliminar
                  </button>

                </div>

              ))
            )
        }

      </div>

      <div className={styles.summary}>

        <h3>Resumen de compra</h3>

        <div className={styles.summaryRow}>
          <span>Total</span>

          <span>${total}</span>
        </div>

        <button onClick={() => window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ") } className={styles.buyButton}>
          Continuar compra
        </button>
      </div>

    </div>
  );
};

export default Cart;