
function TarjetaProducto({ imagen, nombre, precio }) {
  return (
    <div className={styles.card}>
      <img src={imagen} alt={nombre} className={styles.img}/>
      <h3 className={styles.nombre}>{nombre}</h3>
      <p className={styles.precio}> ${precio}</p>
      <button className={styles.boton}>Comprar</button>
    </div>
  );
}

export default TarjetaProducto;