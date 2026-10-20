import Link from 'next/link'
import { Building2, Truck, ShieldCheck, Clock } from 'lucide-react'
import { BANK } from '@/lib/shop'

export default function ZahlungVersandPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1 mb-6"
        >
          ← Zurück zur Startseite
        </Link>

        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Zahlung & Versand
          </h1>
          <p className="mt-2 text-sm text-slate-500 max-w-2xl">
            Transparente Informationen zu Vorkasse und Versand nach Deutschland,
            Österreich, Schweiz, Liechtenstein und Luxemburg.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">
                  Vorkasse per SEPA-Überweisung
                </h2>
                <p className="text-xs text-slate-500">Sicher & Direkt</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Sie überweisen den Rechnungsbetrag auf unser Bankkonto. Nach der
              Bestellung erhalten Sie IBAN, BIC und den Verwendungszweck
              (Bestellnummer).
            </p>

            {!BANK.isPlaceholder && (
              <ul className="mt-4 space-y-1 text-xs text-slate-600 border-t border-slate-100 pt-4 font-mono">
                <li>Kontoinhaber: {BANK.holder}</li>
                <li>IBAN: {BANK.iban}</li>
                <li>BIC: {BANK.bic}</li>
              </ul>
            )}

            <ul className="mt-4 space-y-2 text-xs text-slate-500 border-t border-slate-100 pt-4">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Keine Kreditkartendaten erforderlich
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" />
                Versand nach Zahlungseingang
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-slate-950">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">Versand</h2>
                <p className="text-xs text-slate-500">DHL · Sendungsverfolgung</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Versand aus Deutschland. Lieferländer: Deutschland, Österreich,
              Schweiz, Liechtenstein, Luxemburg.
            </p>

            <div className="mt-4 space-y-2 text-xs border-t border-slate-100 pt-4">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Lieferzeit (DE):</span>
                <span className="font-semibold text-slate-900">1–3 Werktage</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Lieferzeit (AT, CH, LI, LU):</span>
                <span className="font-semibold text-slate-900">3–7 Werktage</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Versandkosten:</span>
                <span className="font-semibold text-emerald-600">Kostenlos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}