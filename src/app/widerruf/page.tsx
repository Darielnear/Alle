import LegalLayout from '@/components/LegalLayout'
import { COMPANY } from '@/lib/shop'

export default function WiderrufPage() {
  return (
    <LegalLayout title="Widerrufsbelehrung">
      <h2 className="text-lg font-bold text-slate-900">Widerrufsrecht</h2>
      <p>
        Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
        diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage
        ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht
        der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
      </p>
      <p>
        Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (
        {COMPANY.legalName}, {COMPANY.street}, {COMPANY.zipCity}, E-Mail:{' '}
        {COMPANY.email}
        {COMPANY.phone ? `, Telefon: ${COMPANY.phone}` : ''}) mittels einer
        eindeutigen Erklärung (z.&nbsp;B. ein mit der Post versandter Brief oder
        E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen,
        informieren. Sie können dafür das unten stehende Muster-Widerrufsformular
        verwenden, das jedoch nicht vorgeschrieben ist.
      </p>
      <p>
        Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung
        über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist
        absenden.
      </p>

      <h2 className="text-lg font-bold text-slate-900">Folgen des Widerrufs</h2>
      <p>
        Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die
        wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit
        Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine
        andere Art der Lieferung als die von uns angebotene, günstigste
        Standardlieferung gewählt haben), unverzüglich und spätestens binnen
        vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über
        Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese
        Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der
        ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde
        ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen
        dieser Rückzahlung Entgelte berechnet.
      </p>
      <p>
        Wir können die Rückzahlung verweigern, bis wir die Waren wieder
        zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie
        die Waren zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt
        ist.
      </p>
      <p>
        Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen
        vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses
        Vertrags unterrichten, an uns zurückzusenden oder zu übergeben. Die
        Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von vierzehn
        Tagen absenden. Sie tragen die unmittelbaren Kosten der Rücksendung der
        Waren.
      </p>
      <p>
        Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn
        dieser Wertverlust auf einen zur Prüfung der Beschaffenheit,
        Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang mit
        ihnen zurückzuführen ist.
      </p>

      <h2 className="text-lg font-bold text-slate-900">
        Muster-Widerrufsformular
      </h2>
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 space-y-2">
        <p>
          An {COMPANY.legalName}, {COMPANY.street}, {COMPANY.zipCity}, E-Mail:{' '}
          {COMPANY.email}:
        </p>
        <p>
          Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen
          Vertrag über den Kauf der folgenden Waren (*)/die Erbringung der
          folgenden Dienstleistung (*)
        </p>
        <p>— Bestellt am (*)/erhalten am (*)</p>
        <p>— Name des/der Verbraucher(s)</p>
        <p>— Anschrift des/der Verbraucher(s)</p>
        <p>— Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)</p>
        <p>— Datum</p>
        <p className="text-xs text-slate-500">(*) Unzutreffendes streichen.</p>
      </div>
    </LegalLayout>
  )
}
