export const SHIPPING_COST_EUR = 4.9
export const FREE_SHIPPING_FROM_EUR = 100
export const VAT_RATE = 0.19

export const BANK = {
  holder: '[Name des Kontoinhabers]',
  bankName: '[Name Ihrer Bank]',
  iban: '[Ihre IBAN einfügen]',
  bic: '[Ihr BIC einfügen]',
  isPlaceholder: true,
}

export const COMPANY = {
  brand: 'SPORTTECH.DE',
  legalName: '[Ihr Firmenname]',
  street: '[Straße und Hausnummer]',
  zipCity: '[PLZ und Ort]',
  country: 'Deutschland',
  email: 'kontakt@sporttech.de',
  phone: '[Ihre Telefonnummer]',
  vatId: '[USt-IdNr. des Unternehmens]',
  register: '[Handelsregister-Eintrag]',
  managingDirector: '[Name des Geschäftsführers]',
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
