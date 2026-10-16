'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/stores/useCartStore'
import { NAV_CATEGORIES } from '@/lib/shop'
import { useEffect, useState } from 'react'

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const totalItems = useCartStore((state) => state.getTotalItems())

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-black text-2xl tracking-tighter text-neutral-900">
            SPORT<span className="text-blue-600">TECH</span>
            <span className="text-[10px] bg-neutral-900 text-white px-1.5 py-0.5 rounded ml-0.5">
              .DE
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-neutral-600">
            <Link href="/produkte" className="hover:text-blue-600 transition-colors">
              Alle Produkte
            </Link>
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/produkte?category=${cat.slug}`}
                className="hover:text-blue-600 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
            <Link href="/zahlung-versand" className="hover:text-blue-600 transition-colors">
              Zahlung & Versand
            </Link>
            <Link href="/bestellung-verfolgen" className="hover:text-blue-600 transition-colors">
              Bestellung verfolgen
            </Link>
          </nav>

          <Link
            href="/cart"
            className="relative flex items-center gap-2 bg-neutral-900 text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-neutral-800 transition-all"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Warenkorb</span>
            {mounted && totalItems > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}