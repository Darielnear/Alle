import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import AddToCartButton from '@/components/AddToCartButton'
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck, RefreshCw } from 'lucide-react'

export const revalidate = 0

interface PageProps {
  params: Promise<{ slug: string }>
}

import type { Metadata } from 'next'

// ... (existing imports)

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { data: product } = await supabase.from('products').select('title, subtitle').eq('slug', slug).single()
  return {
    title: product ? `${product.title} | SPORTTECH.DE` : 'Produkt nicht gefunden',
    description: product?.subtitle || 'Entdecken Sie dieses hochwertige Produkt.'
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params

  // Récupération du produit via son slug dans Supabase
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!product) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Bouton Retour */}
      <Link
        href="/produkte"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Zurück zur Übersicht
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* IMAGE DU PRODUIT */}
        <div className="lg:col-span-6 bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 flex items-center justify-center overflow-hidden">
          <div className="relative aspect-square w-full max-w-[450px] overflow-hidden rounded-2xl group cursor-crosshair">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.title}
                className="object-contain h-full w-full transition-transform duration-700 ease-out group-hover:scale-125"
              />
            ) : (
              <div className="bg-neutral-50 rounded-2xl w-full h-full flex items-center justify-center text-neutral-400 text-sm font-semibold">
                {product.subtitle}
              </div>
            )}
          </div>
        </div>

        {/* DETAILS DU PRODUIT */}
        <div className="lg:col-span-6 space-y-6">
          
          <div>
            <div className="inline-flex items-center gap-1.5 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
              <span>{product.subtitle || 'Originalware'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
              {product.title}
            </h1>
          </div>

          {/* PRIX & DISPONIBILITÉ */}
          <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-neutral-900 font-mono">
                {Number(product.price_eur).toFixed(2)} €
              </span>
              {product.old_price_eur && (
                <span className="text-lg text-neutral-400 line-through font-mono">
                  {Number(product.old_price_eur).toFixed(2)} €
                </span>
              )}
            </div>
          </div>

          {/* DESCRIPTION & SPECIFICATIONS */}
          <div className="space-y-6 pt-4 border-t border-neutral-100">
            {product.description && (
              <div>
                <h3 className="font-bold text-neutral-900 mb-2">Beschreibung</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{product.description}</p>
              </div>
            )}
            
            {product.specifications && (
              <div>
                <h3 className="font-bold text-neutral-900 mb-2">Technische Daten</h3>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="bg-neutral-50 p-3 rounded-lg">
                      <dt className="text-neutral-500 text-[10px] uppercase font-bold">{key.replace('_', ' ')}</dt>
                      <dd className="font-medium text-neutral-900">{typeof value === 'string' ? value : JSON.stringify(value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          {/* BOUTON D'ACHAT */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-neutral-200 z-40">
            <AddToCartButton
              product={{
                id: product.id,
                title: product.title,
                subtitle: product.subtitle,
                price_eur: Number(product.price_eur),
                image_url: product.image_url,
                slug: product.slug,
              }}
            />
          </div>
          <div className="hidden lg:block">
            <AddToCartButton
              product={{
                id: product.id,
                title: product.title,
                subtitle: product.subtitle,
                price_eur: Number(product.price_eur),
                image_url: product.image_url,
                slug: product.slug,
              }}
            />
          </div>

          {/* ARGUMENTS DE REASSURANCE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <Truck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Schneller DHL Versand</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <RefreshCw className="w-4 h-4 text-blue-600 shrink-0" />
              <span>14 Tage Rückgaberecht</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>100% Neuware im Karton</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Herstellergarantie</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}