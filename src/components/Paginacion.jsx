import styles from './paginacion.module.css';

const Paginacion = ({ paginaActual, totalPaginas, cargarPagina, cargando }) => {
  const maxBotones = 5;

  let paginaInicial = Math.max(1, paginaActual - Math.floor(maxBotones / 2));
  let paginaFinal = paginaInicial + maxBotones - 1;

  if (paginaFinal > totalPaginas) {
    paginaFinal = totalPaginas;
    paginaInicial = Math.max(1, paginaFinal - maxBotones + 1);
  }

  const paginasAMostrar = [];
  for (let i = paginaInicial; i <= paginaFinal; i++) {
    paginasAMostrar.push(i);
  }

  return (
    <div className={styles.paginacion}>
      <button 
        className={styles.btnNav} 
        disabled={paginaActual === 1 || cargando}
        onClick={() => cargarPagina(paginaActual - 1)}
      >
        ←
      </button>

      <div className={styles.numeros}>
        {paginasAMostrar.map((numero) => (
          <button
            key={numero}
            className={`${styles.btnNumero} ${paginaActual === numero ? styles.activo : ''}`}
            onClick={() => cargarPagina(numero)}
            disabled={cargando}
          >
            {numero}
          </button>
        ))}
      </div>

      <button 
        className={styles.btnNav} 
        disabled={paginaActual === totalPaginas || cargando}
        onClick={() => cargarPagina(paginaActual + 1)}
      >
        →
      </button>
    </div>
  );
};

export default Paginacion;