import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
      <p className="text-xs font-bold uppercase tracking-widest text-blue-600">404</p>
      <h1 className="text-3xl font-black text-slate-900">Seite nicht gefunden</h1>
      <p className="text-sm text-slate-500">Die angeforderte Seite existiert nicht oder wurde verschoben.</p>
      <Link
        href="/"
        className="inline-block bg-slate-900 text-white font-bold text-xs px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors"
      >
        Zur Startseite
      </Link>
    </div>
  )
}
