import { useState, createContext, useContext, useEffect } from "react";

export const CartContext = createContext({
  cart: [],
  addItem: (product, quantity) => {},
  removeItem: () => {},
  totalQuantity: 0,
  total: 0,
  clearCart: () => {},
  getProductQuantity: () => {},
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [total, setTotal] = useState(0);

  const addItem = (productToAdd, quantity) => {
  
    const isValidQuantity = typeof quantity === 'number' && !isNaN(quantity);
  
    if (isValidQuantity && !isInCart(productToAdd.id)) {
      setCart((prev) => [...prev, { ...productToAdd, quantity }]);
    } else {
      const cartUpdated = cart.map((prod) => {
        if (prod.id === productToAdd.id) {
          const updatedQuantity = isValidQuantity ? quantity : 0;
  
          return {
            ...prod,
            quantity: updatedQuantity,
          };
        } else {
          return prod;
        }
      });
      setCart(cartUpdated);
    }
  };
  

  const isInCart = (id) => {
    return cart.some((prod) => prod.id === id);
  };

  const removeItem = (id, quantityToRemove = 1) => {
    const cartUpdated = cart.map((prod) => {
      if (prod.id === id) {
        const updatedQuantity = Math.max(prod.quantity - quantityToRemove, 0);
        return {
          ...prod,
          quantity: updatedQuantity,
        };
      } else {
        return prod;
      }
    });
  
    const updatedCart = cartUpdated.filter((prod) => prod.quantity > 0);
  
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getProductQuantity = (productId) => {
    const product = cart.find((prod) => prod.id === productId);
    return product?.quantity;
  };

  const getTotalQuantity = () => {
    let count = 0;
    cart.forEach((prod) => {
      count += prod.quantity;
    });
    return count;
  };

  const getTotal = () => {
    let total = 0;
    cart.forEach((prod) => {
      total += prod.quantity * prod.price;
    });
    return total;
  };

  useEffect(() => {
    const newTotalQuantity = getTotalQuantity();
    const newTotal = getTotal();
    setTotalQuantity(newTotalQuantity);
    setTotal(newTotal);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        totalQuantity,
        total,
        clearCart,
        getProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
