import LegalLayout from '@/components/LegalLayout'
import {
  COMPANY,
  FREE_SHIPPING_FROM_EUR,
  SHIPPING_COST_EUR,
  formatEur,
} from '@/lib/shop'

export default function AgbPage() {
  return (
    <LegalLayout title="Allgemeine Geschäftsbedingungen">
      <p>
        Es gelten die nachfolgenden Allgemeinen Geschäftsbedingungen (AGB) der{' '}
        {COMPANY.legalName} ({COMPANY.brand}) für Bestellungen über den
        Onlineshop. Vertragssprache ist Deutsch.
      </p>

      <h2 className="text-lg font-bold text-slate-900">1. Geltungsbereich</h2>
      <p>
        Diese AGB gelten für alle Verträge, die Verbraucher oder Unternehmer
        über den Onlineshop mit uns schließen. Abweichende Bedingungen des
        Kunden werden nicht anerkannt, es sei denn, wir stimmen ihrer Geltung
        ausdrücklich zu.
      </p>

      <h2 className="text-lg font-bold text-slate-900">2. Vertragsschluss</h2>
      <p>
        Die Darstellung der Produkte im Shop stellt kein rechtlich bindendes
        Angebot dar, sondern eine Aufforderung zur Abgabe einer Bestellung. Mit
        Absenden der Bestellung (z.&nbsp;B. Klick auf „Kostenpflichtig
        bestellen“) geben Sie ein verbindliches Angebot ab. Der Vertrag kommt
        zustande, wenn wir die Bestellung annehmen – spätestens mit Versand der
        Ware oder durch Zusendung einer Auftragsbestätigung per E-Mail.
      </p>

      <h2 className="text-lg font-bold text-slate-900">3. Preise und Zahlung</h2>
      <p>
        Alle Preise verstehen sich in Euro inklusive der gesetzlichen
        Mehrwertsteuer. Versandkosten innerhalb Deutschlands:{' '}
        {formatEur(SHIPPING_COST_EUR)}; ab einem Bestellwert von{' '}
        {formatEur(FREE_SHIPPING_FROM_EUR)} versandkostenfrei.
      </p>
      <p>
        Zahlung erfolgt ausschließlich per Vorkasse (SEPA-Überweisung). Der
        Versand erfolgt nach Zahlungseingang. Bitte geben Sie die
        Bestellnummer als Verwendungszweck an.
      </p>

      <h2 className="text-lg font-bold text-slate-900">4. Lieferung</h2>
      <p>
        Lieferung innerhalb Deutschlands in der Regel innerhalb von 1–3
        Werktagen nach Zahlungseingang per DHL oder vergleichbarem
        Versanddienstleister. Liefertermine sind unverbindlich, soweit nicht
        ausdrücklich etwas anderes vereinbart wurde.
      </p>

      <h2 className="text-lg font-bold text-slate-900">5. Eigentumsvorbehalt</h2>
      <p>
        Die Ware bleibt bis zur vollständigen Zahlung unser Eigentum.
      </p>

      <h2 className="text-lg font-bold text-slate-900">6. Widerrufsrecht</h2>
      <p>
        Verbrauchern steht ein gesetzliches Widerrufsrecht zu. Einzelheiten
        entnehmen Sie der{' '}
        <a href="/widerruf" className="text-blue-600 font-semibold">
          Widerrufsbelehrung
        </a>
        .
      </p>

      <h2 className="text-lg font-bold text-slate-900">7. Gewährleistung</h2>
      <p>
        Es gelten die gesetzlichen Mängelhaftungsrechte. Bei gebrauchten Waren
        kann die Verjährungsfrist auf ein Jahr ab Ablieferung verkürzt sein,
        soweit gesetzlich zulässig.
      </p>

      <h2 className="text-lg font-bold text-slate-900">8. Haftung</h2>
      <p>
        Wir haften unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei
        Verletzung von Leben, Körper oder Gesundheit. Bei leichter
        Fahrlässigkeit haften wir nur bei Verletzung wesentlicher
        Vertragspflichten und begrenzt auf den vorhersehbaren, typischen
        Schaden.
      </p>

      <h2 className="text-lg font-bold text-slate-900">9. Schlussbestimmungen</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
        UN-Kaufrechts. Ist der Kunde Verbraucher, bleiben zwingende
        Verbraucherschutzvorschriften des Wohnsitzstaates unberührt.
      </p>
      <p className="text-xs text-slate-500 mt-6">
        Stand: {new Date().getFullYear()} · {COMPANY.brand}
      </p>
    </LegalLayout>
  )
}
