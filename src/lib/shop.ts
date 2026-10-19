export const SHIPPING_COST_EUR = 4.9
export const FREE_SHIPPING_FROM_EUR = 100
export const VAT_RATE = 0.19

/** URL publique du site (sans slash final) — à mettre à jour après domaine */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://sportall-two.vercel.app'

export const BANK = {
  holder: 'SPORTTECH.DE',
  bankName: 'TRDB Bank',
  iban: 'DE56 1001 2345 6853 0133 11',
  bic: 'TRBKDEBBXXX',
  isPlaceholder: false,
}

/**
 * Infos légales — REMPLIR avec les vraies données du client
 * Tant que isPlaceholder === true, un bandeau peut s’afficher sur l’Impressum.
 */
export const COMPANY = {
  brand: 'SPORTTECH.DE',
  legalName: '[Ihr Firmenname / Vor- und Nachname]',
  street: '[Straße und Hausnummer]',
  zipCity: '[PLZ Ort]',
  country: 'Deutschland',
  email: 'kontakt@sporttech.de', // demain: mail pro LWS
  phone: '[Telefonnummer]',
  vatId: '[USt-IdNr. z.B. DE123456789]',
  register: '[Handelsregister / Amtsgericht – oder leer bei Einzelunternehmen]',
  managingDirector: '[Vertretungsberechtigte Person]',
  isPlaceholder: true,
}

export const NAV_CATEGORIES = [
  { name: 'Fitness', slug: 'fitness' },
  { name: 'Recovery', slug: 'recovery' },
  { name: 'Running', slug: 'running' },
  { name: 'Wearables', slug: 'wearables' },
  { name: 'Textil', slug: 'textile' },
  { name: 'Zubehör', slug: 'zubehoer' },
] as const

export function getShippingCost(subtotal: number) {
  return subtotal >= FREE_SHIPPING_FROM_EUR ? 0 : SHIPPING_COST_EUR
}

export function getVatIncluded(gross: number) {
  return (gross * VAT_RATE) / (1 + VAT_RATE)
}

export function formatEur(value: number) {
  return `${value.toFixed(2).replace('.', ',')} €`
}

export function generateOrderNumber() {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, '')
    .slice(0, 12)
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `ST-${stamp}-${suffix}`
}
