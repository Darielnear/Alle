import { NextResponse } from 'next/server'
import { getServerSupabase } from '@/lib/supabase-admin'
import { generateOrderNumber, getShippingCost } from '@/lib/shop'
import {
  sendAdminOrderNotification,
  sendOrderConfirmationEmail,
} from '@/lib/mail'

interface IncomingItem {
  id: string
  title?: string
  quantity: number
  price_eur: number
}

interface IncomingBody {
  name?: string
  street?: string
  zipCity?: string
  email?: string
  items?: IncomingItem[]
}

function parseName(fullName: string) {
  const trimmed = fullName.trim()
  const space = trimmed.indexOf(' ')
  if (space === -1) {
    return { first: trimmed, last: '-' }
  }
  return {
    first: trimmed.slice(0, space).trim(),
    last: trimmed.slice(space + 1).trim() || '-',
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as IncomingBody
    const name = body.name?.trim() || ''
    const street = body.street?.trim() || ''
    const zipCity = body.zipCity?.trim() || ''
    const email = body.email?.trim() || ''
    const items = Array.isArray(body.items) ? body.items : []

    if (!name || !street || !zipCity || !email || items.length === 0) {
      return NextResponse.json(
        {
          error:
            'Bitte füllen Sie alle Felder aus und legen Sie Artikel in den Warenkorb.',
        },
        { status: 400 }
      )
    }

    const subtotal = items.reduce((sum, item) => {
      const qty = Number(item.quantity) || 0
      const price = Number(item.price_eur) || 0
      return sum + qty * price
    }, 0)

    if (subtotal <= 0) {
      return NextResponse.json(
        { error: 'Ungültiger Bestellbetrag.' },
        { status: 400 }
      )
    }

    const shipping = getShippingCost(subtotal)
    const total = subtotal + shipping
    const { first, last } = parseName(name)
    const orderNumber = generateOrderNumber()
    const supabase = getServerSupabase()

    const fullPayload = {
      order_number: orderNumber,
      order_reference: orderNumber,
      customer_email: email,
      customer_first_name: first,
      customer_last_name: last,
      shipping_address: `${street}, ${zipCity}`,
      payment_method: 'vorkasse',
      payment_status: 'awaiting_payment',
      total_amount: total,
      subtotal_amount: subtotal,
      shipping_cost: shipping,
    }

    const basePayload = {
      order_reference: orderNumber,
      customer_email: email,
      customer_first_name: first,
      customer_last_name: last,
      shipping_address: `${street}, ${zipCity}`,
      payment_method: 'vorkasse',
      payment_status: 'awaiting_payment',
      total_amount: total,
    }

    let orderId: string | undefined
    const firstTry = await supabase
      .from('orders')
      .insert(fullPayload)
      .select('id')
      .single()

    if (firstTry.error) {
      const fallback = await supabase
        .from('orders')
        .insert(basePayload)
        .select('id')
        .single()
      if (fallback.error || !fallback.data) {
        console.error('Order insert failed', firstTry.error, fallback.error)
        return NextResponse.json(
          {
            error:
              'Bestellung konnte nicht gespeichert werden. Bitte später erneut versuchen.',
          },
          { status: 500 }
        )
      }
      orderId = fallback.data.id
    } else {
      orderId = firstTry.data?.id
    }

    if (orderId) {
      const lineItems = items.map((item) => ({
        order_id: orderId,
        product_id: item.id,
        quantity: Number(item.quantity) || 1,
        unit_price: Number(item.price_eur) || 0,
      }))
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(lineItems)
      if (itemsError) {
        console.error('Order items insert failed', itemsError)
      }
    }

    const mailItems = items.map((i) => ({
      title: i.title || 'Produkt',
      quantity: Number(i.quantity) || 1,
      price_eur: Number(i.price_eur) || 0,
    }))
    const mailPayload = {
      to: email,
      customerName: `${first} ${last}`.trim(),
      orderNumber,
      total,
      subtotal,
      shipping,
      items: mailItems,
    }
    try {
      await sendOrderConfirmationEmail(mailPayload)
      await sendAdminOrderNotification(mailPayload)
    } catch (mailErr) {
      console.error('Mail send failed', mailErr)
    }

    return NextResponse.json({
      orderNumber,
      orderId,
      subtotal,
      shipping,
      total,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Unerwarteter Fehler bei der Bestellung.' },
      { status: 500 }
    )
  }
}