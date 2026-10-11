import LegalLayout from '@/components/LegalLayout'
import { COMPANY, FREE_SHIPPING_FROM_EUR, SHIPPING_COST_EUR, formatEur } from '@/lib/shop'

export default function AgbPage() {
  return (
    <LegalLayout title="Allgemeine Geschäftsbedingungen">
      <p>
        Es gelten die nachfolgenden AGB der {COMPANY.legalName} für Bestellungen über {COMPANY.brand}. Vertragssprache
        ist Deutsch.
      </p>
      <h2 className="text-lg font-bold text-slate-900">1. Vertragsschluss</h2>
      <p>
        Die Darstellung der Produkte stellt kein rechtlich bindendes Angebot dar. Mit Klick auf „Kostenpflichtig
        bestellen“ geben Sie ein verbindliches Angebot ab. Der Vertrag kommt zustande, wenn wir die Bestellung
        annehmen, spätestens mit Versand der Ware.
      </p>
      <h2 className="text-lg font-bold text-slate-900">2. Preise und Zahlung</h2>
      <p>
        Alle Preise verstehen sich inklusive gesetzlicher MwSt. Versandkosten: {formatEur(SHIPPING_COST_EUR)},
        kostenlos ab {formatEur(FREE_SHIPPING_FROM_EUR)} Bestellwert. Zahlung ausschließlich per Vorkasse (SEPA-Überweisung).
        Der Versand erfolgt nach Zahlungseingang.
      </p>
      <h2 className="text-lg font-bold text-slate-900">3. Lieferung</h2>
      <p>Lieferung innerhalb Deutschlands in der Regel innerhalb von 1–3 Werktagen nach Zahlungseingang per DHL.</p>
      <h2 className="text-lg font-bold text-slate-900">4. Widerruf</h2>
      <p>
        Verbraucher haben ein 14-tägiges Widerrufsrecht. Einzelheiten finden Sie in der{' '}
        <a href="/widerruf" className="text-blue-600 font-semibold">
          Widerrufsbelehrung
        </a>
        .
      </p>
    </LegalLayout>
  )
}
