export const SHIPPING_COST_EUR = 0
export const FREE_SHIPPING_FROM_EUR = 0
export const VAT_RATE = 0.19

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://sportall-two.vercel.app'

export const BANK = {
  holder: 'SPORTTECH.DE',
  bankName: 'TRDB Bank',
  iban: 'DE56 1001 2345 6853 0133 11',
  bic: 'TRBKDEBBXXX',
  isPlaceholder: false,
}

export const COMPANY = {
  brand: 'SPORTTECH.DE',
  legalName: 'Oksana Mankowska',
  street: 'Borsigallee 26',
  zipCity: '60388 Frankfurt am Main',
  country: 'Deutschland',
  email: 'kontakt@sporttech.de',
  phone: '+49 1590 6116121',
  phoneAlt: '+351 924 965 635',
  phoneExtra: '+49 6109 5017210',
  vatId: '[USt-IdNr.]',
  register: '',
  managingDirector: 'Oksana Mankowska',
  isPlaceholder: true,
}

export const SHIP_COUNTRIES = [
  { code: 'DE', label: 'Deutschland' },
  { code: 'AT', label: 'Österreich' },
  { code: 'CH', label: 'Schweiz' },
  { code: 'LI', label: 'Liechtenstein' },
  { code: 'LU', label: 'Luxemburg' },
] as const

export const NAV_CATEGORIES = [
  { name: 'Fitness', slug: 'fitness' },
  { name: 'Recovery', slug: 'recovery' },
  { name: 'Running', slug: 'running' },
  { name: 'Wearables', slug: 'wearables' },
  { name: 'Textil', slug: 'textile' },
  { name: 'Zubehör', slug: 'zubehoer' },
] as const

export function getShippingCost(_subtotal: number) {
  return SHIPPING_COST_EUR
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