'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/stores/useCartStore'
import { CheckCircle2, ShieldCheck, Copy, Check } from 'lucide-react'
import {
  BANK,
  SHIP_COUNTRIES,
  formatEur,
  getShippingCost,
  getVatIncluded,
} from '@/lib/shop'

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
    country: 'DE',
    email: '',
  })

  const subtotal = getTotalPrice()
  const shipping = getShippingCost(subtotal)
  const total = subtotal + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const name = formData.name.trim()
    const street = formData.street.trim()
    const zipCity = formData.zipCity.trim()
    const email = formData.email.trim().toLowerCase()
    const countryLabel =
      SHIP_COUNTRIES.find((c) => c.code === formData.country)?.label ||
      formData.country

    if (!name || !street || !zipCity || !email) {
      setError('Bitte füllen Sie alle Pflichtfelder aus.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Bitte geben Sie eine gültige E-Mail-Adresse ein.')
      return
    }
    if (cart.length === 0) {
      setError('Ihr Warenkorb ist leer.')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          street,
          zipCity: `${zipCity}, ${countryLabel}`,
          email,
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
        name,
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
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Vielen Dank für Ihre Bestellung!
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm">
            Bestellnummer{' '}
            <span className="font-bold text-slate-900">
              {confirmed.orderNumber}
            </span>
            . Bitte überweisen Sie den Gesamtbetrag mit diesem Verwendungszweck.
          </p>
        </div>

        <div className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-neutral-700 pb-4">
            <h2 className="font-black text-lg">Zahlungsdetails (Vorkasse)</h2>
            <span className="text-blue-400 text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> SEPA Überweisung
            </span>
          </div>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-neutral-800">
              <span className="text-neutral-400">Gesamtbetrag:</span>
              <span className="text-xl font-black text-white">
                {formatEur(confirmed.total)}
              </span>
            </div>
            <div className="space-y-2 pt-2">
              <p className="text-neutral-400">
                Kontoinhaber:{' '}
                <span className="font-bold text-white">{BANK.holder}</span>
              </p>
              <p className="text-neutral-400">
                IBAN:{' '}
                <span className="font-mono font-bold text-white">
                  {BANK.iban}
                </span>
              </p>
              <p className="text-neutral-400">
                BIC:{' '}
                <span className="font-mono font-bold text-white">
                  {BANK.bic}
                </span>
              </p>
              <p className="text-neutral-400">
                Verwendungszweck:{' '}
                <span className="font-mono font-bold text-blue-400">
                  {confirmed.orderNumber}
                </span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={copyIban}
            className="w-full bg-neutral-800 hover:bg-neutral-700 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? 'IBAN kopiert!' : 'IBAN in Zwischenablage kopieren'}
          </button>
        </div>

        <p className="text-center text-sm text-slate-500">
          <Link href="/" className="text-blue-600 font-bold hover:underline">
            Zurück zum Shop
          </Link>
        </p>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-2xl font-black text-slate-900">
          Ihr Warenkorb ist leer
        </h1>
        <Link
          href="/produkte"
          className="inline-block bg-slate-900 text-white font-bold text-xs px-6 py-3 rounded-xl"
        >
          Produkte ansehen
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      <h1 className="text-3xl font-black text-slate-900">Kasse / Lieferadresse</h1>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
      >
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
          <h2 className="font-black text-slate-900 text-lg mb-2">
            Lieferdetails
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Vollständiger Name
            </label>
            <input
              required
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Straße & Hausnummer
            </label>
            <input
              required
              type="text"
              autoComplete="street-address"
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
              className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              PLZ & Ort
            </label>
            <input
              required
              type="text"
              autoComplete="postal-code"
              placeholder="z.B. 22880 Wedel"
              value={formData.zipCity}
              onChange={(e) =>
                setFormData({ ...formData, zipCity: e.target.value })
              }
              className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Land
            </label>
            <select
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-blue-600 bg-white"
            >
              {SHIP_COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              E-Mail Adresse
            </label>
            <input
              required
              type="text"
              inputMode="email"
              autoComplete="email"
              placeholder="name@email.de"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-blue-600"
            />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-6">
          <h2 className="font-black text-slate-900 text-lg">Zahlungsmethode</h2>
          <div className="p-4 bg-white border border-blue-200 rounded-2xl flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900">
              Vorkasse per SEPA Überweisung
            </span>
            <ShieldCheck className="w-5 h-5 text-blue-600" />
          </div>

          <div className="border-t border-slate-200 pt-4 space-y-2 text-sm font-semibold">
            <div className="flex justify-between text-slate-600">
              <span>Zwischensumme ({cart.length} Artikel)</span>
              <span>{formatEur(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Versand</span>
              <span className="text-emerald-600 font-bold">Kostenlos</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Enthaltene MwSt.</span>
              <span>{formatEur(getVatIncluded(total))}</span>
            </div>
            <div className="flex justify-between text-slate-900 font-black pt-2">
              <span>Gesamtsumme</span>
              <span>{formatEur(total)}</span>
            </div>
          </div>

          {error && (
            <p className="text-sm font-semibold text-red-600 bg-red-50 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

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