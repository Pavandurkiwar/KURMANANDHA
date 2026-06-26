import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [shippingCharge, setShippingCharge] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('cartItems');
    if (stored) {
      try { setCartItems(JSON.parse(stored)); } catch { localStorage.removeItem('cartItems'); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        toast.success(`Updated ${product.name} quantity`);
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      }
      toast.success(`${product.name} added to cart`);
      return [...prev, { ...product, quantity: Math.min(quantity, product.stock) }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
    toast.success('Item removed from cart');
  }, []);

  const updateQuantity = useCallback((id, qty) => {
    if (qty < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: Math.min(qty, item.stock || 99) } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setCoupon(null);
  }, []);

  const applyCoupon = useCallback((code) => {
    if (code === 'SAVE10') {
      setCoupon({ code, discount: 10 });
      toast.success('Coupon applied! 10% off');
    } else if (code === 'WELCOME20') {
      setCoupon({ code, discount: 20 });
      toast.success('Coupon applied! 20% off');
    } else {
      toast.error('Invalid coupon code');
      return false;
    }
    return true;
  }, []);

  const removeCoupon = useCallback(() => {
    setCoupon(null);
    toast.success('Coupon removed');
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = coupon ? (subtotal * coupon.discount) / 100 : 0;
  const taxAmount = (subtotal - discountAmount) * 0.05; // 5% GST
  const shipping = subtotal - discountAmount > 500 ? 0 : 40;
  const total = Math.max(0, subtotal - discountAmount + taxAmount + shipping);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discountAmount,
        taxAmount,
        shipping,
        total,
        itemCount,
        coupon,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
