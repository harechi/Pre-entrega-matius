import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto, cantidad) => {

    const productoExistente = carrito.find(
      item => item.id === producto.id
    );

    if (productoExistente) {

      const nuevoCarrito = carrito.map(item =>
        item.id === producto.id
          ? {
              ...item,
              cantidad: item.cantidad + cantidad
            }
          : item
      );

      setCarrito(nuevoCarrito);

    } else {

      setCarrito([
        ...carrito,
        {
          ...producto,
          cantidad
        }
      ]);

    }
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito
      }}
    >
      {children}
    </CartContext.Provider>
  );
};