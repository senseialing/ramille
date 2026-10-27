# ✻ Ramille — Quiet Luxury E-Commerce Platform

Website e-commerce premium berbasis web responsive yang dirancang dengan estetika editorial modern (*quiet luxury* / anti-AI slop), mengintegrasikan katalog produk busana linen & curated living, sistem keranjang belanja berbasis state management terpersistensi, autentikasi & database PostgreSQL cloud di Supabase, serta gateway pembayaran Midtrans dengan pelacakan status pesanan real-time.

---

## 📌 Daftar Isi
1. [Teknologi Utama (Tech Stack)](#-teknologi-utama-tech-stack)
2. [Fitur-Fitur Utama](#-fitur-fitur-utama)
3. [Arsitektur & Keamanan](#-arsitektur--keamanan)
4. [Struktur Folder Proyek](#-struktur-folder-proyek)
5. [Panduan Instalasi & Menjalankan](#-panduan-instalasi--menjalankan)
6. [Konfigurasi Environment (.env.local)](#-konfigurasi-environment-envlocal)
7. [Struktur Database Supabase](#-struktur-database-supabase)
8. [Uji Coba Pembayaran Midtrans Sandbox](#-uji-coba-pembayaran-midtrans-sandbox)
9. [Daftar Route Aplikasi](#-daftar-route-aplikasi)

---

## 🛠️ Teknologi Utama (Tech Stack)

| Lapisan | Teknologi | Peran & Tanggung Jawab |
|---|---|---|
| **Frontend & SSR** | **Next.js 16 (App Router)** | Rendering halaman publik, layout modular, route handlers, dan API endpoint server. |
| **Library UI** | **React 19 & TypeScript** | Komponen UI reaktif, deklarasi tipe data transaksional yang aman (*type-safe*). |
| **Styling & Desain** | **Tailwind CSS v4** | Desain editorial minimalis, responsif desktop/mobile, palet warna warm sandstone & deep espresso. |
| **Tipografi** | **Google Fonts** | `Cormorant Garamond` (editorial serif untuk judul & aksen) dan `Plus Jakarta Sans` (antarmuka bersih). |
| **State Management** | **Zustand 5** | Manajemen keranjang belanja, wishlist favorit, dan riwayat pesanan dengan persistensi browser `localStorage`. |
| **Database & Auth** | **Supabase (PostgreSQL)** | Penyimpanan 13 tabel relasional, autentikasi pengguna, dan kebijakan *Row Level Security* (RLS). |
| **Payment Gateway** | **Midtrans (Snap API)** | Pembuatan token transaksi, pemrosesan pembayaran Sandbox (QRIS, VA BCA/Mandiri, Kartu Kredit), dan verifikasi notifikasi webhook. |

---

## ✨ Fitur-Fitur Utama

### 🛍️ 1. Sisi Toko & Pengalaman Pelanggan (Storefront)
* **Hero Section Editorial:** Menampilkan showcase koleksi busana musiman (*Autumn & Neutral Collection '26*), headline serif beraksen italic (*"Your Everyday Style, Upgraded"*), dan slide galeri interaktif.
* **Shop by Category:** 6 kategori lengkung melingkar (*Arched Circular Cards*): *Apparel & Linen, Skincare & Botanicals, Leather Goods, Home Sanctuary, Jewelry & Accents, Curated Living*.
* **Katalog Produk Dinamis:**
  * Filter kategori interaktif (*All, Linen, Botanicals, Leatherware*).
  * Format mata uang Rupiah asli (`Rp 1.450.000`).
  * Modal **Quick View** produk dengan galeri foto, spesifikasi material, dan tombol atur kuantitas.
  * Fitur **Wishlist Favorit** (tandai dan beli kapan saja).
* **Keranjang Belanja Slide-Over (Cart Drawer):**
  * Indikator progres **Bebas Ongkir** otomatis (ambang batas Rp 500.000).
  * Pengaturan kuantitas barang (+ / -) dan tombol hapus item.
  * Form kupon promo diskon (contoh: gunakan kupon `RAMILLE20` untuk diskon 20%).
* **Checkout & Pembayaran Terintegrasi:**
  * Formulir data penerima pengiriman (Nama, WhatsApp, Alamat Lengkap, Kota, Kode Pos).
  * Pilihan metode bayar Midtrans: **QRIS**, **BCA Virtual Account**, **Mandiri Bill**, atau **Kartu Kredit**.
  * Dilengkapi **Interactive Sandbox Simulator** untuk simulasi pembayaran lunas instan (*Settlement*).
* **Halaman Akun Pelanggan & Pelacakan Paket (`/account`):**
  * **Profil Pengguna:** Data akun pelanggan dan pengelolaan alamat pengiriman utama.
  * **Status & Metode Pembayaran:** Menampilkan apakah pesanan sudah lunas (*Settlement*) beserta kanal yang digunakan (misal: *via BCA Virtual Account*).
  * **Live Order Tracking (Posisi Paket Terkini):** Mengetahui paket sedang berada di mana (misal: *Sorting Hub DC Jakarta Selatan — Sedang dibawa kurir Hendra menuju alamat tujuan*).
  * **Ekspedisi & Salin Resi:** Menampilkan nama kurir (*JNE Express / SiCepat*) dan nomor resi pengiriman dengan tombol salin instan.
  * **Timeline Stepper:** Riwayat log perjalanan paket dari dibuat, diverifikasi Midtrans, dikemas di atelier, diserahkan ke kurir, transit di sorting hub, hingga diterima.

---

### 🎛️ 2. Sisi Pengelola Toko (Admin Portal `/admin`)
* **Ringkasan Dashboard (Overview):**
  * Metrik Total Omset Terbayar (sinkron status *Settlement*), Total Pesanan Masuk, Katalog Aktif, dan Jumlah Pelanggan Terdaftar.
  * Tabel aktivitas transaksi terbaru dengan rincian **Metode Pembayaran Midtrans** yang dipakai pembeli.
* **Manajemen Katalog & Inventaris Stok:**
  * Tabel inventaris produk toko dengan indikator stok cerdas (badge kuning jika stok < 10 unit).
  * Modal formulir **Tambah Produk Baru (+)** untuk memasukkan nama, kategori, harga satuan, stok, foto, dan deskripsi.
  * Aksi hapus produk dari katalog.
* **Manajemen Pesanan & Pemenuhan Kurir:**
  * Pengawasan status transaksi pembeli.
  * Tombol aksi pengiriman: ubah status dari `processing` menjadi `shipped` (Kirim Barang), lalu menjadi `completed` (Selesai).
  * Modal pelacakan live dan rincian pesanan.
* **Manajemen Kupon & Promosi:**
  * Pengelolaan kode kupon aktif seperti `RAMILLE20` dan `QUIETLUXURY` lengkap dengan nilai potongan dan syarat minimal belanja.

---

## 🔒 Arsitektur & Keamanan
1. **Perhitungan Server-Side:** Total belanja, diskon kupon, dan ongkir dihitung ulang secara aman di server sebelum membuat transaksi Midtrans untuk mencegah manipulasi harga dari browser.
2. **Keamanan Kunci Rahasia:** `MIDTRANS_SERVER_KEY` dan `SUPABASE_SERVICE_ROLE_KEY` hanya berada pada lingkungan server dan tidak pernah diekspos ke client-side.
3. **Verifikasi Notifikasi Webhook:** Menggunakan verifikasi *signature key* berbasis enkripsi **SHA-512** untuk memastikan notifikasi status bayar benar-benar berasal dari Midtrans.
4. **Row Level Security (RLS):** Kebijakan otorisasi di database Supabase memastikan data pesanan pribadi hanya dapat diakses oleh pemilik akun terkait.

---

## 📁 Struktur Folder Proyek

```text
ecommerce/
├── public/                 # Aset statis & favicon
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── account/        # Halaman Akun Pelanggan & Pelacakan Live (/account)
│   │   │   └── page.tsx
│   │   ├── admin/          # Panel Admin Manajemen Toko (/admin)
│   │   │   └── page.tsx
│   │   ├── api/            # Route Handlers API Server
│   │   │   └── payments/
│   │   │       └── midtrans/
│   │   │           ├── create/route.ts        # Endpoint generate Snap Token
│   │   │           └── notification/route.ts  # Webhook notifikasi Midtrans
│   │   ├── globals.css     # Design tokens & styling Tailwind CSS v4
│   │   ├── layout.tsx      # Root layout, Google Fonts (Cormorant & Jakarta), Midtrans script
│   │   └── page.tsx        # Halaman Beranda (Storefront)
│   ├── components/         # Komponen Modular
│   │   ├── auth/           # Modal Login / Registrasi Akun
│   │   ├── cart/           # Drawer Keranjang Belanja Slide-over
│   │   ├── checkout/       # Modal Checkout & Simulator Midtrans Snap
│   │   ├── home/           # Hero, CategorySlider, FeaturedProducts, TrustFeatures, Reviews, Newsletter
│   │   ├── layout/         # Navbar (Brand ✻ Ramille, Search, Wishlist, Cart) & Footer
│   │   ├── products/       # Modal Quick View Detail Produk
│   │   ├── search/         # Modal Pencarian Real-Time
│   │   └── wishlist/       # Modal Produk Favorit
│   ├── data/               # Data katalog produk, kategori, review, dan kupon
│   ├── lib/                # Konfigurasi Supabase Client & Midtrans SDK
│   ├── stores/             # Zustand Stores (cart-store, wishlist-store, orders-store)
│   └── types/              # Definisi TypeScript transaksional
├── supabase/
│   └── schema.sql          # Blueprint migrasi 13 tabel PostgreSQL & RLS Supabase
├── .env.local              # Konfigurasi API Keys (Supabase & Midtrans)
├── package.json            # Daftar dependensi & scripts
├── PRD.md                  # Dokumen Product Requirements Document resmi
└── README.md               # Dokumentasi lengkap proyek
```

---

## 🚀 Panduan Instalasi & Menjalankan

### 1. Prasyarat Sistem
* **Node.js** versi **v20.x atau yang lebih baru** ([Download Node.js](https://nodejs.org/)).
* Git (opsional).

### 2. Kloning / Buka Folder Proyek
Buka terminal di folder project:
```powershell
cd "C:\Users\WINDOWS 10 PRO\ecommerce"
```

### 3. Instalasi Dependensi
```powershell
npm install
```

### 4. Menjalankan Server Pengembangan (Dev Server)
```powershell
npm run dev
```
Buka browser di: **[http://localhost:3000](http://localhost:3000)**.

---

## 🔑 Konfigurasi Environment (`.env.local`)

Buat atau perbarui file `.env.local` di root direktori project:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh......
SUPABASE_SERVICE_ROLE_KEY=eyJh......

# Midtrans Configuration (Mode Sandbox)
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxxxxx
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxxxxxx
MIDTRANS_IS_PRODUCTION=false

# App Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 🗄️ Struktur Database Supabase

Proyek ini telah dilengkapi file migrasi lengkap di [`supabase/schema.sql`](file:///c:/Users/WINDOWS%2010%20PRO/ecommerce/supabase/schema.sql). Skrip ini menyediakan 13 tabel PostgreSQL:

1. `profiles` — Profil pelanggan dan hak akses admin.
2. `categories` — Kategori produk aktif.
3. `products` — Data katalog, harga numerik, stok, dan deskripsi.
4. `product_images` — Galeri foto produk tambahan.
5. `addresses` — Alamat pengiriman pengguna.
6. `orders` — Data transaksi belanja dan snapshot penerima.
7. `order_items` — Snapshot produk dan harga saat dibeli.
8. `payments` — Catatan riwayat percobaan pembayaran Midtrans.
9. `wishlists` — Daftar produk yang disimpan pelanggan.
10. `reviews` — Rating (1–5) dan ulasan pelanggan.
11. `coupons` — Kode promo diskon toko (`RAMILLE20`, dll).
12. `coupon_redemptions` — Audit jejak penggunaan kupon per order.
13. `payment_webhook_events` — Log idempotensi notifikasi Midtrans.

> **Cara Menjalankan Skrip Database:** Buka dashboard Supabase > menu **SQL Editor** > Tempel isi file `supabase/schema.sql` > Klik **Run**.

---

## 💳 Uji Coba Pembayaran Midtrans Sandbox

Untuk mencoba simulasi transaksi pembayaran tanpa menggunakan uang asli:

### 1. Pembayaran via Virtual Account (BCA / Mandiri / BRI)
* Nomor VA simulasi: `80777 081298765432`
* Kunjungi portal resmi: [Midtrans Payment Simulator](https://simulator.sandbox.midtrans.com/), masukkan nomor VA, dan klik **Inquire & Pay**.

### 2. Pembayaran via Kartu Kredit Uji Coba
* **Nomor Kartu:** `4811 1111 1111 1114`
* **Masa Berlaku:** Tanggal mendatang (misal `12/28`)
* **CVV:** `123`
* **Kode OTP:** `112233`

### 3. Pembayaran via QRIS
* Pada popup pembayaran, gunakan tombol simulasi bayar otomatis untuk mengubah status menjadi *Settlement*.

---

## 🗺️ Daftar Route Aplikasi

| Route URL | Nama Halaman | Keterangan Akses |
|---|---|---|
| `/` | **Storefront (Beranda)** | Akses Publik (Katalog, Hero, Keranjang, Checkout) |
| `/account` | **Halaman Akun Pelanggan** | Profil, Alamat, Status Bayar & Live Tracking Paket |
| `/admin` | **Panel Admin Toko** | Manajemen Omset, Produk, Pesanan, Resi, & Kupon |
| `/api/payments/midtrans/create` | **API Create Transaction** | Endpoint pembuatan Snap token di server |
| `/api/payments/midtrans/notification` | **API Webhook Notification** | Endpoint callback status bayar Midtrans |

---

## 📄 Lisensi & Hak Cipta
Hak Cipta © 2026 **Ramille**. Seluruh hak cipta dilindungi undang-undang.
