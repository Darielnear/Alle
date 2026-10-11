'use client'

import { useCartStore, CartItem } from '@/stores/useCartStore'
import { ShoppingBag, Check, Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface AddToCartButtonProps {
  product: Omit<CartItem, 'quantity'>
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart)

  // Quantité choisie localement sur la fiche produit (par défaut 1)
  const [selectedQuantity, setSelectedQuantity] = useState(1)

  const cart = useCartStore((state) => state.cart)
  const cartItem = cart.find((item) => item.id === product.id)
  const currentInCart = cartItem ? cartItem.quantity : 0

  const [added, setAdded] = useState(false)

  const handleDecrease = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity((prev) => prev - 1)
    }
  }

  const handleIncrease = () => {
    setSelectedQuantity((prev) => prev + 1)
  }

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (!product || !product.id) return

    addToCart(product, selectedQuantity)

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)

    const newTotalInCart = currentInCart + selectedQuantity

    toast.success('In den Warenkorb gelegt', {
      description: `${selectedQuantity}x ${product.title} wurde hinzugefügt (Gesamt im Korb: ${newTotalInCart})`,
      action: {
        label: 'Zum Warenkorb',
        onClick: () => (window.location.href = '/cart'),
      },
    })
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
      {/* Sélecteur de Quantité (- 1 +) */}
      <div className="flex items-center justify-between bg-slate-100 border border-slate-200 rounded-2xl p-1.5 w-full sm:w-auto shrink-0">
        <button
          type="button"
          onClick={handleDecrease}
          disabled={selectedQuantity <= 1}
          className="w-10 h-10 rounded-xl bg-white text-slate-700 font-bold flex items-center justify-center shadow-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
          aria-label="Anzahl verringern"
        >
          <Minus className="w-4 h-4" />
        </button>

        <span className="px-4 font-black text-slate-900 text-base min-w-[2.5rem] text-center">
          {selectedQuantity}
        </span>

        <button
          type="button"
          onClick={handleIncrease}
          className="w-10 h-10 rounded-xl bg-white text-slate-700 font-bold flex items-center justify-center shadow-sm hover:bg-slate-50 transition-all active:scale-95"
          aria-label="Anzahl erhöhen"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Bouton d'ajout au panier */}
      <button
        onClick={handleAdd}
        type="button"
        className={`w-full font-black py-4 px-6 rounded-2xl shadow-md transition-all text-sm sm:text-base flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] ${
          added
            ? 'bg-emerald-600 text-white shadow-emerald-200'
            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 hover:shadow-lg'
        }`}
      >
        {added ? (
          <>
            <Check className="w-5 h-5 stroke-[3]" />
            <span>Hinzugefügt! ({currentInCart + selectedQuantity})</span>
          </>
        ) : (
          <>
            <ShoppingBag className="w-5 h-5" />
            <span className="inline-flex items-center gap-2">
              In den Warenkorb
              {currentInCart > 0 && (
                <span className="inline-flex items-center justify-center bg-white/20 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                  {currentInCart} im Korb
                </span>
              )}
            </span>
          </>
        )}
      </button>
    </div>
  )
}