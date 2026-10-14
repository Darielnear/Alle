import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

interface PageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ProduktePage({ searchParams }: PageProps) {
  const { category: selectedCategory } = await searchParams

  // 1. Récupération des catégories depuis Supabase
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug')
    .order('name')

  // 2. Requête produits avec filtre par catégorie active
  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

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

  const { data: products } = await query

  // 3. Récupérer le nombre total de produits pour le bouton "Alle"
  const { count: totalCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })

  // 4. Récupérer les compteurs par catégorie pour les badges des onglets
  const { data: countsData } = await supabase
    .from('products')
    .select('category_id')

  const categoryCounts = (countsData || []).reduce((acc: Record<string, number>, item) => {
    if (item.category_id) {
      acc[item.category_id] = (acc[item.category_id] || 0) + 1
    }
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* En-tête de page */}
      <div className="bg-white border-b border-slate-100 py-8 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1 mb-3"
          >
            ← Zurück zur Startseite
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {selectedCategory
              ? categories?.find((c) => c.slug === selectedCategory)?.name
              : 'Alle Produkte'}
          </h1>
          <p className="mt-2 text-sm text-slate-500 max-w-xl">
            Originale Markenware direkt ab Lager in Deutschland. Schneller Versand per DHL.
          </p>

          {/* Filtres par Catégories avec compteurs exacts */}
          <div className="mt-6 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <Link
              href="/produkte"
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
                  href={`/produkte?category=${cat.slug}`}
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

      {/* Grille des produits */}
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
              Wählen Sie eine andere Kategorie oder schauen Sie später wieder vorbei.
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