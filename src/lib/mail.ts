import nodemailer from 'nodemailer'
import { BANK, COMPANY, SITE_URL, formatEur } from '@/lib/shop'

type OrderMailItem = {
  title: string
  quantity: number
  price_eur: number
}

type OrderMailPayload = {
  to: string
  customerName: string
  orderNumber: string
  total: number
  subtotal: number
  shipping: number
  items: OrderMailItem[]
}

function smtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_FROM
  )
}

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

/** Confirmation commande client (Vorkasse) */
export async function sendOrderConfirmationEmail(payload: OrderMailPayload) {
  if (!smtpConfigured()) {
    console.warn('[mail] SMTP non configuré — email non envoyé')
    return { sent: false, reason: 'smtp_not_configured' as const }
  }

  const lines = payload.items
    .map(
      (i) =>
        `• ${i.title} × ${i.quantity} — ${formatEur(i.quantity * i.price_eur)}`
    )
    .join('\n')

  const text = `Hallo ${payload.customerName},

vielen Dank für Ihre Bestellung bei ${COMPANY.brand}.

Bestellnummer: ${payload.orderNumber}
(Bitte als Verwendungszweck bei der Überweisung angeben)

Artikel:
${lines}

Zwischensumme: ${formatEur(payload.subtotal)}
Versand: ${formatEur(payload.shipping)}
Gesamt: ${formatEur(payload.total)}

Zahlungsinformationen (SEPA-Vorkasse):
Kontoinhaber: ${BANK.holder}
IBAN: ${BANK.iban}
BIC: ${BANK.bic}
Verwendungszweck: ${payload.orderNumber}

Nach Zahlungseingang versenden wir Ihre Bestellung in der Regel innerhalb von 1–3 Werktagen.

Bestellstatus prüfen:
${SITE_URL}/bestellung-verfolgen

Bei Fragen: ${COMPANY.email}

Mit freundlichen Grüßen
${COMPANY.brand}
`

  const html = `
  <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
    <h1 style="font-size:20px">Vielen Dank für Ihre Bestellung</h1>
    <p>Hallo ${escapeHtml(payload.customerName)},</p>
    <p>Ihre Bestellnummer: <strong style="color:#2563eb">${escapeHtml(payload.orderNumber)}</strong></p>
    <p style="font-size:13px;color:#64748b">Bitte diesen Code als <strong>Verwendungszweck</strong> bei der Überweisung angeben.</p>
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0" />
    <pre style="font-family:inherit;white-space:pre-wrap;font-size:14px">${escapeHtml(lines)}</pre>
    <p><strong>Gesamt: ${formatEur(payload.total)}</strong> (inkl. MwSt.)</p>
    <div style="background:#0f172a;color:#fff;padding:16px;border-radius:12px;margin:20px 0;font-size:14px">
      <div>Kontoinhaber: ${escapeHtml(BANK.holder)}</div>
      <div>IBAN: ${escapeHtml(BANK.iban)}</div>
      <div>BIC: ${escapeHtml(BANK.bic)}</div>
      <div>Verwendungszweck: <strong>${escapeHtml(payload.orderNumber)}</strong></div>
    </div>
    <p style="font-size:13px">
      Status prüfen: <a href="${SITE_URL}/bestellung-verfolgen">${SITE_URL}/bestellung-verfolgen</a><br/>
      Kontakt: ${escapeHtml(COMPANY.email)}
    </p>
    <p style="font-size:13px;color:#64748b">Mit freundlichen Grüßen<br/>${escapeHtml(COMPANY.brand)}</p>
  </div>`

  const transporter = createTransport()
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: payload.to,
    subject: `Bestellbestätigung ${payload.orderNumber} – ${COMPANY.brand}`,
    text,
    html,
  })

  return { sent: true as const }
}

/** Notification interne (optionnel) */
export async function sendAdminOrderNotification(payload: OrderMailPayload) {
  const adminTo = process.env.SMTP_ADMIN_TO || process.env.SMTP_USER
  if (!smtpConfigured() || !adminTo) return { sent: false }

  const transporter = createTransport()
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: adminTo,
    subject: `[NEU] Bestellung ${payload.orderNumber} – ${formatEur(payload.total)}`,
    text: `Neue Bestellung ${payload.orderNumber}\nKunde: ${payload.customerName} <${payload.to}>\nSumme: ${formatEur(payload.total)}\n\nAdmin: ${SITE_URL}/admin`,
  })
  return { sent: true }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
