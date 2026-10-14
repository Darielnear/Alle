import Link from 'next/link'
import { Truck, ShieldCheck, RefreshCw, CreditCard } from 'lucide-react'
import { NAV_CATEGORIES } from '@/lib/shop'

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="border-b border-slate-800/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-blue-500 shrink-0" />
            <div>
              <p className="font-bold text-slate-200">Schneller Versand</p>
              <p className="text-[11px] text-slate-500">Mit DHL in Deutschland</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-blue-500 shrink-0" />
            <div>
              <p className="font-bold text-slate-200">Sichere Überweisung</p>
              <p className="text-[11px] text-slate-500">Vorkasse per SEPA</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RefreshCw className="w-6 h-6 text-blue-500 shrink-0" />
            <div>
              <p className="font-bold text-slate-200">14 Tage Widerruf</p>
              <p className="text-[11px] text-slate-500">Kostenlose Rückgabe</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-blue-500 shrink-0" />
            <div>
              <p className="font-bold text-slate-200">Keine Zusatzgebühren</p>
              <p className="text-[11px] text-slate-500">Transparente Preise</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-1">
            <span className="text-lg font-black tracking-tighter text-white">
              SPORT<span className="text-blue-500">TECH</span>
            </span>
            <span className="text-[9px] font-bold text-slate-500 border border-slate-700 px-1 rounded">.DE</span>
          </div>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            Ihr spezialisierter Online-Shop für Sporttechnik, Wearables und originales Zubehör in Deutschland.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-4">Kategorien</h4>
          <ul className="space-y-2.5">
            {NAV_CATEGORIES.slice(0, 4).map((cat) => (
              <li key={cat.slug}>
                <Link href={`/produkte?category=${cat.slug}`} className="hover:text-blue-400 transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/produkte" className="hover:text-blue-400 transition-colors">
                Alle Produkte
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-4">Kundenservice</h4>
          <ul className="space-y-2.5">
            <li><Link href="/kontakt" className="hover:text-blue-400 transition-colors">Kontakt & Hilfe</Link></li>
            <li><Link href="/zahlung-versand" className="hover:text-blue-400 transition-colors">Zahlung & Versand</Link></li>
            <li><Link href="/faq" className="hover:text-blue-400 transition-colors">Häufige Fragen (FAQ)</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-4">Rechtliches (Deutschland)</h4>
          <ul className="space-y-2.5">
            <li><Link href="/impressum" className="hover:text-blue-400 transition-colors">Impressum</Link></li>
            <li><Link href="/datenschutz" className="hover:text-blue-400 transition-colors">Datenschutzerklärung</Link></li>
            <li><Link href="/agb" className="hover:text-blue-400 transition-colors">AGB</Link></li>
            <li><Link href="/widerruf" className="hover:text-blue-400 transition-colors">Widerrufsbelehrung</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-900 py-6 text-center text-slate-600 text-[11px] space-y-4">
        <div className="flex justify-center gap-6 opacity-70">
            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-blue-500"/> Sicherer Einkauf</span>
            <span className="flex items-center gap-1"><CreditCard className="w-4 h-4 text-blue-500"/> SEPA Vorkasse</span>
            <span className="flex items-center gap-1"><Truck className="w-4 h-4 text-blue-500"/> DHL Versand</span>
        </div>
        <p>© 2026 SPORTTECH.DE. Alle Rechte vorbehalten. Alle Preise inkl. MwSt. zzgl. Versandkosten.</p>
      </div>
    </footer>
  )
}
