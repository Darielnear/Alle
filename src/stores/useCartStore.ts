import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  title: string
  price_eur: number
  image_url?: string
  subtitle?: string
  slug: string
  quantity: number
}

interface CartStore {
  cart: CartItem[]
  addToCart: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void
  addItem: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product, quantity = 1) => {
        const currentCart = get().cart
        const existingItem = currentCart.find((item) => item.id === product.id)

        if (existingItem) {
          set({
            cart: currentCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          })
        } else {
          set({ cart: [...currentCart, { ...product, quantity }] })
        }
      },

      // Alias pour garantir la rétrocompatibilité
      addItem: (product, quantity = 1) => {
        get().addToCart(product, quantity)
      },

      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.id !== productId) })
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId)
          return
        }
        set({
          cart: get().cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        })
      },

      clearCart: () => set({ cart: [] }),

      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().cart.reduce(
          (total, item) => total + item.price_eur * item.quantity,
          0
        )
      },
    }),
    {
      name: 'shopping-cart-storage',
    }
  )
)