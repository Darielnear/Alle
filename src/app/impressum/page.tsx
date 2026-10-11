import LegalLayout from '@/components/LegalLayout'
import { COMPANY } from '@/lib/shop'

export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum">
      <p className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
        Angaben zum Unternehmen folgen. Bitte vor dem Live-Gang mit den echten Daten ersetzen.
      </p>
      <p>
        <strong>{COMPANY.legalName}</strong>
        <br />
        {COMPANY.street}
        <br />
        {COMPANY.zipCity}
        <br />
        {COMPANY.country}
      </p>
      <p>
        E-Mail: {COMPANY.email}
        <br />
        Telefon: {COMPANY.phone}
      </p>
      <p>
        Vertreten durch: {COMPANY.managingDirector}
        <br />
        {COMPANY.register}
        <br />
        USt-IdNr.: {COMPANY.vatId}
      </p>
    </LegalLayout>
  )
}
