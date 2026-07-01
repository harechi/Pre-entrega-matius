import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs, startAfter, getCountFromServer, where } from "firebase/firestore";
import { db } from "../firebase/config";


export const usePaginacion = (nombreColeccion, campoOrden = "nombre", itemsPorPagina = 10, categoria= "") => {
  const [data, setData] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [historialDocs, setHistorialDocs] = useState([null]);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [cargando, setCargando] = useState(false);


  const obtenerTotal = async () => {
    try {
      let consultaTotal;

      if (categoria) {
        consultaTotal = query(
        collection(db, nombreColeccion),
        where("categoria", "==", categoria)
      );
      } else {
        consultaTotal = collection(db, nombreColeccion);
      }

      const snapshot = await getCountFromServer(consultaTotal);

      setTotalPaginas(Math.ceil(snapshot.data().count / itemsPorPagina));
    } catch (error) {
      console.error("Error al obtener total:", error);
    }
  };

 const cargarPagina = async (numeroPagina) => {
  setCargando(true);
  
  try {
    console.log("Categoría:", categoria);
    console.log("Página:", numeroPagina);
    let consulta;

    if (numeroPagina === 1) {

      if (categoria) {
        consulta = query(
        collection(db, nombreColeccion),
        where("categoria", "==", categoria),
        orderBy(campoOrden),
        limit(itemsPorPagina)
      );
      } else {
        consulta = query(
        collection(db, nombreColeccion),
        orderBy(campoOrden),
        limit(itemsPorPagina)
     );
    }

    } else {

      const documentoAnterior = historialDocs[numeroPagina - 1];
      
      if (categoria) {
        consulta = query(
          collection(db, nombreColeccion),
          where("categoria", "==", categoria),
          orderBy(campoOrden),
          startAfter(documentoAnterior),
          limit(itemsPorPagina)
        );
      } else {
        consulta = query(
          collection(db, nombreColeccion),
          orderBy(campoOrden),
          startAfter(documentoAnterior),
          limit(itemsPorPagina)
        );
      }
    }


    const snapshot = await getDocs(consulta);
    console.log("Cantidad de documentos:", snapshot.docs.length);
    console.log(snapshot.docs);

    const items = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));

    console.log("Items:", items);

  
    setData(items);
    setPaginaActual(numeroPagina);

    if (!historialDocs[numeroPagina] && snapshot.docs.length > 0) {
      const ultimoDocumento = snapshot.docs[snapshot.docs.length - 1];
  
      const nuevoHistorial = [...historialDocs];
      nuevoHistorial[numeroPagina] = ultimoDocumento;
      setHistorialDocs(nuevoHistorial);
    }

  } catch (error) {
    console.error("Error al cargar página:", error);
  } finally {
    setCargando(false);
  }
};

  useEffect(() => {
    setHistorialDocs([null]);
    setPaginaActual(1);
    obtenerTotal();
    cargarPagina(1);
  }, [nombreColeccion, categoria]);

  const refrescarPagina = () => {
    obtenerTotal();
    cargarPagina(paginaActual);
  };

  return {
    data,
    cargando,
    paginaActual,
    totalPaginas,
    cargarPagina,
    refrescarPagina
  };
};