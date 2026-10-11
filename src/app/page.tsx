import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { ArrowRight, ShieldCheck, CheckCircle2, Truck, RefreshCw } from 'lucide-react'
import { formatEur, FREE_SHIPPING_FROM_EUR } from '@/lib/shop'
import ProductCard from '@/components/ProductCard'

export const revalidate = 0

export default async function Home() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(8) // Limité à 8 pour l'accueil

  return (
    <div className="space-y-20 pb-16">
      {/* SECTION HERO */}
      <section className="bg-white border-b border-slate-100 py-6 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200/80 px-3 py-1 rounded-full text-xs font-semibold text-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Deutscher Fachhändler für E-Bike & Outdoor</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Originale E-Bike Akkus & High-End Sportuhren.
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Spitzenleistung für Ihre Touren. Wir liefern originale Bosch PowerPack Akkus sowie präzise GPS-Sportuhren von Garmin & Coros direkt ab Lager in Deutschland.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link href="/produkte" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-sm text-sm inline-flex items-center justify-center gap-2 transition-all">
                  Sortiment Ansehen <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/zahlung-versand" className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3.5 rounded-xl text-sm inline-flex items-center justify-center transition-all border border-slate-200/60">
                  Informationen zu Vorkasse & Versand
                </Link>
              </div>
            </div>
            <div className="hidden lg:block lg:col-span-5 relative w-full h-[380px] rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 group">
                <Image src="/leger.jpg" alt="Cycliste outdoor" fill priority className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION PRODUITS - 8 MAX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-neutral-900">Bestseller</h2>
            <p className="text-neutral-500 text-sm">Unsere am häufigsten gewählten Produkte.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
        <div className="text-center">
            <Link href="/produkte" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-blue-700 transition-colors">
                Gesamtes Sortiment anzeigen
            </Link>
        </div>
      </section>

      {/* SECTION AVIS CLIENTS */}
      <section className="bg-slate-900 text-white py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-black text-center mb-16">Was unsere Kunden sagen</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { name: "Maximilian K.", text: "Top Beratung und sehr schnelle Lieferung der Bosch Akkus." },
                    { name: "Sarah M.", text: "Meine Coros Pace Pro kam perfekt verpackt an. Sehr zu empfehlen!" },
                    { name: "Lukas B.", text: "Unkomplizierte Abwicklung und sehr faire Preise." },
                    { name: "Julia H.", text: "Hervorragender Service, werde hier wieder kaufen." }
                ].map((review, i) => (
                    <div key={i} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 transition-all hover:-translate-y-2 hover:border-blue-500 duration-500 ease-out">
                        <div className="text-blue-400 mb-4 text-sm">★★★★★</div>
                        <p className="text-slate-300 text-sm italic mb-4">"{review.text}"</p>
                        <p className="font-bold text-white text-xs">— {review.name}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  )
}