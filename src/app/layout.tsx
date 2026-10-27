import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ramille — Quiet Luxury E-Commerce & Curated Living',
  description: 'Discover trendy fashion, beauty essentials and curated lifestyle picks — all in one quiet luxury sanctuary. Handcrafted quality and seamless Midtrans payment.',
};

export const viewport: Viewport = {
  themeColor: '#FAF7F2',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cormorant.variable + ' ' + jakarta.variable + ' antialiased'}>
      <head>
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || 'SB-Mid-client-test'}
          strategy="lazyOnload"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#FAF7F2] text-[#1E1A17] selection:bg-[#E5D8C7] selection:text-[#1E1A17]">
        {children}
      </body>
    </html>
  );
}
