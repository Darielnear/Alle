import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

interface PageProps {
  searchParams: Promise<{ category?: string; sort?: string }>
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'Neueste' },
  { value: 'price_asc', label: 'Preis aufsteigend' },
  { value: 'price_desc', label: 'Preis absteigend' },
  { value: 'name', label: 'Name A–Z' },
] as const

export default async function ProduktePage({ searchParams }: PageProps) {
  const { category: selectedCategory, sort: selectedSort = 'newest' } =
    await searchParams

  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug')
    .order('name')

  let query = supabase.from('products').select('*')

  if (selectedCategory) {
    const { data: categoryData } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', selectedCategory)
      .single()

    if (categoryData) {
      query = query.eq('category_id', categoryData.id)
    }
  }

  switch (selectedSort) {
    case 'price_asc':
      query = query.order('price_eur', { ascending: true })
      break
    case 'price_desc':
      query = query.order('price_eur', { ascending: false })
      break
    case 'name':
      query = query.order('title', { ascending: true })
      break
    default:
      query = query.order('created_at', { ascending: false })
  }

  const { data: products } = await query

  const { count: totalCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })

  const { data: countsData } = await supabase
    .from('products')
    .select('category_id')

  const categoryCounts = (countsData || []).reduce(
    (acc: Record<string, number>, item) => {
      if (item.category_id) {
        acc[item.category_id] = (acc[item.category_id] || 0) + 1
      }
      return acc
    },
    {}
  )

  const buildHref = (cat?: string, sort?: string) => {
    const params = new URLSearchParams()
    if (cat) params.set('category', cat)
    if (sort && sort !== 'newest') params.set('sort', sort)
    const q = params.toString()
    return q ? `/produkte?${q}` : '/produkte'
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="bg-white border-b border-slate-100 py-8 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1 mb-3"
          >
            ← Zurück zur Startseite
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                {selectedCategory
                  ? categories?.find((c) => c.slug === selectedCategory)?.name
                  : 'Alle Produkte'}
              </h1>
              <p className="mt-2 text-sm text-slate-500 max-w-xl">
                Originale Markenware direkt ab Lager in Deutschland. Schneller
                Versand per DHL.
              </p>
            </div>

            {/* TRI */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Sortieren
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SORT_OPTIONS.map((opt) => {
                  const active = selectedSort === opt.value
                  return (
                    <Link
                      key={opt.value}
                      href={buildHref(selectedCategory, opt.value)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                        active
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {opt.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          {/* CATÉGORIES */}
          <div className="mt-6 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <Link
              href={buildHref(undefined, selectedSort)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                !selectedCategory
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Alle ({totalCount || 0})
            </Link>

            {categories?.map((cat) => {
              const isActive = selectedCategory === cat.slug
              const count = categoryCounts[cat.id] || 0
              return (
                <Link
                  key={cat.id}
                  href={buildHref(cat.slug, selectedSort)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.name} ({count})
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-12 text-center border border-slate-100 shadow-sm mt-4">
            <h3 className="text-base font-semibold text-slate-900">
              Keine Produkte in dieser Kategorie gefunden
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Wählen Sie eine andere Kategorie oder schauen Sie später wieder
              vorbei.
            </p>
            <Link
              href="/produkte"
              className="mt-6 inline-block rounded-full bg-slate-900 px-6 py-2.5 text-xs font-semibold text-white hover:bg-black transition-colors"
            >
              Alle Produkte anzeigen
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}