import { useBusqueda } from "../../context/BusquedaContext";
import { useNavigate } from "react-router-dom";
import styles from "./busqueda.module.css";

import SearchIcon from "../../assets/icons/SearchIcon"

const BarraDeBusqueda = () => {
  const { busqueda, setBusqueda } = useBusqueda();
  const navigate = useNavigate();

  const manejarBusqueda = (evento) => {
    const valor = evento.target.value;
    setBusqueda(valor);

    if (valor.trim()) {
      navigate("/busqueda");
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.relativeWrapper}>
        <input
          type="search"
          id="search"
          className={styles.searchInput}
          placeholder="Buscar Productos..."
          value={busqueda}
          onChange={manejarBusqueda}
        />
        <div className={styles.iconWrapper}>
          <span className={styles.searchIcon}> <SearchIcon /> </span>
        </div>
      </div>
    </form>
  );
};

export default BarraDeBusqueda;