import { useContext } from "react";

import { CartContext } from "../../context/CartContext";

import styles from "../../styles/carrito.module.css";

const Carrito = () => {

  const { carrito } = useContext(CartContext);

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (

    <div className={styles.container}>

      <div className={styles.products}>

        <h2>Carrito</h2>

        {
          carrito.length === 0
            ? (
              <p>El carrito está vacío</p>
            )
            : (
              carrito.map(item => (

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

export default Carrito;