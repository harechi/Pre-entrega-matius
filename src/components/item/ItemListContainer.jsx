import { useEffect, useState } from "react";
import Item from "./Item";
import styles from "./itemList.module.css"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

import ItemList from './ItemList';
import { useProductos } from '../../context/ProductsContext'; 
import { useCategoria } from '../../context/CategoriaContext'; 
import Paginacion from '../Paginacion'



const ItemListContainer = () => {
  const { productos, cargando, paginaActual, totalPaginas, cargarPagina } = useProductos();

  if (cargando && productos.length === 0) {
    return (
      <div className={styles.estadoWrapper}>
        <div className={styles.spinner} aria-label="Cargando" />
        <p className={styles.estadoTexto}>Cargando productos...</p>
      </div>
    );
  }

  const { categoria } = useCategoria();

    const productosFiltrados = categoria
  ? productos.filter(p => p.categoria === categoria)
  : productos;

  return (
    <main className={styles.contenedor}>
      <header className={styles.encabezado}>
        <h1 className={styles.titulo}>Nuestros Productos</h1>
      </header>

      <ItemList productos={productosFiltrados} />

      {/* Paginación limpia y reutilizable */}
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