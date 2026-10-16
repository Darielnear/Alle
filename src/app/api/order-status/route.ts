import { NextResponse } from 'next/server'
import { getServerSupabase } from '@/lib/supabase-admin'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const orderRef = String(body.orderNumber || body.orderReference || '')
      .trim()
      .toUpperCase()
    const email = String(body.email || '')
      .trim()
      .toLowerCase()

    if (!orderRef || !email) {
      return NextResponse.json(
        { error: 'Bitte Bestellnummer und E-Mail angeben.' },
        { status: 400 }
      )
    }

    const supabase = getServerSupabase()

    const { data: order, error } = await supabase
      .from('orders')
      .select(
        'id, order_number, order_reference, customer_email, payment_status, fulfillment_status, total_amount, tracking_number, created_at, shipped_at'
      )
      .or(`order_number.eq.${orderRef},order_reference.eq.${orderRef}`)
      .ilike('customer_email', email)
      .maybeSingle()

    if (error || !order) {
      return NextResponse.json(
        { error: 'Keine Bestellung gefunden. Prüfen Sie Nummer und E-Mail.' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      orderNumber: order.order_number || order.order_reference,
      paymentStatus: order.payment_status,
      fulfillmentStatus: order.fulfillment_status || 'new',
      total: order.total_amount,
      trackingNumber: order.tracking_number,
      createdAt: order.created_at,
      shippedAt: order.shipped_at,
    })
  } catch {
    return NextResponse.json(
      { error: 'Unerwarteter Fehler.' },
      { status: 500 }
    )
  }
}