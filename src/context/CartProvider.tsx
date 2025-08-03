"use client";

import React, { createContext, useReducer, useContext, ReactNode, useMemo } from 'react';
import type { Product, CartItem, Region, REGIONS } from '@/lib/types';

const VAT_RATE = 0.18;
const SHIPPING_COST_THIES = 500;
const SHIPPING_COST_OTHER_REGIONS_RATE = 0.07;

interface CartState {
  items: CartItem[];
  shippingRegion: Region;
}

type CartAction =
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
      return { ...state, items: [] };
    default:
      return state;
  }
};

interface CartContextType extends CartState {
  dispatch: React.Dispatch<CartAction>;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setRegion: (region: Region) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  shippingCost: number;
  vat: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const itemCount = useMemo(() => state.items.reduce((sum, item) => sum + item.quantity, 0), [state.items]);
  const subtotal = useMemo(() => state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [state.items]);
  const shippingCost = useMemo(() => {
    if (itemCount === 0) return 0;
    if (state.shippingRegion === 'Thiès') {
      return SHIPPING_COST_THIES;
    }
    return subtotal * SHIPPING_COST_OTHER_REGIONS_RATE;
  }, [subtotal, state.shippingRegion, itemCount]);
  const vat = useMemo(() => subtotal * VAT_RATE, [subtotal]);
  const total = useMemo(() => subtotal + vat + shippingCost, [subtotal, vat, shippingCost]);


  const addItem = (product: Product, quantity: number) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };
  
  const setRegion = (region: Region) => {
      dispatch({ type: 'SET_REGION', payload: { region } });
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        dispatch,
        addItem,
        removeItem,
        updateQuantity,
        setRegion,
        clearCart,
        itemCount,
        subtotal,
        shippingCost,
        vat,
        total,
      }}
    >
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
