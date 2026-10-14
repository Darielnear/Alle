import LegalLayout from '@/components/LegalLayout'
import { COMPANY } from '@/lib/shop'

export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum">
      {/* Impressum gemäß § 5 TMG */}
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
      <p className="mt-8 text-xs text-neutral-500">
        Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: {COMPANY.managingDirector}.
      </p>
    </LegalLayout>
  )
}
