import { useState, useEffect, useCallback } from 'react';
import { CartItem, Product, ProductVariant } from '../types';
import { StorageService } from '../services/storage';
import { SITE_CONFIG } from '../config/site.config';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    return StorageService.getItem<CartItem[]>(
      SITE_CONFIG.STORAGE_KEYS.CART_ITEMS,
      []
    );
  });

  useEffect(() => {
    StorageService.setItem(SITE_CONFIG.STORAGE_KEYS.CART_ITEMS, cart);
  }, [cart]);

  const addToCart = useCallback(
    (
      product: Product,
      quantity: number = 1,
      variant?: ProductVariant,
      notes?: string
    ) => {
      setCart((prevCart) => {
        const existingIndex = prevCart.findIndex(
          (item) =>
            item.product.id === product.id &&
            ((!item.selectedVariant && !variant) ||
              item.selectedVariant?.id === variant?.id)
        );

        if (existingIndex > -1) {
          const updated = [...prevCart];
          updated[existingIndex].quantity += Math.max(1, quantity);
          if (notes) updated[existingIndex].notes = notes;
          return updated;
        } else {
          return [
            ...prevCart,
            { product, quantity: Math.max(1, quantity), selectedVariant: variant, notes },
          ];
        }
      });
    },
    []
  );

  const updateQuantity = useCallback((index: number, newQty: number) => {
    setCart((prev) => {
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      const updated = [...prev];
      if (updated[index]) {
        updated[index].quantity = newQty;
      }
      return updated;
    });
  }, []);

  const removeItem = useCallback((index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    totalItemCount,
  };
}
