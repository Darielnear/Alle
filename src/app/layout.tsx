// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Toaster } from 'sonner' // Ajout de l'import sonner

export const metadata: Metadata = {
  title: 'SPORTTECH.DE | Bosch E-Bike Akkus, Garmin & Coros Sportuhren',
  description: 'Originale Bosch PowerPack 540 Akkus sowie GPS-Sportuhren von Garmin und Coros. Schneller Versand in Deutschland & sichere Zahlung per Banküberweisung.',
  keywords: ['Bosch PowerPack 540', 'Garmin Venu 3', 'Coros Pace Pro', 'E-Bike Akku Deutschland', 'GPS Sportuhr'],
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
        {/* Ajout du Toaster ici. Les notifications apparaîtront en bas à droite. */}
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  )
}