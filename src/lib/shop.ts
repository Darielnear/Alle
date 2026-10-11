export const SHIPPING_COST_EUR = 4.9
export const FREE_SHIPPING_FROM_EUR = 100
export const VAT_RATE = 0.19

export const BANK = {
  holder: '[Kontoinhaber – folgt]',
  bankName: '[Bank – folgt]',
  iban: 'DE00 0000 0000 0000 0000 00',
  bic: 'XXXXXXXXXXX',
  isPlaceholder: true,
}

export const COMPANY = {
  brand: 'SPORTTECH.DE',
  legalName: '[Firmenname – folgt]',
  street: '[Straße und Hausnummer – folgt]',
  zipCity: '[PLZ Ort – folgt]',
  country: 'Deutschland',
  email: 'kontakt@sporttech.de',
  phone: '[Telefon – folgt]',
  vatId: '[USt-IdNr. – folgt]',
  register: '[Handelsregister – folgt]',
  managingDirector: '[Geschäftsführer – folgt]',
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
