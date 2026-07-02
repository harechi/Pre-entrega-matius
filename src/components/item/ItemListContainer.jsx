import { useEffect, useState } from "react";
import Item from "./Item";
import styles from "./itemList.module.css"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

import ItemList from './ItemList';
import { useProductos } from '../../context/ProductsContext'; 
import { useParams } from "react-router-dom";
import Paginacion from '../Paginacion'
import { usePaginacion } from "../../hooks/usePaginacion";

const ItemListContainer = () => {
  const { categoria } = useParams();

  const {
    data: productos,
    cargando,
    paginaActual,
    totalPaginas,
    cargarPagina
  } = usePaginacion("productos", "nombre", 10, categoria || "");

  if (cargando && productos.length === 0) {
    return (
      <div className={styles.estadoWrapper}>
        <div className={styles.spinner} aria-label="Cargando" />
        <p className={styles.estadoTexto}>Cargando productos...</p>
      </div>
    );
  }

  return (
    <main className={styles.contenedor}>
      <header className={styles.encabezado}>
        <h1 className={styles.titulo}>Nuestros Productos</h1>
      </header>

      <ItemList productos={productos} />

      <Paginacion 
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        cargarPagina={cargarPagina}
        cargando={cargando}
      />
    </main>
  );
};

export default ItemListContainer;