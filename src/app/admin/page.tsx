'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Package, LogOut, Save, RefreshCw } from 'lucide-react'

type OrderRow = {
  id: string
  order_number: string | null
  order_reference: string | null
  customer_email: string
  customer_first_name: string
  customer_last_name: string
  shipping_address: string
  payment_status: string
  fulfillment_status: string | null
  total_amount: number
  tracking_number: string | null
  created_at: string
}

const PAYMENT_OPTS = [
  'awaiting_payment',
  'pending_vorkasse',
  'paid',
  'cancelled',
]
const FULFILL_OPTS = ['new', 'processing', 'shipped', 'delivered']

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [orders, setOrders] = useState<OrderRow[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [drafts, setDrafts] = useState<
    Record<
      string,
      { payment_status: string; fulfillment_status: string; tracking_number: string }
    >
  >({})

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_token')
    if (saved) setToken(saved)
  }, [])

  const loadOrders = useCallback(async (auth: string) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/orders', {
        headers: { Authorization: `Bearer ${auth}` },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Fehler')
      const list = (data.orders || []) as OrderRow[]
      setOrders(list)
      const d: typeof drafts = {}
      list.forEach((o) => {
        d[o.id] = {
          payment_status: o.payment_status || 'awaiting_payment',
          fulfillment_status: o.fulfillment_status || 'new',
          tracking_number: o.tracking_number || '',
        }
      })
      setDrafts(d)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Fehler')
      setOrders([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (token) loadOrders(token)
  }, [token, loadOrders])

  const login = (e: React.FormEvent) => {
    e.preventDefault()
    sessionStorage.setItem('admin_token', password)
    setToken(password)
  }

  const logout = () => {
    sessionStorage.removeItem('admin_token')
    setToken('')
    setOrders([])
  }

  const saveOrder = async (id: string) => {
    const d = drafts[id]
    if (!d) return
    setSavingId(id)
    setError('')
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...d }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Speichern fehlgeschlagen')
      await loadOrders(token)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Fehler')
    } finally {
      setSavingId(null)
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <form
          onSubmit={login}
          className="bg-white border border-slate-200 rounded-2xl p-8 w-full max-w-sm shadow-sm space-y-4"
        >
          <div className="flex items-center gap-2 font-black text-xl text-slate-900">
            <Package className="w-5 h-5 text-blue-600" /> Admin
          </div>
          <p className="text-xs text-slate-500">
            Passwort aus der Umgebungsvariable <code>ADMIN_PASSWORD</code>.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin-Passwort"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            required
          />
          <button
            type="submit"
            className="w-full rounded-full bg-slate-900 text-white py-3 text-sm font-bold hover:bg-black"
          >
            Anmelden
          </button>
          <Link href="/" className="block text-center text-xs text-slate-500">
            ← Zum Shop
          </Link>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-black text-slate-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" /> Bestellungen
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => loadOrders(token)}
              className="text-xs font-semibold text-slate-600 flex items-center gap-1 hover:text-blue-600"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Aktualisieren
            </button>
            <button
              type="button"
              onClick={logout}
              className="text-xs font-semibold text-slate-600 flex items-center gap-1 hover:text-red-600"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-4">
        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
            {error}
          </p>
        )}
        {loading && <p className="text-sm text-slate-500">Laden…</p>}
        {!loading && orders.length === 0 && (
          <p className="text-sm text-slate-500">Keine Bestellungen.</p>
        )}

        {orders.map((o) => {
          const ref = o.order_number || o.order_reference || o.id.slice(0, 8)
          const d = drafts[o.id]
          return (
            <div
              key={o.id}
              className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-slate-900 font-mono text-sm">
                    {ref}
                  </p>
                  <p className="text-xs text-slate-500">
                    {new Date(o.created_at).toLocaleString('de-DE')} ·{' '}
                    {Number(o.total_amount).toFixed(2).replace('.', ',')} €
                  </p>
                </div>
                <p className="text-xs text-slate-600 text-right">
                  {o.customer_first_name} {o.customer_last_name}
                  <br />
                  {o.customer_email}
                  <br />
                  <span className="text-slate-400">{o.shipping_address}</span>
                </p>
              </div>

              {d && (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
                  <label className="text-xs space-y-1">
                    <span className="font-semibold text-slate-500">Zahlung</span>
                    <select
                      value={d.payment_status}
                      onChange={(e) =>
                        setDrafts((prev) => ({
                          ...prev,
                          [o.id]: { ...d, payment_status: e.target.value },
                        }))
                      }
                      className="w-full rounded-lg border border-slate-200 px-2 py-2 text-sm"
                    >
                      {PAYMENT_OPTS.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-xs space-y-1">
                    <span className="font-semibold text-slate-500">Status</span>
                    <select
                      value={d.fulfillment_status}
                      onChange={(e) =>
                        setDrafts((prev) => ({
                          ...prev,
                          [o.id]: { ...d, fulfillment_status: e.target.value },
                        }))
                      }
                      className="w-full rounded-lg border border-slate-200 px-2 py-2 text-sm"
                    >
                      {FULFILL_OPTS.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-xs space-y-1 sm:col-span-1">
                    <span className="font-semibold text-slate-500">
                      Tracking
                    </span>
                    <input
                      value={d.tracking_number}
                      onChange={(e) =>
                        setDrafts((prev) => ({
                          ...prev,
                          [o.id]: { ...d, tracking_number: e.target.value },
                        }))
                      }
                      placeholder="DHL Sendungsnr."
                      className="w-full rounded-lg border border-slate-200 px-2 py-2 text-sm font-mono"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => saveOrder(o.id)}
                    disabled={savingId === o.id}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-blue-600 text-white text-xs font-bold px-4 py-2.5 hover:bg-blue-700 disabled:opacity-60"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {savingId === o.id ? '…' : 'Speichern'}
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </main>
    </div>
  )
}
