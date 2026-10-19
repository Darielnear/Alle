import LegalLayout from '@/components/LegalLayout'
import { COMPANY } from '@/lib/shop'

export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum">
      {COMPANY.isPlaceholder && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Hinweis:</strong> Die folgenden Angaben sind Platzhalter und
          werden vor dem Live-Gang durch die echten Unternehmensdaten ersetzt.
        </div>
      )}

      <p className="text-xs text-slate-500 mb-4">Angaben gemäß § 5 TMG</p>

      <p>
        <strong>{COMPANY.legalName}</strong>
        <br />
        {COMPANY.street}
        <br />
        {COMPANY.zipCity}
        <br />
        {COMPANY.country}
      </p>

      <h2 className="text-lg font-bold text-slate-900 mt-6">Kontakt</h2>
      <p>
        E-Mail: {COMPANY.email}
        <br />
        Telefon: {COMPANY.phone}
      </p>

      <h2 className="text-lg font-bold text-slate-900 mt-6">Vertretung</h2>
      <p>
        Vertreten durch: {COMPANY.managingDirector}
        <br />
        {COMPANY.register}
      </p>

      <h2 className="text-lg font-bold text-slate-900 mt-6">Umsatzsteuer</h2>
      <p>Umsatzsteuer-Identifikationsnummer: {COMPANY.vatId}</p>

      <h2 className="text-lg font-bold text-slate-900 mt-6">
        Verantwortlich für den Inhalt
      </h2>
      <p className="text-sm text-slate-600">
        Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: {COMPANY.managingDirector},{' '}
        {COMPANY.street}, {COMPANY.zipCity}.
      </p>

      <h2 className="text-lg font-bold text-slate-900 mt-6">
        Streitbeilegung
      </h2>
      <p className="text-sm text-slate-600">
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:{' '}
        <a
          href="https://ec.europa.eu/consumers/odr/"
          className="text-blue-600 font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ec.europa.eu/consumers/odr/
        </a>
        . Wir sind nicht verpflichtet und nicht bereit, an
        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teilzunehmen.
      </p>
    </LegalLayout>
  )
}
