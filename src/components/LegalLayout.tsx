import type { ReactNode } from 'react'
import Link from 'next/link'

export default function LegalLayout({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1 mb-6"
        >
          ← Zurück zur Startseite
        </Link>
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm space-y-6">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
          <div className="prose prose-slate prose-sm max-w-none text-slate-600 space-y-4 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
