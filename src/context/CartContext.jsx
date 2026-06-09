import { createContext, useState } from "react";

export const CartContext = createContext();

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

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;