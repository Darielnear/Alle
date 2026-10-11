import LegalLayout from '@/components/LegalLayout'
import { FREE_SHIPPING_FROM_EUR, SHIPPING_COST_EUR, formatEur } from '@/lib/shop'

export default function FaqPage() {
  return (
    <LegalLayout title="Häufige Fragen">
      <h2 className="text-lg font-bold text-slate-900">Welche Zahlungsmethoden gibt es?</h2>
      <p>Aktuell ausschließlich Vorkasse per SEPA-Überweisung auf ein deutsches Konto.</p>
      <h2 className="text-lg font-bold text-slate-900">Wann wird versendet?</h2>
      <p>Nach Zahlungseingang in der Regel innerhalb von 1–2 Werktagen. Lieferzeit in Deutschland: 1–3 Werktage.</p>
      <h2 className="text-lg font-bold text-slate-900">Was kostet der Versand?</h2>
      <p>
        {formatEur(SHIPPING_COST_EUR)} pro Bestellung, kostenlos ab {formatEur(FREE_SHIPPING_FROM_EUR)} Bestellwert.
      </p>
      <h2 className="text-lg font-bold text-slate-900">Kann ich zurückgeben?</h2>
      <p>Ja, als Verbraucher innerhalb von 14 Tagen. Details stehen in der Widerrufsbelehrung.</p>
    </LegalLayout>
  )
}
