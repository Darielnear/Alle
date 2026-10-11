import LegalLayout from '@/components/LegalLayout'
import { COMPANY } from '@/lib/shop'

export default function KontaktPage() {
  return (
    <LegalLayout title="Kontakt & Hilfe">
      <p>
        Fragen zu Bestellung, Versand oder Produkten? Schreiben Sie uns – wir antworten in der Regel innerhalb eines
        Werktags.
      </p>
      <p>
        E-Mail:{' '}
        <a className="text-blue-600 font-semibold" href={`mailto:${COMPANY.email}`}>
          {COMPANY.email}
        </a>
        <br />
        Telefon: {COMPANY.phone}
        <br />
        {COMPANY.street}, {COMPANY.zipCity}
      </p>
      <p className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
        Kontaktdaten sind Platzhalter und werden durch die echten Impressumsangaben ersetzt.
      </p>
    </LegalLayout>
  )
}
