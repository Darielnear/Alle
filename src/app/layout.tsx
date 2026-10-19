import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'SPORTTECH.DE | Fitness, Running & Recovery – Markenprodukte',
  description:
    'Fitness-, Running- und Recovery-Produkte: Massagepistolen, GPS-Uhren, Laufbekleidung und Trainingsequipment. Originale Markenware, schneller Versand in Deutschland, Zahlung per Vorkasse.',
  keywords: [
    'Fitness Shop Deutschland',
    'Running Ausrüstung',
    'Recovery Massagepistole',
    'GPS Sportuhr',
    'Laufbekleidung',
    'SPORTTECH.DE',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="bg-white text-slate-900 flex flex-col min-h-screen antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  )
}