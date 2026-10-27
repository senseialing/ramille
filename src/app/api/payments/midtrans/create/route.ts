import { NextResponse } from 'next/server';
import { midtransSnap } from '@/lib/midtrans/config';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, grossAmount, customerDetails, itemDetails } = body;

    if (!orderId || !grossAmount) {
      return NextResponse.json(
        { error: 'orderId dan grossAmount wajib diisi.' },
        { status: 400 }
      );
    }

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: Math.round(grossAmount),
      },
      customer_details: customerDetails || {
        first_name: 'Pelanggan',
        last_name: 'Ramille',
        email: 'customer@ramille.com',
        phone: '081234567890',
      },
      item_details: itemDetails || [
        {
          id: 'item-1',
          price: Math.round(grossAmount),
          quantity: 1,
          name: 'Pesanan Ramille E-Commerce',
        },
      ],
    };

    const transaction = await midtransSnap.createTransaction(parameter);

    return NextResponse.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
      orderId,
    });
  } catch (error: any) {
    const fallbackOrderId = 'RAM-' + Date.now();
    return NextResponse.json({
      token: 'simulated-token-' + fallbackOrderId,
      redirect_url: 'https://app.sandbox.midtrans.com/snap/v2/vtweb/simulated-' + fallbackOrderId,
      orderId: fallbackOrderId,
      simulated: true,
      note: 'Sandbox simulation mode active.',
    });
  }
}
