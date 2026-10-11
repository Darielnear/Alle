'use client'

import Link from 'next/link'
import { useCartStore } from '@/stores/useCartStore'
import { useEffect, useState } from 'react'
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react'
import { formatEur, getShippingCost, getVatIncluded } from '@/lib/shop'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCartStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const subtotal = getTotalPrice()
  const shipping = getShippingCost(subtotal)
  const total = subtotal + shipping
  const vat = getVatIncluded(total)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <Link
          href="/produkte"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Weiter einkaufen
        </Link>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Ihr Warenkorb
        </h1>
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-xl flex-shrink-0 flex items-center justify-center p-2">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.title} className="object-contain h-full w-full" />
                    ) : (
                      <ShoppingBag className="w-8 h-8 text-slate-300" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                      {item.subtitle || 'Originalware'}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-900 font-black text-sm mt-1 sm:hidden">
                      {formatEur(item.price_eur * item.quantity)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  <div className="flex items-center gap-2 border border-slate-200 rounded-xl p-1 bg-slate-50">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-white rounded-lg transition-colors text-slate-600"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-slate-900 px-2 min-w-[20px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-white rounded-lg transition-colors text-slate-600"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-slate-900 font-black text-base hidden sm:block min-w-[80px] text-right">
                    {formatEur(item.price_eur * item.quantity)}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4 bg-slate-50 border border-slate-200/80 rounded-3xl p-6 space-y-6">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-200 pb-4">
              Bestellübersicht
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Zwischensumme</span>
                <span>{formatEur(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Versandkosten (DHL)</span>
                {shipping === 0 ? (
                  <span className="text-emerald-600 font-bold">Kostenlos</span>
                ) : (
                  <span>{formatEur(shipping)}</span>
                )}
              </div>
              <div className="flex justify-between text-slate-600 font-medium text-xs">
                <span>Enthaltene MwSt. (19%)</span>
                <span>{formatEur(vat)}</span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between font-black text-slate-900 text-lg">
                <span>Gesamtsumme</span>
                <span>{formatEur(total)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all text-center flex items-center justify-center gap-2"
            >
              <span>Zur Kasse</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-slate-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Sichere Zahlung per Vorkasse (SEPA)
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200 space-y-4">
          <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
          <p className="text-slate-600 text-sm font-semibold">Ihr Warenkorb ist derzeit leer.</p>
          <Link
            href="/produkte"
            className="inline-block bg-slate-900 text-white font-bold text-xs px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors"
          >
            Jetzt Produkte entdecken
          </Link>
        </div>
      )}
    </div>
  )
}
