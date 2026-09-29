import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  OFFLINE_DRAFTS: '@karvia_offline_drafts',
  SYNC_QUEUE: '@karvia_sync_queue',
  CACHED_PRODUCTS: '@karvia_cached_products',
  USER_PROFILE: '@karvia_user_profile',
  CART_ITEMS: '@karvia_cart_items',
  WISHLIST: '@karvia_wishlist',
  NETWORK_STATUS: '@karvia_network_status',
};

// Listeners for sync state changes
const syncListeners = new Set();
let currentSyncStatus = 'synced'; // 'offline' | 'syncing' | 'synced'

export const subscribeSyncStatus = (callback) => {
  syncListeners.add(callback);
  callback(currentSyncStatus);
  return () => syncListeners.delete(callback);
};

const notifySyncStatus = (status) => {
  currentSyncStatus = status;
  syncListeners.forEach((cb) => {
    try {
      cb(status);
    } catch (e) {
      console.warn('Listener error:', e);
    }
  });
};

export const getSyncStatus = () => currentSyncStatus;

export const setNetworkOnline = async (isOnline) => {
  if (!isOnline) {
    notifySyncStatus('offline');
  } else {
    // Check if there are items in sync queue
    const queue = await getSyncQueue();
    if (queue.length > 0) {
      processSyncQueue();
    } else {
      notifySyncStatus('synced');
    }
  }
};

// Drafts
export const getOfflineDrafts = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.OFFLINE_DRAFTS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error fetching offline drafts:', e);
    return [];
  }
};

export const saveOfflineDraft = async (draft) => {
  try {
    const drafts = await getOfflineDrafts();
    const existingIdx = drafts.findIndex((d) => d.id === draft.id);
    const updatedDraft = {
      ...draft,
      id: draft.id || `draft_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      updatedAt: new Date().toISOString(),
      isDraft: true,
      syncState: 'pending',
    };

    if (existingIdx >= 0) {
      drafts[existingIdx] = updatedDraft;
    } else {
      drafts.unshift(updatedDraft);
    }

    await AsyncStorage.setItem(STORAGE_KEYS.OFFLINE_DRAFTS, JSON.stringify(drafts));
    
    // Also add to sync queue if auto-sync is enabled
    await enqueueSyncAction({
      type: 'SAVE_PRODUCT',
      payload: updatedDraft,
      timestamp: Date.now(),
    });

    return updatedDraft;
  } catch (e) {
    console.error('Error saving offline draft:', e);
    throw e;
  }
};

export const deleteOfflineDraft = async (draftId) => {
  try {
    const drafts = await getOfflineDrafts();
    const filtered = drafts.filter((d) => d.id !== draftId);
    await AsyncStorage.setItem(STORAGE_KEYS.OFFLINE_DRAFTS, JSON.stringify(filtered));
    return true;
  } catch (e) {
    console.error('Error deleting draft:', e);
    return false;
  }
};

// Sync Queue
export const getSyncQueue = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.SYNC_QUEUE);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const enqueueSyncAction = async (action) => {
  try {
    const queue = await getSyncQueue();
    queue.push(action);
    await AsyncStorage.setItem(STORAGE_KEYS.SYNC_QUEUE, JSON.stringify(queue));
    notifySyncStatus('syncing');
    return queue.length;
  } catch (e) {
    console.error('Error enqueueing sync action:', e);
    return 0;
  }
};

export const processSyncQueue = async () => {
  notifySyncStatus('syncing');
  try {
    const queue = await getSyncQueue();
    if (queue.length === 0) {
      notifySyncStatus('synced');
      return;
    }

    // Simulate reliable sync process with server
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Clear queue after successful sync
    await AsyncStorage.setItem(STORAGE_KEYS.SYNC_QUEUE, JSON.stringify([]));
    notifySyncStatus('synced');
  } catch (e) {
    console.error('Error processing sync queue:', e);
    notifySyncStatus('offline');
  }
};

// Cached Products Catalog
export const getCachedProducts = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.CACHED_PRODUCTS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const setCachedProducts = async (products) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.CACHED_PRODUCTS, JSON.stringify(products));
  } catch (e) {
    console.warn('Error caching products:', e);
  }
};

// Cart Storage
export const getStoredCart = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.CART_ITEMS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const setStoredCart = async (items) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.CART_ITEMS, JSON.stringify(items));
  } catch (e) {
    console.warn('Error storing cart:', e);
  }
};

// Wishlist Storage
export const getStoredWishlist = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.WISHLIST);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const setStoredWishlist = async (items) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(items));
  } catch (e) {
    console.warn('Error storing wishlist:', e);
  }
};

export default {
  subscribeSyncStatus,
  getSyncStatus,
  setNetworkOnline,
  getOfflineDrafts,
  saveOfflineDraft,
  deleteOfflineDraft,
  getSyncQueue,
  enqueueSyncAction,
  processSyncQueue,
  getCachedProducts,
  setCachedProducts,
  getStoredCart,
  setStoredCart,
  getStoredWishlist,
  setStoredWishlist,
};
