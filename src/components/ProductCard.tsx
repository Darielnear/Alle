// src/components/ProductCard.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Check } from 'lucide-react'
import { useCartStore } from '@/stores/useCartStore'
import { toast } from 'sonner' // Ajout de l'import pour les toasts

interface Variant {
  color_name: string
  color_hex: string
  image: string
}

interface Product {
  id: string
  slug: string
  title: string
  subtitle?: string
  price_eur: number
  old_price_eur?: number
  is_featured?: boolean
  image_url: string
  specifications?: {
    color_variants?: Variant[]
  }
}

export default function ProductCard({ product }: { product: Product }) {
  // Changement d'addItem vers addToCart suite à la mise à jour du store
  const addToCart = useCartStore((state) => state.addToCart)
  const variants = product.specifications?.color_variants || []

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    variants.length > 0 ? variants[0] : null
  )
  const [isAdded, setIsAdded] = useState(false)

  const currentImage = selectedVariant
    ? `https://faeedtjrpzxikccqfhvz.supabase.co/storage/v1/object/public/products/${selectedVariant.image}`
    : product.image_url

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Correction du payload pour correspondre au type CartItem du store
    addToCart({
      id: product.id,
      title: product.title,
      subtitle: product.subtitle,
      price_eur: product.price_eur,
      image_url: currentImage,
      slug: product.slug,
    })

    // Feedback visuel temporaire sur le bouton (1.5s)
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
    }, 1500)

    // Notification Toast élégante
    toast.success('In den Warenkorb gelegt', {
      description: `${product.title} wurde erfolgreich hinzugefügt.`,
      action: {
        label: 'Zum Warenkorb',
        onClick: () => (window.location.href = '/cart'),
      },
    })
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-neutral-200 transition-all duration-300 hover:border-neutral-900 cursor-pointer" onClick={() => window.location.href = `/produkte/${product.slug}`}>
      {/* Conteneur Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-50 p-6">
        {/* Badge : TRENDING */}
        {product.is_featured && (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-neutral-900 px-3 py-1 text-[9px] font-bold tracking-widest text-white uppercase">
            FEATURED
          </span>
        )}

        {/* Image Produit */}
        <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-105">
          <Image
            src={currentImage}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      </div>

      {/* Détails Produit */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="font-medium text-neutral-900 text-sm group-hover:underline line-clamp-1">
            {product.title}
          </h3>
          {product.subtitle && (
            <p className="mt-0.5 text-[11px] text-neutral-500 line-clamp-1">
              {product.subtitle}
            </p>
          )}

          {/* Pastilles de Couleurs */}
          {variants.length > 0 && (
            <div className="mt-3 flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              {variants.map((variant, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setSelectedVariant(variant); }}
                  className={`h-3.5 w-3.5 rounded-full border transition-all ${
                    selectedVariant?.color_name === variant.color_name
                      ? 'border-neutral-900 ring-1 ring-neutral-900'
                      : 'border-neutral-200 hover:scale-110'
                  }`}
                  style={{ backgroundColor: variant.color_hex }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Prix et Bouton Panier */}
        <div className="mt-5 flex items-center justify-between pt-4 border-t border-neutral-100">
          <div className="flex flex-col">
            <span className="text-sm font-extrabold text-neutral-900 font-mono">
              {product.price_eur.toFixed(2)} €
            </span>
            {product.old_price_eur && (
              <span className="text-[10px] text-neutral-400 line-through font-mono">
                {product.old_price_eur.toFixed(2)} €
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-900 text-white hover:bg-neutral-700'
            }`}
          >
            {isAdded ? (
              <Check className="h-4 w-4" />
            ) : (
              <ShoppingBag className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}