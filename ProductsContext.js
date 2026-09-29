import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { INITIAL_PRODUCTS_SEED } from '../services/firebase';
import { getOfflineDrafts, saveOfflineDraft, deleteOfflineDraft } from '../services/offlineStorage';

const PRODUCTS_STORAGE_KEY = '@karvia_published_products';
const WISHLIST_STORAGE_KEY = '@karvia_buyer_wishlist';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS_SEED);
  const [drafts, setDrafts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProductsAndDrafts();
  }, []);

  const loadProductsAndDrafts = async () => {
    try {
      const storedProducts = await AsyncStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        await AsyncStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS_SEED));
        setProducts(INITIAL_PRODUCTS_SEED);
      }

      const storedDrafts = await getOfflineDrafts();
      setDrafts(storedDrafts);

      const storedWishlist = await AsyncStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (e) {
      console.warn('Error loading products data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a newly published product
  const addProduct = async (productData) => {
    const newProduct = {
      ...productData,
      id: productData.id || `prod_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      createdAt: new Date().toISOString(),
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      stockCount: productData.stockCount || 5,
    };

    const updated = [newProduct, ...products];
    setProducts(updated);
    await AsyncStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));

    // If it was created from a draft, remove the draft
    if (productData.draftId) {
      await removeDraft(productData.draftId);
    }

    return newProduct;
  };

  // Update existing product
  const updateProduct = async (productId, updates) => {
    const updated = products.map((p) => (p.id === productId ? { ...p, ...updates } : p));
    setProducts(updated);
    await AsyncStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
  };

  // Delete / Archive product
  const deleteProduct = async (productId) => {
    const filtered = products.filter((p) => p.id !== productId);
    setProducts(filtered);
    await AsyncStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(filtered));
  };

  // Draft operations
  const saveDraft = async (draftData) => {
    const saved = await saveOfflineDraft(draftData);
    const updatedDrafts = await getOfflineDrafts();
    setDrafts(updatedDrafts);
    return saved;
  };

  const removeDraft = async (draftId) => {
    await deleteOfflineDraft(draftId);
    const updatedDrafts = await getOfflineDrafts();
    setDrafts(updatedDrafts);
  };

  // Wishlist operations
  const toggleWishlist = async (productId) => {
    let updated;
    if (wishlist.includes(productId)) {
      updated = wishlist.filter((id) => id !== productId);
    } else {
      updated = [...wishlist, productId];
    }
    setWishlist(updated);
    await AsyncStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updated));
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  return (
    <ProductsContext.Provider
      value={{
        products,
        drafts,
        wishlist,
        isLoading,
        addProduct,
        updateProduct,
        deleteProduct,
        saveDraft,
        removeDraft,
        toggleWishlist,
        isInWishlist,
        refreshProducts: loadProductsAndDrafts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);

export default ProductsContext;
