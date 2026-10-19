import { NextResponse } from 'next/server'
import { getServerSupabase } from '@/lib/supabase-admin'

function isAuthorized(request: Request) {
  const secret = process.env.ADMIN_PASSWORD
  if (!secret) return false
  const header = request.headers.get('authorization') || ''
  const token = header.replace(/^Bearer\s+/i, '').trim()
  return token === secret
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getServerSupabase()
  const { data, error } = await supabase
    .from('orders')
    .select(
      'id, order_number, order_reference, customer_email, customer_first_name, customer_last_name, shipping_address, payment_status, fulfillment_status, total_amount, tracking_number, created_at, shipped_at'
    )
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ orders: data || [] })
}

export async function PATCH(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const id = body.id as string
  if (!id) {
    return NextResponse.json({ error: 'id required' }, { status: 400 })
  }

  const updates: Record<string, unknown> = {}
  if (typeof body.payment_status === 'string') {
    updates.payment_status = body.payment_status
  }
  if (typeof body.fulfillment_status === 'string') {
    updates.fulfillment_status = body.fulfillment_status
  }
  if (typeof body.tracking_number === 'string') {
    updates.tracking_number = body.tracking_number.trim() || null
  }
  if (body.fulfillment_status === 'shipped' && !body.shipped_at) {
    updates.shipped_at = new Date().toISOString()
  }
  if (body.payment_status === 'paid') {
    updates.paid_at = new Date().toISOString()
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'nothing to update' }, { status: 400 })
  }

  updates.updated_at = new Date().toISOString()

  const supabase = getServerSupabase()
  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ order: data })
}