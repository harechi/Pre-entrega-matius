import { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) 
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  return context;
};

const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  const addToCart = (product, cantidad) => {

    const existingProduct = cart.find(
      item => item.id === product.id
    );

    if (existingProduct) {

      const newCart = cart.map(item =>
        item.id === product.id
          ? {
              ...item,
              cantidad: item.cantidad + cantidad
            }
          : item
      );
      setCart(newCart);
    } else {

      setCart(prev => [...prev, { ...product, cantidad: cantidad }]);

    }
  };

  const vaciarCarrito = () => setCarrito([]);

   const obtenerCantidadTotal = () => {
    return cart.reduce((acum, item) => acum + item.cantidad, 0);
  };

  // Obtener el precio total de la compra
  const obtenerTotalPrecio = () => {
    return cart.reduce((acum, item) => acum + item.precio * item.cantidad, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        vaciarCarrito,
        obtenerCantidadTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;