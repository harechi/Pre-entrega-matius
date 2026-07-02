import { createContext, useContext } from "react";
import { collection, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { usePaginacion } from "../hooks/usePaginacion"
import { useCategoria } from "./CategoriaContext";

export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {

  const agregarProducto = async (nuevoProd) => {
    await addDoc(collection(db, "productos"), nuevoProd);
  };

  const eliminarProducto = async (id) => {
    await deleteDoc(doc(db, "productos", id));
  };

  const editarProducto = async (id, datosActualizados) => {
    const ref = doc(db, "productos", id);
    await updateDoc(ref, datosActualizados);
  };

  return (
    <ProductosContext.Provider
      value={{
        agregarProducto,
        eliminarProducto,
        editarProducto
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};

export const useProductos = () => useContext(ProductosContext);