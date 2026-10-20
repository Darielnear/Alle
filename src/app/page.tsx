import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RefreshCw,
  CreditCard,
  Package,
  Dumbbell,
  HeartPulse,
  Watch,
  Shirt,
  Footprints,
  CheckCircle2,
} from 'lucide-react'
import ProductCard from '@/components/ProductCard'

export const revalidate = 0

const CATEGORIES = [
  {
    name: 'Fitness',
    slug: 'fitness',
    desc: 'Hanteln, Bänder & Equipment',
    icon: Dumbbell,
  },
  {
    name: 'Recovery',
    slug: 'recovery',
    desc: 'Massage, Faszien & Regeneration',
    icon: HeartPulse,
  },
  {
    name: 'Running',
    slug: 'running',
    desc: 'Für Training & Wettkampf',
    icon: Footprints,
  },
  {
    name: 'Wearables',
    slug: 'wearables',
    desc: 'GPS-Uhren & Tracker',
    icon: Watch,
  },
  {
    name: 'Textil',
    slug: 'textile',
    desc: 'Lauf- & Trainingsbekleidung',
    icon: Shirt,
  },
  {
    name: 'Zubehör',
    slug: 'zubehoer',
    desc: 'Flaschen, Gurte & mehr',
    icon: Package,
  },
]

export default async function Home() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(8)

  return (
    <div className="pb-16">
      {/* HERO */}
      <section className="bg-white border-b border-slate-100 py-8 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-xs font-semibold text-blue-800 anim-fade-up">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Onlineshop · Versand aus Deutschland</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.12] anim-fade-up anim-delay-1">
                Fitness, Running & Recovery.
                <span className="block text-blue-600 mt-1">
                  Markenprodukte. Klar. Schnell.
                </span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl anim-fade-up anim-delay-2">
                Massagepistolen, GPS-Uhren, Laufbekleidung und Trainingsequipment –
                originale Markenware, kostenloser Versand und Zahlung per Vorkasse.
              </p>

              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-700 font-medium anim-fade-up anim-delay-3">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Originalware
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Kostenloser Versand
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  14 Tage Rückgaberecht
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 anim-fade-up anim-delay-4">
                <Link
                  href="/produkte"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-sm text-sm inline-flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Sortiment ansehen <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/zahlung-versand"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3.5 rounded-xl text-sm inline-flex items-center justify-center transition-all border border-slate-200/60 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Vorkasse & Versand
                </Link>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-5 relative w-full h-[400px] rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 group anim-fade-in anim-delay-2">
              <Image
                src="/leger.jpg"
                alt="Sport und Outdoor"
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BANDEAU CONFIANCE */}
      <section className="bg-slate-50 border-b border-slate-100 anim-fade-up anim-delay-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-700">
              <Truck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                <strong>Kostenloser Versand</strong>
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <CreditCard className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                Zahlung per <strong>Vorkasse</strong>
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <RefreshCw className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                <strong>14 Tage</strong> Rückgaberecht
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                DE · AT · CH · LI · LU
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CATÉGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="flex items-end justify-between gap-4 mb-8 anim-fade-up">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Kategorien
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Finde schnell das Richtige für dein Training.
            </p>
          </div>
          <Link
            href="/produkte"
            className="hidden sm:inline-flex text-sm font-bold text-blue-600 hover:text-blue-700 items-center gap-1 transition-colors"
          >
            Alle Produkte <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon
            const delayClass = `anim-delay-${Math.min(i + 1, 6)}`
            return (
              <Link
                key={cat.slug}
                href={`/produkte?category=${cat.slug}`}
                className={`group rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 hover:border-blue-300 hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 anim-fade-up ${delayClass}`}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="font-bold text-slate-900 text-sm">{cat.name}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  {cat.desc}
                </p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* BESTSELLER */}
      <section className="bg-slate-50/80 border-y border-slate-100 py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2 anim-fade-up">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Neu & beliebt
            </h2>
            <p className="text-sm text-slate-500">
              Frisch im Sortiment – Markenqualität zum fairen Preis.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 anim-fade-up anim-delay-2">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
          <div className="text-center anim-fade-up anim-delay-3">
            <Link
              href="/produkte"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-black hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            >
              Gesamtes Sortiment <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WARUM WIR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="text-center mb-10 anim-fade-up">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Warum SPORTTECH.DE?
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Klar, transparent – für Kunden in DE, AT, CH, LI und LU.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: 'Originale Markenware',
              text: 'Wir führen bekannte Marken aus Fitness, Running und Recovery – keine No-Name-Ware.',
              delay: 'anim-delay-1',
            },
            {
              icon: Truck,
              title: 'Kostenloser Versand',
              text: 'Kostenloser Versand per DHL nach Deutschland, Österreich, Schweiz, Liechtenstein und Luxemburg. In DE meist in 1–3 Werktagen.',
              delay: 'anim-delay-2',
            },
            {
              icon: CreditCard,
              title: 'Sichere Vorkasse',
              text: 'Du überweist mit Bestellnummer als Verwendungszweck. Nach Zahlungseingang geht’s raus.',
              delay: 'anim-delay-3',
            },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className={`rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 hover:-translate-y-1.5 hover:shadow-md hover:border-blue-200 transition-all duration-300 anim-fade-up ${item.delay}`}
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* AVIS */}
      <section className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-12 anim-fade-up">
            Was Kunden schätzen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              {
                name: 'Maximilian K.',
                text: 'Schnelle Lieferung und top Qualität bei der Massagepistole. Gerne wieder.',
                delay: 'anim-delay-1',
              },
              {
                name: 'Sarah M.',
                text: 'Meine Garmin kam perfekt verpackt an. Unkomplizierte Abwicklung.',
                delay: 'anim-delay-2',
              },
              {
                name: 'Lukas B.',
                text: 'Gute Preise, klare Kommunikation bei Vorkasse. Alles wie beschrieben.',
                delay: 'anim-delay-3',
              },
              {
                name: 'Julia H.',
                text: 'Laufbekleidung passt, Versand war schnell. Sehr empfehlenswert.',
                delay: 'anim-delay-4',
              },
            ].map((review) => (
              <div
                key={review.name}
                className={`bg-slate-800 p-6 rounded-2xl border border-slate-700 transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500 anim-fade-up ${review.delay}`}
              >
                <div className="text-blue-400 mb-3 text-sm tracking-wide">
                  ★★★★★
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="font-bold text-white text-xs">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}