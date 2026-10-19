import LegalLayout from '@/components/LegalLayout'
import { COMPANY } from '@/lib/shop'

export default function DatenschutzPage() {
  return (
    <LegalLayout title="Datenschutzerklärung">
      <p>
        Verantwortlicher für die Datenverarbeitung auf dieser Website ist{' '}
        {COMPANY.legalName}, {COMPANY.street}, {COMPANY.zipCity}, E-Mail:{' '}
        {COMPANY.email}, Telefon: {COMPANY.phone}.
      </p>

      <h2 className="text-lg font-bold text-slate-900">1. Allgemeine Hinweise</h2>
      <p>
        Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Wir
        verarbeiten Daten nur, soweit dies für den Betrieb des Shops, die
        Vertragsabwicklung und gesetzliche Pflichten erforderlich ist (Art. 6
        Abs. 1 lit. b und lit. c DSGVO) bzw. auf Grundlage berechtigter
        Interessen (Art. 6 Abs. 1 lit. f DSGVO).
      </p>

      <h2 className="text-lg font-bold text-slate-900">
        2. Welche Daten wir erheben
      </h2>
      <p>
        Bei einer Bestellung speichern wir insbesondere: Name, Lieferadresse,
        E-Mail-Adresse, Bestellpositionen, Zahlungsstatus sowie – nach Versand –
        ggf. eine Sendungsverfolgungsnummer. Server-Logs (IP-Adresse, Zeitpunkt,
        User-Agent) können technisch anfallen.
      </p>

      <h2 className="text-lg font-bold text-slate-900">3. Zweck der Verarbeitung</h2>
      <p>
        Daten dienen der Bestellabwicklung, Kommunikation, Versand, Buchhaltung
        und – soweit erforderlich – der Geltendmachung von Rechtsansprüchen.
      </p>

      <h2 className="text-lg font-bold text-slate-900">4. Speicherdauer</h2>
      <p>
        Bestelldaten werden gemäß handels- und steuerrechtlichen Vorgaben
        (i.&nbsp;d.&nbsp;R. 6–10 Jahre) aufbewahrt. Log-Daten werden
        regelmäßig gelöscht, soweit nicht gesetzliche Aufbewahrungspflichten
        entgegenstehen.
      </p>

      <h2 className="text-lg font-bold text-slate-900">5. Empfänger / Auftragsverarbeiter</h2>
      <p>
        Zur Bereitstellung des Shops und der Datenbank können technische
        Dienstleister (z.&nbsp;B. Hosting, Datenbank) eingesetzt werden. Der
        Versand erfolgt über Paketdienstleister (z.&nbsp;B. DHL). Eine
        Übermittlung an Dritte zu Werbezwecken findet nicht statt.
      </p>

      <h2 className="text-lg font-bold text-slate-900">6. Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
        Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch
        gegen die Verarbeitung, soweit gesetzlich vorgesehen. Beschwerden können
        Sie bei einer Datenschutzaufsichtsbehörde einreichen.
      </p>

      <h2 className="text-lg font-bold text-slate-900">7. Cookies / Tracking</h2>
      <p>
        Der Shop setzt technisch notwendige Cookies bzw. lokale Speicherung
        (z.&nbsp;B. Warenkorb) ein. Es werden keine Werbe- oder
        Analyse-Cookies von Drittanbietern ohne Ihre Einwilligung eingesetzt,
        soweit nicht gesondert ausgewiesen.
      </p>

      <h2 className="text-lg font-bold text-slate-900">8. Kontakt</h2>
      <p>
        Bei Fragen zum Datenschutz: {COMPANY.email}
      </p>
    </LegalLayout>
  )
}
