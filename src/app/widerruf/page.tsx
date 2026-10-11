import LegalLayout from '@/components/LegalLayout'
import { COMPANY } from '@/lib/shop'

export default function WiderrufPage() {
  return (
    <LegalLayout title="Widerrufsbelehrung">
      <h2 className="text-lg font-bold text-slate-900">Widerrufsrecht</h2>
      <p>
        Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die
        Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der
        Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
      </p>
      <p>
        Um Ihr Widerrufsrecht auszuüben, müssen Sie uns ({COMPANY.legalName}, {COMPANY.street}, {COMPANY.zipCity},
        E-Mail: {COMPANY.email}) mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder
        E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
      </p>
      <h2 className="text-lg font-bold text-slate-900">Folgen des Widerrufs</h2>
      <p>
        Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben,
        einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine
        andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich
        und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf
        dieses Vertrags bei uns eingegangen ist.
      </p>
      <p>
        Sie tragen die unmittelbaren Kosten der Rücksendung der Waren. Sie müssen für einen etwaigen Wertverlust der
        Waren nur aufkommen, wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und
        Funktionsweise der Waren nicht notwendigen Umgang mit ihnen zurückzuführen ist.
      </p>
    </LegalLayout>
  )
}
