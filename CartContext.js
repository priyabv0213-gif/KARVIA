import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStoredCart, setStoredCart } from '../services/offlineStorage';

const ORDERS_STORAGE_KEY = '@karvia_orders_store';

const INITIAL_ORDERS_SEED = [
  {
    id: 'ord_kv_1092',
    artisanId: 'art_meena_01',
    buyerId: 'usr_buyer_priya',
    buyerName: 'Priya Sharma',
    buyerPhone: '+91 98765 43210',
    shippingAddress: '42, Defence Colony, Indiranagar, Bengaluru, Karnataka - 560038',
    items: [
      {
        productId: 'prod_kanchipuram_01',
        title: 'Kanchipuram Pure Mulberry Silk Saree - Korvai Weave',
        price: 18500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
        artisanName: 'Meenakshi Sundaram',
      }
    ],
    totalAmount: 18500,
    paymentMethod: 'UPI (Google Pay)',
    paymentStatus: 'PAID_ESCROW',
    status: 'SHIPPED', // PLACED | CONFIRMED | PROCESSING | SHIPPED | DELIVERED | COMPLETED
    trackingNumber: 'IN-POST-BLR-884920',
    createdAt: '2026-08-28T10:15:00.000Z',
    estimatedDelivery: '2026-09-03',
    timeline: [
      { status: 'PLACED', title: 'Order Placed by Buyer', date: '28 Aug, 10:15 AM', done: true },
      { status: 'CONFIRMED', title: 'Accepted by Artisan Meenakshi', date: '28 Aug, 11:30 AM', done: true },
      { status: 'PROCESSING', title: 'Handcrafted Packaging & Inspection', date: '29 Aug, 02:00 PM', done: true },
      { status: 'SHIPPED', title: 'Dispatched via India Post SpeedPost', date: '30 Aug, 09:45 AM', done: true },
      { status: 'DELIVERED', title: 'Out for Delivery to Bengaluru', date: 'Est. 3 Sep', done: false },
    ]
  },
  {
    id: 'ord_kv_1084',
    artisanId: 'art_meena_01',
    buyerId: 'usr_buyer_rahul',
    buyerName: 'Rahul Verma',
    buyerPhone: '+91 97112 34567',
    shippingAddress: '15, Alwarpet High Road, Chennai, Tamil Nadu - 600018',
    items: [
      {
        productId: 'prod_kanchipuram_01',
        title: 'Kanchipuram Pure Mulberry Silk Saree - Korvai Weave',
        price: 18500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
        artisanName: 'Meenakshi Sundaram',
      }
    ],
    totalAmount: 18500,
    paymentMethod: 'Credit Card',
    paymentStatus: 'PAID_ESCROW',
    status: 'DELIVERED',
    trackingNumber: 'IN-POST-MAA-49210',
    createdAt: '2026-08-22T14:30:00.000Z',
    estimatedDelivery: '2026-08-26',
    timeline: [
      { status: 'PLACED', title: 'Order Placed', date: '22 Aug', done: true },
      { status: 'CONFIRMED', title: 'Artisan Confirmed', date: '22 Aug', done: true },
      { status: 'PROCESSING', title: 'Packaging & GI Tag verification', date: '23 Aug', done: true },
      { status: 'SHIPPED', title: 'Dispatched', date: '24 Aug', done: true },
      { status: 'DELIVERED', title: 'Delivered & Buyer Verified', date: '26 Aug', done: true },
    ]
  }
];

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState(INITIAL_ORDERS_SEED);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCartAndOrders();
  }, []);

  const loadCartAndOrders = async () => {
    try {
      const storedCart = await getStoredCart();
      setItems(storedCart);

      const storedOrders = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_ORDERS_SEED));
        setOrders(INITIAL_ORDERS_SEED);
      }
    } catch (e) {
      console.warn('Error loading cart & orders:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    let updated;
    const existingIndex = items.findIndex((item) => item.productId === product.id);

    if (existingIndex >= 0) {
      updated = [...items];
      updated[existingIndex].quantity += quantity;
    } else {
      updated = [
        ...items,
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
          artisanName: product.artisanName,
          artisanRegion: product.artisanRegion,
          quantity,
        }
      ];
    }

    setItems(updated);
    await setStoredCart(updated);
  };

  const updateQuantity = async (productId, delta) => {
    const updated = items
      .map((item) => {
        if (item.productId === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean);

    setItems(updated);
    await setStoredCart(updated);
  };

  const removeFromCart = async (productId) => {
    const updated = items.filter((item) => item.productId !== productId);
    setItems(updated);
    await setStoredCart(updated);
  };

  const clearCart = async () => {
    setItems([]);
    await setStoredCart([]);
  };

  // Create order from checkout
  const createOrder = async ({ buyerInfo, shippingAddress, paymentMethod }) => {
    const subtotal = items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    const shippingFee = subtotal > 2000 ? 0 : 150;
    const totalAmount = subtotal + shippingFee;

    const newOrder = {
      id: `ord_kv_${Math.floor(1000 + Math.random() * 9000)}`,
      artisanId: items[0]?.artisanId || 'art_meena_01',
      buyerId: buyerInfo?.uid || 'usr_buyer_active',
      buyerName: buyerInfo?.name || 'Valued Customer',
      buyerPhone: buyerInfo?.phone || '+91 98400 11223',
      shippingAddress: shippingAddress || 'Standard Delivery Address, India',
      items: [...items],
      totalAmount,
      subtotal,
      shippingFee,
      paymentMethod: paymentMethod || 'UPI',
      paymentStatus: 'PAID_ESCROW',
      status: 'PLACED',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
      timeline: [
        { status: 'PLACED', title: 'Order Placed by Buyer', date: 'Just now', done: true },
        { status: 'CONFIRMED', title: 'Artisan Confirmation Pending', date: 'Pending', done: false },
        { status: 'PROCESSING', title: 'Crafting & Packaging Inspection', date: 'Pending', done: false },
        { status: 'SHIPPED', title: 'Dispatch', date: 'Pending', done: false },
        { status: 'DELIVERED', title: 'Delivery', date: 'Pending', done: false },
      ]
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));

    // Empty cart upon checkout
    await clearCart();

    return newOrder;
  };

  // Artisan updates order status
  const updateOrderStatus = async (orderId, newStatus) => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        const updatedTimeline = o.timeline.map((step) => {
          if (step.status === newStatus) {
            return { ...step, done: true, date: 'Updated' };
          }
          return step;
        });
        return { ...o, status: newStatus, timeline: updatedTimeline };
      }
      return o;
    });

    setOrders(updated);
    await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
  };

  // Calculations
  const subtotal = items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const totalCount = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const shippingFee = subtotal > 2000 || subtotal === 0 ? 0 : 150;
  const total = subtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        items,
        orders,
        isLoading,
        subtotal,
        shippingFee,
        total,
        totalCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        createOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartContext;
