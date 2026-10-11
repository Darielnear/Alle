'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/stores/useCartStore'
import { CheckCircle2, ShieldCheck, Copy, Check } from 'lucide-react'
import { BANK, formatEur, getShippingCost, getVatIncluded } from '@/lib/shop'

interface ConfirmedOrder {
  orderNumber: string
  total: number
  shipping: number
  subtotal: number
  name: string
}

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCartStore()
  const [confirmed, setConfirmed] = useState<ConfirmedOrder | null>(null)
  const [copied, setCopied] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    zipCity: '',
    email: '',
  })

  const subtotal = getTotalPrice()
  const shipping = getShippingCost(subtotal)
  const total = subtotal + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: cart.map((item) => ({
            id: item.id,
            title: item.title,
            quantity: item.quantity,
            price_eur: item.price_eur,
          })),
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Bestellung fehlgeschlagen')
      }

      setConfirmed({
        orderNumber: data.orderNumber,
        total,
        shipping,
        subtotal,
        name: formData.name,
      })
      clearCart()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bestellung fehlgeschlagen')
    } finally {
      setSubmitting(false)
    }
  }

  const copyIban = () => {
    navigator.clipboard.writeText(BANK.iban.replace(/\s/g, ''))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (confirmed) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16 space-y-8">
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Vielen Dank für Ihre Bestellung!</h1>
          <p className="text-slate-600 text-xs sm:text-sm">
            Bestellnummer <span className="font-bold text-slate-900">{confirmed.orderNumber}</span>.
            Bitte überweisen Sie den Gesamtbetrag mit diesem Verwendungszweck.
          </p>
        </div>

        {BANK.isPlaceholder && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800 font-medium">
            Bankverbindung folgt. IBAN und BIC sind Platzhalter und werden vor dem Live-Gang ersetzt.
          </div>
        )}

        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="font-black text-lg">Bankverbindung für Vorkasse</h2>
            <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> SEPA Überweisung
            </span>
          </div>

          <div className="space-y-4 text-sm font-medium">
            <div className="flex justify-between items-center py-1 border-b border-slate-800">
              <span className="text-slate-400">Gesamtbetrag:</span>
              <span className="text-2xl font-black text-emerald-400">{formatEur(confirmed.total)}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800">
              <span className="text-slate-400">Kontoinhaber:</span>
              <span className="font-bold">{BANK.holder}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800">
              <span className="text-slate-400">IBAN:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold">{BANK.iban}</span>
                <button onClick={copyIban} className="bg-slate-800 hover:bg-slate-700 p-1.5 rounded-lg text-slate-300">
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800">
              <span className="text-slate-400">BIC:</span>
              <span className="font-mono font-bold">{BANK.bic}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-400">Verwendungszweck:</span>
              <span className="font-mono font-bold text-blue-400">{confirmed.orderNumber}</span>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-slate-500">
          <Link href="/produkte" className="font-bold text-blue-600 hover:text-blue-700">
            Zurück zum Shop
          </Link>
        </p>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-2xl font-black text-slate-900">Ihr Warenkorb ist leer</h1>
        <p className="text-sm text-slate-500">Legen Sie zuerst Artikel in den Warenkorb, um zur Kasse zu gehen.</p>
        <Link href="/produkte" className="inline-block bg-slate-900 text-white font-bold text-xs px-6 py-3 rounded-xl">
          Produkte ansehen
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      <h1 className="text-3xl font-black text-slate-900">Kasse / Lieferadresse</h1>

      {BANK.isPlaceholder && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800 font-medium">
          Die endgültige IBAN wird später eingetragen. Der Bestellablauf ist bereits vollständig vorbereitet.
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
          <h2 className="font-black text-slate-900 text-lg mb-2">Lieferdetails</h2>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Vollständiger Name</label>
            <input
              required
              type="text"
              placeholder="z.B. Heiko Lehmann"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-blue-600"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Straße & Hausnummer</label>
            <input
              required
              type="text"
              placeholder="z.B. Moselstrasse 44"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-blue-600"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">PLZ & Ort</label>
            <input
              required
              type="text"
              placeholder="z.B. 54340 Bekond"
              value={formData.zipCity}
              onChange={(e) => setFormData({ ...formData, zipCity: e.target.value })}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-blue-600"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">E-Mail Adresse</label>
            <input
              required
              type="email"
              placeholder="heiko@example.de"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-blue-600"
            />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-6">
          <h2 className="font-black text-slate-900 text-lg">Zahlungsmethode</h2>
          <div className="p-4 bg-white border border-blue-200 rounded-2xl flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900">Vorkasse per SEPA Überweisung</span>
            <ShieldCheck className="w-5 h-5 text-blue-600" />
          </div>

          <div className="border-t border-slate-200 pt-4 space-y-2 text-sm font-semibold">
            <div className="flex justify-between text-slate-600">
              <span>Zwischensumme ({cart.length} Artikel)</span>
              <span>{formatEur(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Versand</span>
              <span>{shipping === 0 ? 'Kostenlos' : formatEur(shipping)}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Enthaltene MwSt. (19%)</span>
              <span>{formatEur(getVatIncluded(total))}</span>
            </div>
            <div className="flex justify-between text-slate-900 font-black pt-2">
              <span>Gesamtsumme</span>
              <span>{formatEur(total)}</span>
            </div>
          </div>

          {error && <p className="text-xs font-semibold text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-black py-4 rounded-2xl shadow-md transition-all text-sm"
          >
            {submitting ? 'Wird gesendet…' : 'Kostenpflichtig bestellen'}
          </button>
        </div>
      </form>
    </div>
  )
}
