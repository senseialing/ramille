import midtransClient from 'midtrans-client';

export const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';

export const midtransSnap = new midtransClient.Snap({
  isProduction: isProduction,
  serverKey: process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-test',
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || 'SB-Mid-client-test',
});
