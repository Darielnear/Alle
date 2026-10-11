import Link from 'next/link'
import { Building2, Truck, ShieldCheck, Clock } from 'lucide-react'
import { BANK, FREE_SHIPPING_FROM_EUR, SHIPPING_COST_EUR, formatEur } from '@/lib/shop'

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
            Transparente Informationen über unsere Zahlungsmethoden und den schnellen Versand innerhalb Deutschlands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">Vorkasse per SEPA-Überweisung</h2>
                <p className="text-xs text-slate-500">Sicher & Direkt</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Sie überweisen den Rechnungsbetrag bequem auf unser deutsches Bankkonto. Nach Absendung Ihrer Bestellung
              erhalten Sie unsere Bankverbindung sowie einen eindeutigen Verwendungszweck (Bestellnummer).
            </p>

            {BANK.isPlaceholder && (
              <p className="mt-3 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
                IBAN folgt. Die Überweisungsdaten werden vor dem Live-Gang hinterlegt.
              </p>
            )}

            <ul className="mt-4 space-y-2 text-xs text-slate-500 border-t border-slate-100 pt-4">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Maximale Sicherheit ohne Eingabe sensibler Kreditkartendaten
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" />
                Bearbeitung sofort nach Zahlungseingang (1-2 Werktage)
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-slate-950">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">Versand mit DHL</h2>
                <p className="text-xs text-slate-500">Schnell & Verfolgbar</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Der Versand erfolgt versichert direkt aus unserem Lager in Deutschland per DHL. Sie erhalten eine
              Sendungsverfolgungsnummer per E-Mail, sobald Ihr Paket übergeben wurde.
            </p>

            <div className="mt-4 space-y-2 text-xs border-t border-slate-100 pt-4">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Lieferzeit innerhalb Deutschlands:</span>
                <span className="font-semibold text-slate-900">1 - 3 Werktage</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Standard Versandkosten:</span>
                <span className="font-semibold text-slate-900">{formatEur(SHIPPING_COST_EUR)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Kostenloser Versand:</span>
                <span className="font-semibold text-emerald-600">ab {formatEur(FREE_SHIPPING_FROM_EUR)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
