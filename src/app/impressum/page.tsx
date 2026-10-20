import LegalLayout from '@/components/LegalLayout'
import { COMPANY } from '@/lib/shop'

export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum">
      {COMPANY.isPlaceholder && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Hinweis:</strong> Firmenname / USt-IdNr. ggf. noch zu
          vervollständigen. Anschrift und Telefonnummern sind hinterlegt.
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
        <br />
        Telefon: {COMPANY.phoneAlt}
        <br />
        Telefon: {COMPANY.phoneExtra}
      </p>

      <h2 className="text-lg font-bold text-slate-900 mt-6">Vertretung</h2>
      <p>
        Vertreten durch: {COMPANY.managingDirector}
        <br />
        {COMPANY.register}
      </p>

      <h2 className="text-lg font-bold text-slate-900 mt-6">Umsatzsteuer</h2>
      <p>USt-IdNr.: {COMPANY.vatId}</p>

      <h2 className="text-lg font-bold text-slate-900 mt-6">
        Verantwortlich für den Inhalt
      </h2>
      <p className="text-sm text-slate-600">
        Verantwortlich nach § 18 Abs. 2 MStV: {COMPANY.managingDirector},{' '}
        {COMPANY.street}, {COMPANY.zipCity}.
      </p>

      <h2 className="text-lg font-bold text-slate-900 mt-6">
        Streitbeilegung
      </h2>
      <p className="text-sm text-slate-600">
        Plattform der EU zur Online-Streitbeilegung:{' '}
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