import { NextResponse } from 'next/server';
import crypto from 'node:crypto';

export async function POST(req: Request) {
  try {
    const notificationJson = await req.json();
    const { order_id, status_code, gross_amount, signature_key, transaction_status, fraud_status } = notificationJson;

    const serverKey = process.env.MIDTRANS_SERVER_KEY || '';
    if (serverKey) {
      const hash = crypto
        .createHash('sha512')
        .update(order_id + status_code + gross_amount + serverKey)
        .digest('hex');

      if (hash !== signature_key) {
        return NextResponse.json({ error: 'Signature mismatch' }, { status: 403 });
      }
    }

    let paymentStatus = 'pending';
    if (transaction_status === 'capture') {
      paymentStatus = fraud_status === 'challenge' ? 'challenge' : 'settlement';
    } else if (transaction_status === 'settlement') {
      paymentStatus = 'settlement';
    } else if (['cancel', 'deny', 'expire'].includes(transaction_status)) {
      paymentStatus = 'failed';
    }

    return NextResponse.json({
      status: 'OK',
      orderId: order_id,
      paymentStatus,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
