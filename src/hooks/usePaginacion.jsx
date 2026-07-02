import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs, startAfter, getCountFromServer, where } from "firebase/firestore";
import { db } from "../firebase/config";


export const usePaginacion = (
  nombreColeccion,
  campoOrden = "nombre",
  itemsPorPagina = 10,
  categoria = ""
) => {

  const [data, setData] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);

  const obtenerTotal = async () => {
    try {
      let consultaTotal = collection(db, nombreColeccion);

      if (categoria) {
        consultaTotal = query(
          consultaTotal,
          where("categoria", "==", categoria)
        );
      }

      const snapshot = await getCountFromServer(consultaTotal);

      setTotalPaginas(
        Math.ceil(snapshot.data().count / itemsPorPagina)
      );
    } catch (error) {
      console.error("Error al obtener total:", error);
    }
  };

  const cargarPagina = async (numeroPagina) => {
    setCargando(true);

    try {
      let base = collection(db, nombreColeccion);

      if (categoria) {
        base = query(
          base,
          where("categoria", "==", categoria)
        );
      }

      base = query(base, orderBy(campoOrden));

      let consulta;

      if (numeroPagina === 1) {
        consulta = query(base, limit(itemsPorPagina));
      } else {
        consulta = query(
          base,
          startAfter(lastDoc),
          limit(itemsPorPagina)
        );
      }

      const snapshot = await getDocs(consulta);

      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setData(items);
      setPaginaActual(numeroPagina);

      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);

    } catch (error) {
      console.error("Error al cargar página:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    setPaginaActual(1);
    setLastDoc(null);
    obtenerTotal();
    cargarPagina(1);
  }, [categoria, nombreColeccion]);

  return {
    data,
    cargando,
    paginaActual,
    totalPaginas,
    cargarPagina
  };
};