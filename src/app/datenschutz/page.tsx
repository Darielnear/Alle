import LegalLayout from '@/components/LegalLayout'
import { COMPANY } from '@/lib/shop'

export default function DatenschutzPage() {
  return (
    <LegalLayout title="Datenschutzerklärung">
      <p>
        Verantwortlicher für die Datenverarbeitung auf dieser Website ist {COMPANY.legalName}, {COMPANY.street},{' '}
        {COMPANY.zipCity}, E-Mail: {COMPANY.email}.
      </p>
      <h2 className="text-lg font-bold text-slate-900">Welche Daten wir erheben</h2>
      <p>
        Bei einer Bestellung speichern wir Name, Lieferadresse, E-Mail-Adresse sowie die bestellten Artikel und den
        Rechnungsbetrag, um den Vertrag zu erfüllen (Art. 6 Abs. 1 lit. b DSGVO).
      </p>
      <h2 className="text-lg font-bold text-slate-900">Hosting & Shop-Technik</h2>
      <p>
        Die Website wird über einen Hosting-Anbieter bereitgestellt. Produktdaten und Bestellungen werden in einer
        Datenbank (Supabase) gespeichert. Der Warenkorb wird lokal in Ihrem Browser gespeichert.
      </p>
      <h2 className="text-lg font-bold text-slate-900">Speicherdauer</h2>
      <p>
        Bestelldaten werden gemäß handels- und steuerrechtlicher Aufbewahrungspflichten gespeichert und anschließend
        gelöscht, sofern keine gesetzlichen Pflichten entgegenstehen.
      </p>
      <h2 className="text-lg font-bold text-slate-900">Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit
        sowie Widerspruch. Beschwerden können Sie an eine Datenschutzaufsichtsbehörde richten.
      </p>
    </LegalLayout>
  )
}
