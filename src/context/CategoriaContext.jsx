import { createContext, useContext, useState } from "react";

const CategoriaContext = createContext();

export const CategoriaProvider = ({ children }) => {
  const [categoria, setCategoria] = useState("");

  return (
    <CategoriaContext.Provider value={{ categoria, setCategoria }}>
      {children}
    </CategoriaContext.Provider>
  );
};

export const useCategoria = () => useContext(CategoriaContext);