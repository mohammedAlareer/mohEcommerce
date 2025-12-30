import { CartStoreActionsType, CartStoreStateType } from '@/types';
import { create } from 'zustand'
import { persist, createJSONStorage } from "zustand/middleware";


const useCartStore = create<CartStoreStateType & CartStoreActionsType>()(
  persist(
    (set) => ({
      cart: [],
      hasHydrated: false,
      addToCart: (product) =>
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (p) =>
              p.id === product.id &&
              p.selectedColor === product.selectedColor &&
              p.selectedSize === product.selectedSize
          );
          if (existingIndex !== -1) {
            const updateCart = [...state.cart];
            updateCart[existingIndex].quantity += product.quantity || 1;
            return { cart: updateCart };
          }
          return {
            cart: [
              ...state.cart,
              {
                ...product
              },
            ],
          };
        }),
      removeFromCart: (product) =>
        set((state) => ({
          cart: state.cart.filter(
            (p) =>
              !(
                p.id === product.id &&
                p.selectedSize === product.selectedSize &&
                p.selectedColor === product.selectedColor
              )
          ),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if(state){
          state.hasHydrated = true
        }
      }
    }
  )
);



export default useCartStore;