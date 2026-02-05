import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext(); // ✅ named export

export const CartProvider = ({ children }) => {
  const getKey = () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return `cart_${user?.id || 'guest'}`;
  };

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(getKey())) || [];
    } catch {
      return [];
    }
  });

  // persist whenever cart changes
  React.useEffect(() => {
    try {
      localStorage.setItem(getKey(), JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = (item) => {
    // require user to be logged in before adding to cart
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (!token || !user) {
        alert("Please log in to add items to your cart.");
        // redirect to login page
        window.location.href = "/login";
        return;
      }
    } catch (e) {
      alert("Please log in to add items to your cart.");
      window.location.href = "/login";
      return;
    }

    setCart((prev) => {
      const exist = prev.find((p) => p.id === item.id);
      if (exist) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
