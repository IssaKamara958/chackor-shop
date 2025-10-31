
"use client";

import React, { createContext, useReducer, useContext, ReactNode, useMemo, useEffect, useCallback } from 'react';
import type { Product, CartItem, Region } from '@/types';

const SHIPPING_COST_THIES = 500;
const SHIPPING_COST_OTHER_REGIONS = 2000;
const CART_STORAGE_KEY = 'chackorShopCart';

interface CartState {
  items: CartItem[];
  shippingRegion: Region;
}

type CartAction =
  | { type: 'REHYDRATE_CART'; payload: CartState }
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'SET_REGION'; payload: { region: Region } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
  shippingRegion: 'Thiès',
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'REHYDRATE_CART':
      return action.payload;
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.payload.product, quantity: action.payload.quantity }],
      };
    }
    case 'UPDATE_QUANTITY': {
        if (action.payload.quantity <= 0) {
            return {
                ...state,
                items: state.items.filter(item => item.product.id !== action.payload.productId)
            }
        }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload.productId),
      };
    }
    case 'SET_REGION': {
        return {
            ...state,
            shippingRegion: action.payload.region,
        }
    }
    case 'CLEAR_CART':
      return { ...initialState, items: [] }; // Keep region, clear items
    default:
      return state;
  }
};

interface CartContextType extends CartState {
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setRegion: (region: Region) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  shippingCost: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isHydrated, setIsHydrated] = React.useState(false);

  // Rehydrate state from localStorage on initial client-side load
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(CART_STORAGE_KEY);
      if (savedState) {
        dispatch({ type: 'REHYDRATE_CART', payload: JSON.parse(savedState) });
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
    } finally {
        setIsHydrated(true);
    }
  }, []);

  // Persist state to localStorage on any change
  useEffect(() => {
    if(isHydrated) {
        try {
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
          console.error("Failed to save cart to localStorage", error);
        }
    }
  }, [state, isHydrated]);


  const itemCount = useMemo(() => state.items.reduce((sum, item) => sum + item.quantity, 0), [state.items]);
  const subtotal = useMemo(() => state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [state.items]);
  
  const shippingCost = useMemo(() => {
    if (itemCount === 0) return 0;
    if (state.shippingRegion === 'Thiès') {
      return SHIPPING_COST_THIES;
    }
    return SHIPPING_COST_OTHER_REGIONS;
  }, [itemCount, state.shippingRegion]);
  
  const total = useMemo(() => subtotal + shippingCost, [subtotal, shippingCost]);

  const addItem = useCallback((product: Product, quantity: number) => dispatch({ type: 'ADD_ITEM', payload: { product, quantity } }), []);
  const removeItem = useCallback((productId: string) => dispatch({ type: 'REMOVE_ITEM', payload: { productId } }), []);
  const updateQuantity = useCallback((productId: string, quantity: number) => dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } }), []);
  const setRegion = useCallback((region: Region) => dispatch({ type: 'SET_REGION', payload: { region } }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);


  const value = useMemo(() => ({
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    setRegion,
    clearCart,
    itemCount,
    subtotal,
    shippingCost,
    total,
  }), [state, addItem, removeItem, updateQuantity, setRegion, clearCart, itemCount, subtotal, shippingCost, total]);


  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
