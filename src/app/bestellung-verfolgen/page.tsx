'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Package, Search, Truck, CheckCircle2 } from 'lucide-react'

interface OrderStatus {
  orderNumber: string
  paymentStatus: string
  fulfillmentStatus: string
  total: number
  trackingNumber: string | null
  createdAt: string
  shippedAt: string | null
}

const PAYMENT_LABELS: Record<string, string> = {
  awaiting_payment: 'Wartet auf Überweisung',
  pending_vorkasse: 'Wartet auf Überweisung',
  paid: 'Bezahlt',
  cancelled: 'Storniert',
}

const FULFILLMENT_LABELS: Record<string, string> = {
  new: 'Eingegangen',
  processing: 'In Bearbeitung',
  shipped: 'Versendet',
  delivered: 'Zugestellt',
}

export default function BestellungVerfolgenPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<OrderStatus | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setResult(null)
    setLoading(true)

    try {
      const res = await fetch('/api/order-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber, email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Fehler')
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler bei der Abfrage')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12">
      <div className="mx-auto max-w-lg px-4">
        <Link
          href="/"
          className="text-xs font-medium text-slate-500 hover:text-slate-900 mb-6 inline-block"
        >
          ← Zurück zum Shop
        </Link>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-black text-slate-900">
              Bestellung verfolgen
            </h1>
          </div>
          <p className="text-sm text-slate-500 mb-6">
            Geben Sie Ihre Bestellnummer (z.&nbsp;B. ST-…) und die E-Mail-Adresse
            der Bestellung ein.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                Bestellnummer
              </label>
              <input
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="ST-20261015-XXXX"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                E-Mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.de"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-slate-900 text-white py-3 text-sm font-bold hover:bg-black transition-colors disabled:opacity-60"
            >
              <Search className="w-4 h-4" />
              {loading ? 'Suche…' : 'Status abrufen'}
            </button>
          </form>

          {result && (
            <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-bold">{result.orderNumber}</span>
              </div>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Zahlung</dt>
                  <dd className="font-semibold text-slate-900">
                    {PAYMENT_LABELS[result.paymentStatus] ||
                      result.paymentStatus}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Status</dt>
                  <dd className="font-semibold text-slate-900">
                    {FULFILLMENT_LABELS[result.fulfillmentStatus] ||
                      result.fulfillmentStatus}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Betrag</dt>
                  <dd className="font-semibold text-slate-900">
                    {Number(result.total).toFixed(2).replace('.', ',')} €
                  </dd>
                </div>
                {result.trackingNumber && (
                  <div className="flex justify-between gap-4 items-start">
                    <dt className="text-slate-500 flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> Tracking
                    </dt>
                    <dd className="font-mono font-semibold text-blue-600 text-right">
                      {result.trackingNumber}
                    </dd>
                  </div>
                )}
              </dl>
              {!result.trackingNumber && (
                <p className="text-xs text-slate-500 bg-slate-50 rounded-xl p-3">
                  Sobald Ihre Sendung unterwegs ist, erscheint hier die
                  Tracking-Nummer.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}