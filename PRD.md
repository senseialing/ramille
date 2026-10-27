# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## Website E-Commerce Premium

**Versi Dokumen:** 1.0  
**Tanggal:** 22 Oktober 2026  
**Status:** Draft — Acuan Pengembangan  
**Platform:** Web Responsive  
**Target Pasar:** Pengguna umum  
**Mata Uang Utama:** Rupiah (IDR)

---

## 1. Ringkasan Produk

### 1.1 Nama Produk

Nama produk sementara: **Premium E-Commerce Website**.

Nama merek, identitas visual, dan domain akan ditentukan pada tahap branding.

### 1.2 Deskripsi Produk

Website e-commerce ini merupakan platform penjualan online yang menyediakan berbagai kategori produk untuk pelanggan umum. Website memungkinkan pengunjung menjelajahi katalog, mencari produk, melihat detail produk, menambahkan produk ke keranjang, menggunakan promosi, melakukan checkout, dan membayar melalui payment gateway Midtrans.

Pengguna yang memiliki akun juga dapat mengelola profil, melihat riwayat pesanan, menyimpan produk ke wishlist, serta memberikan ulasan produk.

Di sisi operasional, admin dapat mengelola katalog produk, kategori, stok, promosi, dan pesanan melalui dashboard admin.

Website dibangun menggunakan Next.js untuk frontend dan routing, Tailwind CSS untuk desain antarmuka, Zustand untuk pengelolaan keranjang, Supabase untuk database dan autentikasi, serta Midtrans untuk pemrosesan pembayaran.

### 1.3 Visi Produk

Membangun pengalaman belanja online yang premium, mudah digunakan, aman, responsif, dan transparan, mulai dari penemuan produk hingga penyelesaian transaksi.

### 1.4 Nilai Utama Produk

- **Premium experience:** Tampilan modern dengan tipografi, tata letak, dan komponen visual yang konsisten.
- **Kemudahan berbelanja:** Katalog, pencarian, filter, wishlist, dan keranjang yang mudah diakses.
- **Transaksi tepercaya:** Total pembayaran ditentukan oleh server dan status transaksi diverifikasi melalui Midtrans.
- **Informasi transparan:** Harga, stok, diskon, biaya pengiriman, dan status pesanan ditampilkan dengan jelas.
- **Operasional terpusat:** Admin memiliki satu dashboard untuk mengelola produk dan pesanan.

---

## 2. Tujuan Produk

### 2.1 Tujuan Bisnis

1. Menyediakan kanal penjualan digital yang dapat diakses melalui desktop, tablet, dan perangkat mobile.
2. Mempermudah pelanggan menemukan produk dan menyelesaikan pembelian.
3. Menyediakan proses pembayaran terintegrasi dengan Midtrans.
4. Membantu admin mengelola katalog, stok, promosi, dan pesanan.
5. Meningkatkan kepercayaan pelanggan melalui informasi produk, ulasan, dan status pesanan yang transparan.

### 2.2 Tujuan Pengguna

Pengguna diharapkan dapat:

- Menemukan produk berdasarkan kategori atau kata kunci.
- Memahami informasi produk sebelum membeli.
- Mengelola keranjang dan menggunakan kode promosi.
- Menyelesaikan pembayaran melalui metode yang tersedia di Midtrans.
- Memeriksa riwayat dan status pesanan.
- Menyimpan produk favorit dan memberikan ulasan setelah pembelian yang memenuhi syarat.

### 2.3 Indikator Keberhasilan

Target numerik berikut merupakan target awal yang perlu dievaluasi menggunakan data setelah peluncuran.

| Indikator                      | Target awal                                                         |
| ------------------------------ | ------------------------------------------------------------------- |
| Keberhasilan alur checkout     | Seluruh skenario checkout yang valid lolos pengujian                |
| Akurasi total pesanan          | 100% sesuai hasil kalkulasi server                                  |
| Sinkronisasi status pembayaran | Semua status yang diverifikasi diproses sesuai aturan transaksi     |
| Keamanan akses pengguna        | Tidak ada akses lintas akun yang tidak diizinkan pada pengujian RLS |
| Responsivitas                  | Halaman utama dan alur belanja berfungsi pada desktop dan mobile    |
| Keberhasilan fitur inti        | Seluruh kriteria penerimaan pada dokumen ini terpenuhi              |

Target konversi penjualan, retensi pengguna, dan pendapatan belum ditentukan karena belum tersedia data bisnis awal.

---

## 3. Target Pengguna dan User Persona

### 3.1 Persona A — Pengunjung

**Karakteristik:** Orang yang ingin mencari atau membandingkan produk tanpa langsung membuat akun.

**Kebutuhan:**

- Melihat produk dan kategori.
- Mencari dan memfilter produk.
- Membaca detail dan ulasan.
- Menambahkan produk ke keranjang.

**Tujuan:** Menemukan produk yang sesuai sebelum membuat keputusan pembelian.

### 3.2 Persona B — Pelanggan

**Karakteristik:** Pengguna yang memiliki akun dan berbelanja melalui website.

**Kebutuhan:**

- Registrasi dan login.
- Mengelola informasi profil dan alamat.
- Menggunakan wishlist dan keranjang.
- Checkout, membayar, dan memantau pesanan.
- Memberikan ulasan yang sesuai dengan ketentuan.

**Tujuan:** Menyelesaikan pembelian dengan proses yang jelas dan nyaman.

### 3.3 Persona C — Administrator

**Karakteristik:** Pengelola toko yang bertanggung jawab atas produk dan transaksi.

**Kebutuhan:**

- Membuat, mengubah, menerbitkan, dan mengarsipkan produk.
- Mengelola kategori, harga, dan stok.
- Membuat serta mengatur promosi.
- Melihat dan memperbarui status pemrosesan pesanan.
- Memeriksa status pembayaran dan ulasan.

**Tujuan:** Menjalankan operasional toko melalui dashboard yang aman dan mudah dipahami.

---

## 4. Teknologi dan Arsitektur

| Teknologi           | Tanggung jawab                                                   |
| ------------------- | ---------------------------------------------------------------- |
| Next.js             | Halaman, routing, rendering, dan endpoint server                 |
| Tailwind CSS        | Styling, layout responsif, dan konsistensi desain                |
| Zustand             | State management keranjang belanja                               |
| Supabase Auth       | Registrasi, login, session, dan autentikasi pengguna             |
| Supabase PostgreSQL | Penyimpanan data produk, pelanggan, pesanan, promosi, dan ulasan |
| Supabase Storage    | Usulan tempat penyimpanan gambar produk jika dibutuhkan          |
| Midtrans            | Pembuatan transaksi pembayaran dan pembaruan status transaksi    |

### 4.1 Pola Arsitektur

Website menggunakan pola frontend dan backend dalam satu aplikasi Next.js.

- **Frontend:** Menampilkan halaman publik, halaman akun, keranjang, checkout, dan dashboard admin.
- **Server Next.js:** Memvalidasi input, memeriksa session, menghitung total pesanan, menjalankan operasi sensitif, serta menangani integrasi Midtrans.
- **Supabase:** Menyimpan data dan menerapkan kebijakan akses pada level database.
- **Midtrans:** Memproses pembayaran dan mengirimkan notifikasi status transaksi ke endpoint server.

App Router dan Route Handlers dapat digunakan untuk mengatur halaman serta endpoint API. Komponen yang membutuhkan interaksi browser menggunakan Client Components, sedangkan pengambilan data yang tidak membutuhkan interaksi dapat diproses di server.

Referensi: [Next.js App Router](https://nextjs.org/docs/app), [Next.js Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers).

### 4.2 Prinsip Pemisahan Tanggung Jawab

- Zustand mengelola state keranjang pada antarmuka, bukan menjadi sumber kebenaran harga atau stok.
- Supabase menjadi sumber data produk dan pesanan.
- Server menghitung ulang harga, diskon, ongkir, dan total sebelum membuat transaksi.
- Midtrans menjadi sumber konfirmasi eksternal atas status pembayaran.
- Hak akses admin ditentukan di sisi server dan database, bukan hanya dengan menyembunyikan tombol pada frontend.

---

## 5. Ruang Lingkup Produk

### 5.1 Fitur yang Termasuk

1. Landing page dan katalog produk.
2. Pencarian, kategori, filter, pengurutan, dan detail produk.
3. Registrasi, login, logout, dan pengelolaan profil dasar.
4. Keranjang belanja menggunakan Zustand.
5. Checkout dan pembayaran melalui Midtrans.
6. Riwayat pesanan serta informasi status pembayaran.
7. Wishlist produk.
8. Rating dan ulasan produk.
9. Promosi atau kode diskon.
10. Dashboard admin untuk pengelolaan produk, kategori, stok, pesanan, dan promosi.
11. Tampilan responsif untuk desktop dan perangkat mobile.
12. Penanganan validasi formulir, loading, error, dan halaman kosong.

### 5.2 Di Luar Ruang Lingkup Saat Ini

Fitur-fitur berikut tidak menjadi kewajiban dalam versi ini:

- Model marketplace multi-vendor.
- Aplikasi native Android atau iOS.
- Integrasi API kurir atau agregator logistik.
- Program loyalitas, poin, dan membership berbayar.
- Live chat dan chatbot.
- Sistem rekomendasi berbasis kecerdasan buatan.
- Multi-mata uang dan multi-bahasa.
- Langganan produk atau pembayaran berulang.
- Integrasi ERP dan sistem akuntansi.
- Sistem refund otomatis untuk seluruh metode pembayaran.

Pengembangan fitur tersebut dapat dipertimbangkan melalui perubahan ruang lingkup setelah kebutuhan bisnisnya ditentukan.

---

## 6. Kebutuhan Fungsional

Prioritas menggunakan kategori **P0** untuk fitur wajib agar alur belanja dapat beroperasi, **P1** untuk fitur pendukung yang termasuk dalam cakupan lengkap, dan **P2** untuk penyempurnaan yang tidak menghalangi alur transaksi utama.

### 6.1 Landing Page dan Katalog Produk

**FR-01 — Landing page (P0)**

Website harus menampilkan identitas toko, navigasi utama, akses pencarian, akses keranjang, dan bagian katalog atau produk pilihan.

**FR-02 — Daftar produk (P0)**

Pengunjung dapat melihat produk yang berstatus aktif atau dipublikasikan. Produk minimal menampilkan gambar utama, nama, harga, dan informasi stok yang relevan.

**FR-03 — Detail produk (P0)**

Setiap produk memiliki halaman detail yang memuat nama, gambar, deskripsi, harga, dan ketersediaan stok.

**FR-04 — Pencarian dan kategori (P0)**

Pengguna dapat mencari produk berdasarkan kata kunci dan menelusuri kategori produk.

**FR-05 — Filter dan pengurutan (P1)**

Pengguna dapat memfilter atau mengurutkan daftar berdasarkan kriteria yang tersedia, sekurang-kurangnya harga dan kategori.

**FR-06 — Respons hasil katalog (P1)**

Website menampilkan kondisi loading, tidak ada hasil, dan kegagalan mengambil data secara informatif.

### 6.2 Autentikasi dan Profil

**FR-07 — Registrasi (P0)**

Pengguna dapat membuat akun menggunakan email dan kata sandi. Apabila konfirmasi email diaktifkan, website harus menampilkan informasi mengenai verifikasi akun.

**FR-08 — Login dan logout (P0)**

Pengguna dapat login dan logout. Session ditangani dengan mekanisme yang sesuai untuk aplikasi Next.js.

**FR-09 — Pengelolaan profil (P1)**

Pelanggan dapat melihat dan mengubah informasi profil dasar yang disediakan, seperti nama dan nomor telepon.

**FR-10 — Proteksi halaman (P0)**

Halaman akun dan pesanan hanya dapat diakses oleh pengguna yang memiliki session valid. Halaman admin hanya dapat diakses oleh akun dengan role admin.

### 6.3 Keranjang Belanja

**FR-11 — Menambahkan produk (P0)**

Pengguna dapat menambahkan produk yang tersedia ke keranjang.

**FR-12 — Mengubah kuantitas (P0)**

Pengguna dapat menambah atau mengurangi jumlah barang serta menghapus barang dari keranjang. Kuantitas tidak boleh melebihi stok yang tersedia.

**FR-13 — Ringkasan keranjang (P0)**

Keranjang menampilkan gambar produk, nama, harga satuan, kuantitas, dan subtotal setiap item.

**FR-14 — Penyimpanan state keranjang (P0)**

Zustand mengelola state keranjang. Persistensi pada browser dapat digunakan agar keranjang tetap tersedia setelah halaman dimuat ulang.

Data hasil persistensi tetap dianggap sebagai data sementara. Produk, harga, dan stok harus divalidasi kembali melalui server ketika checkout.

**FR-15 — Konsistensi keranjang (P0)**

Jika produk sudah tidak tersedia atau harganya berubah, website harus meminta pengguna meninjau perubahan sebelum transaksi dilanjutkan.

### 6.4 Checkout

**FR-16 — Informasi penerima (P0)**

Checkout menyediakan formulir informasi penerima dan alamat untuk pesanan yang membutuhkan pengiriman.

**FR-17 — Ringkasan biaya (P0)**

Sebelum pembayaran, pengguna melihat ringkasan berisi subtotal produk, diskon, biaya pengiriman, dan total akhir.

**FR-18 — Validasi checkout (P0)**

Server memeriksa produk, harga, stok, kuantitas, kelayakan promosi, dan informasi pesanan sebelum transaksi dibuat.

**FR-19 — Pencegahan transaksi ganda (P0)**

Pembuatan pesanan dan percobaan pembayaran harus menggunakan identitas transaksi unik sehingga pengulangan permintaan tidak menghasilkan pembayaran ganda yang tidak disengaja.

### 6.5 Pembayaran Midtrans

**FR-20 — Membuat transaksi (P0)**

Server menghasilkan transaksi Midtrans berdasarkan pesanan dan total yang dihitung ulang di server.

**FR-21 — Antarmuka pembayaran (P0)**

Pengguna diarahkan atau ditampilkan antarmuka pembayaran Midtrans sesuai metode integrasi yang dipilih.

**FR-22 — Status pembayaran (P0)**

Website menampilkan status seperti menunggu pembayaran, berhasil, gagal, atau kedaluwarsa.

**FR-23 — Verifikasi pembayaran (P0)**

Perubahan status pembayaran yang menentukan pemrosesan pesanan harus berdasarkan notifikasi terverifikasi atau pemeriksaan status transaksi melalui API Midtrans. Callback pada browser tidak boleh menjadi satu-satunya dasar konfirmasi.

**FR-24 — Pembayaran gagal atau kedaluwarsa (P0)**

Pengguna dapat melihat status transaksi yang gagal atau kedaluwarsa dan memperoleh instruksi untuk mencoba kembali jika transaksi masih memenuhi ketentuan.

Percobaan pembayaran baru harus menggunakan identitas transaksi Midtrans yang unik.

### 6.6 Pesanan dan Riwayat Transaksi

**FR-25 — Membuat pesanan (P0)**

Website menyimpan pesanan beserta snapshot nama produk, harga satuan, kuantitas, diskon, biaya pengiriman, dan total saat transaksi dibuat.

**FR-26 — Riwayat pesanan (P0)**

Pelanggan dapat melihat daftar pesanan miliknya, waktu transaksi, total pembayaran, dan status pesanan.

**FR-27 — Detail pesanan (P0)**

Pengguna dapat membuka detail pesanan dan melihat item yang dibeli serta status pembayaran.

**FR-28 — Pengelolaan status pemenuhan (P1)**

Admin dapat memperbarui status operasional pesanan, seperti diproses, dikirim, atau selesai. Pelacakan kurir otomatis tidak termasuk dalam cakupan saat ini.

### 6.7 Wishlist

**FR-29 — Menyimpan produk favorit (P1)**

Pelanggan yang login dapat menambahkan dan menghapus produk dari wishlist.

**FR-30 — Melihat wishlist (P1)**

Pengguna dapat melihat produk favorit serta berpindah ke halaman detail produk.

Wishlist tersimpan berdasarkan akun sehingga tidak bercampur dengan wishlist pengguna lain.

### 6.8 Rating dan Ulasan

**FR-31 — Membaca ulasan (P1)**

Pengunjung dapat melihat rating dan ulasan yang dipublikasikan pada halaman produk.

**FR-32 — Memberikan ulasan (P1)**

Pelanggan dapat memberi rating dan komentar sesuai aturan yang berlaku. Rekomendasi awal adalah ulasan hanya dapat dibuat untuk produk yang telah dibeli dan memenuhi status pesanan yang disyaratkan.

**FR-33 — Validasi ulasan (P1)**

Rating harus berada pada rentang 1–5. Sistem mencegah ulasan berulang yang melanggar aturan untuk item pembelian yang sama.

### 6.9 Promosi dan Diskon

**FR-34 — Menggunakan kode promo (P1)**

Pelanggan dapat memasukkan kode promosi pada checkout dan memperoleh informasi apakah kode valid atau tidak.

**FR-35 — Validasi promosi (P1)**

Server memvalidasi masa berlaku, status aktif, jenis diskon, batas pembelian minimum bila diatur, batas penggunaan, dan ketentuan diskon sebelum menghitung total baru.

**FR-36 — Pengelolaan promosi (P1)**

Admin dapat membuat, memperbarui, mengaktifkan, menonaktifkan, dan menentukan masa berlaku promosi.

### 6.10 Dashboard Admin

**FR-37 — Ringkasan dashboard (P1)**

Admin dapat melihat ringkasan operasional dasar, terutama daftar pesanan terbaru dan informasi yang mendukung pengelolaan toko. Dashboard analitik lanjutan bukan persyaratan pada versi ini.

**FR-38 — Manajemen produk (P0)**

Admin dapat membuat, mengubah, menerbitkan, menonaktifkan, dan mengarsipkan produk.

**FR-39 — Manajemen kategori dan stok (P0)**

Admin dapat mengelola kategori, harga, dan jumlah stok produk.

**FR-40 — Manajemen pesanan (P0)**

Admin dapat melihat detail pesanan, memeriksa status pembayaran, dan mengubah status operasional pesanan sesuai alur yang diizinkan.

**FR-41 — Manajemen promosi (P1)**

Admin dapat membuat dan mengatur kode promo serta ketentuan diskonnya.

**FR-42 — Akses admin (P0)**

Hanya admin yang berwenang yang dapat mengakses fungsi pengelolaan. Validasi dilakukan pada server dan database, bukan hanya melalui tampilan frontend.

---

## 7. Kebutuhan Desain UI/UX

### 7.1 Arah Visual

Gaya visual website adalah premium, modern, minimalis, dan profesional.

Prinsip desain:

- Whitespace cukup untuk menjaga keterbacaan.
- Tipografi konsisten dengan hierarki judul, teks, harga, dan label.
- Gambar produk menjadi fokus utama katalog.
- Komponen kartu produk, tombol, input, badge, dan modal memiliki tampilan konsisten.
- Warna digunakan secara terukur untuk CTA, status, dan aksen merek.
- Navigasi yang jelas pada desktop dan mobile.
- Animasi ringan hanya untuk membantu interaksi, bukan menghambat belanja.

Palet warna, logo, font final, dan aset foto ditentukan pada tahap desain UI/UX.

### 7.2 Halaman dan Route Utama

| Halaman          | Route yang disarankan | Akses                      |
| ---------------- | --------------------- | -------------------------- |
| Landing page     | `/`                   | Publik                     |
| Katalog          | `/products`           | Publik                     |
| Detail produk    | `/products/[slug]`    | Publik                     |
| Kategori         | `/categories/[slug]`  | Publik                     |
| Keranjang        | `/cart`               | Publik                     |
| Checkout         | `/checkout`           | Pengguna login             |
| Hasil pembayaran | `/payment/result`     | Berdasarkan transaksi      |
| Login            | `/login`              | Publik                     |
| Registrasi       | `/register`           | Publik                     |
| Profil           | `/account`            | Pengguna login             |
| Wishlist         | `/wishlist`           | Pengguna login             |
| Riwayat pesanan  | `/orders`             | Pengguna login             |
| Detail pesanan   | `/orders/[id]`        | Pemilik pesanan atau admin |
| Dashboard admin  | `/admin`              | Admin                      |
| Produk admin     | `/admin/products`     | Admin                      |
| Kategori admin   | `/admin/categories`   | Admin                      |
| Pesanan admin    | `/admin/orders`       | Admin                      |
| Promosi admin    | `/admin/promotions`   | Admin                      |

Route dapat disesuaikan selama struktur navigasi, akses, dan tanggung jawab setiap halaman tetap terjaga.

### 7.3 Status Antarmuka

Setiap halaman yang mengambil data harus memiliki:

- Loading state.
- Empty state.
- Error state.
- Konfirmasi untuk tindakan penting.
- Pesan sukses atau gagal yang mudah dipahami.
- Tampilan responsif dan fokus keyboard yang memadai.

---

## 8. Alur Pengguna

### 8.1 Alur Belanja Umum

1. Pengunjung membuka landing page.
2. Pengunjung menelusuri kategori atau mencari produk.
3. Pengunjung membuka detail produk.
4. Pengunjung menambahkan produk ke keranjang.
5. Pengunjung membuka keranjang dan memeriksa kuantitas.
6. Pengunjung melanjutkan ke checkout.
7. Pengunjung login atau registrasi jika belum memiliki session.
8. Pengunjung mengisi atau memeriksa informasi penerima.
9. Server memvalidasi harga, stok, dan promosi serta menghitung total transaksi.
10. Sistem membuat pesanan dan transaksi pembayaran.
11. Pengguna menyelesaikan pembayaran melalui Midtrans.
12. Server memverifikasi status pembayaran.
13. Status pesanan diperbarui dan pengguna dapat melihat hasilnya di riwayat pesanan.

### 8.2 Alur Pembayaran Gagal atau Kedaluwarsa

1. Pelanggan membuka pesanan yang masih menunggu pembayaran.
2. Website menampilkan status transaksi terakhir yang terverifikasi.
3. Jika transaksi gagal atau kedaluwarsa, website menampilkan pesan yang sesuai.
4. Jika percobaan baru diizinkan, sistem membuat transaksi baru dengan identitas Midtrans yang berbeda.
5. Status percobaan baru tidak boleh menghapus atau menimpa riwayat transaksi sebelumnya secara tidak tepat.

### 8.3 Alur Admin

1. Admin login.
2. Server memverifikasi role admin.
3. Admin membuka dashboard.
4. Admin mengelola produk, kategori, stok, pesanan, atau promosi.
5. Sistem memvalidasi data dan menerapkan perubahan ke database.
6. Perubahan ditampilkan pada dashboard dan halaman pelanggan sesuai status publikasi atau pemrosesan.

### 8.4 Alur Wishlist dan Ulasan

**Wishlist:** Pengguna login → membuka produk → menambahkan ke wishlist → produk tersedia di halaman wishlist.

**Ulasan:** Pengguna login → membuka riwayat pesanan yang memenuhi syarat → memilih item yang dibeli → memberikan rating dan komentar → sistem memvalidasi dan menyimpan ulasan.

---

## 9. Rancangan Database Supabase

Database menggunakan PostgreSQL pada Supabase. Nama tabel berikut merupakan rancangan awal; tipe data dan constraint final ditetapkan saat implementasi migrasi database.

### 9.1 Tabel `profiles`

Menyimpan data profil pengguna yang terkait dengan Supabase Auth.

| Kolom        | Fungsi                                             |
| ------------ | -------------------------------------------------- |
| `id` UUID    | Primary key sekaligus referensi ke `auth.users.id` |
| `full_name`  | Nama pengguna                                      |
| `phone`      | Nomor telepon, opsional                            |
| `role`       | `customer` atau `admin`                            |
| `created_at` | Waktu pembuatan                                    |
| `updated_at` | Waktu perubahan                                    |

Role admin hanya dapat diberikan melalui proses administratif yang tepercaya. Pengguna tidak boleh dapat menaikkan role-nya sendiri melalui formulir frontend.

### 9.2 Tabel `categories`

| Kolom         | Fungsi                 |
| ------------- | ---------------------- |
| `id` UUID     | ID kategori            |
| `name`        | Nama kategori          |
| `slug`        | Identifier untuk route |
| `description` | Deskripsi opsional     |
| `is_active`   | Status aktif           |
| `sort_order`  | Urutan tampilan        |
| `created_at`  | Waktu pembuatan        |

### 9.3 Tabel `products`

| Kolom                    | Fungsi                                |
| ------------------------ | ------------------------------------- |
| `id` UUID                | ID produk                             |
| `category_id` UUID       | Relasi kategori                       |
| `name`                   | Nama produk                           |
| `slug`                   | Route produk                          |
| `description`            | Deskripsi produk                      |
| `price` NUMERIC          | Harga produk                          |
| `stock_quantity` INTEGER | Stok tersedia                         |
| `image_url` TEXT         | Gambar utama                          |
| `status`                 | `draft`, `published`, atau `archived` |
| `created_at`             | Waktu pembuatan                       |
| `updated_at`             | Waktu perubahan                       |

Harga disimpan dalam tipe numerik yang tepat, bukan floating-point untuk perhitungan transaksi. Produk yang diarsipkan tetap dapat direferensikan dari pesanan lama.

### 9.4 Tabel `product_images`

Digunakan jika satu produk memerlukan lebih dari satu gambar.

| Kolom                | Fungsi           |
| -------------------- | ---------------- |
| `id` UUID            | ID gambar        |
| `product_id` UUID    | Relasi produk    |
| `image_url` TEXT     | Lokasi gambar    |
| `alt_text` TEXT      | Deskripsi gambar |
| `sort_order` INTEGER | Urutan galeri    |

### 9.5 Tabel `addresses`

| Kolom                | Fungsi              |
| -------------------- | ------------------- |
| `id` UUID            | ID alamat           |
| `user_id` UUID       | Pemilik alamat      |
| `recipient_name`     | Nama penerima       |
| `phone`              | Telepon penerima    |
| `address_line`       | Alamat lengkap      |
| `city`               | Kota atau kabupaten |
| `province`           | Provinsi            |
| `postal_code`        | Kode pos            |
| `notes`              | Catatan opsional    |
| `is_default` BOOLEAN | Alamat utama        |

Alamat yang digunakan pada pesanan perlu disalin sebagai snapshot ke pesanan agar perubahan profil alamat tidak mengubah alamat transaksi terdahulu.

### 9.6 Tabel `orders`

| Kolom                                           | Fungsi                   |
| ----------------------------------------------- | ------------------------ |
| `id` UUID                                       | ID internal pesanan      |
| `order_number` TEXT                             | Nomor pesanan unik       |
| `user_id` UUID                                  | Pemilik pesanan          |
| `recipient_name`                                | Snapshot nama penerima   |
| `recipient_phone`                               | Snapshot telepon         |
| `shipping_address` JSONB atau kolom terstruktur | Snapshot alamat          |
| `subtotal` NUMERIC                              | Total harga item         |
| `discount_amount` NUMERIC                       | Nilai diskon             |
| `shipping_amount` NUMERIC                       | Biaya pengiriman         |
| `total_amount` NUMERIC                          | Total pembayaran         |
| `order_status`                                  | Status pemenuhan pesanan |
| `payment_status`                                | Status pembayaran        |
| `created_at`                                    | Waktu pesanan dibuat     |
| `updated_at`                                    | Waktu perubahan          |

### 9.7 Tabel `order_items`

Menyimpan rincian item pesanan pada saat pembelian.

| Kolom                       | Fungsi                            |
| --------------------------- | --------------------------------- |
| `id` UUID                   | ID item pesanan                   |
| `order_id` UUID             | Relasi pesanan                    |
| `product_id` UUID, nullable | Relasi produk jika masih tersedia |
| `product_name`              | Snapshot nama produk              |
| `product_image_url`         | Snapshot gambar                   |
| `unit_price` NUMERIC        | Harga satuan saat pembelian       |
| `quantity` INTEGER          | Kuantitas                         |
| `line_total` NUMERIC        | Subtotal item                     |

Snapshot diperlukan agar riwayat transaksi tetap akurat meskipun nama, harga, atau gambar produk berubah di kemudian hari.

### 9.8 Tabel `payments`

| Kolom                                    | Fungsi                                               |
| ---------------------------------------- | ---------------------------------------------------- |
| `id` UUID                                | ID percobaan pembayaran                              |
| `order_id` UUID                          | Relasi pesanan                                       |
| `midtrans_order_id` TEXT                 | ID transaksi unik yang dikirim ke Midtrans           |
| `midtrans_transaction_id` TEXT, nullable | ID transaksi dari Midtrans                           |
| `payment_type` TEXT, nullable            | Jenis pembayaran                                     |
| `transaction_status` TEXT                | Status transaksi Midtrans terakhir yang diverifikasi |
| `gross_amount` NUMERIC                   | Nilai transaksi                                      |
| `paid_at` TIMESTAMPTZ, nullable          | Waktu pembayaran terkonfirmasi                       |
| `created_at`                             | Waktu percobaan pembayaran                           |
| `updated_at`                             | Waktu perubahan                                      |

Setiap percobaan pembayaran harus memiliki `midtrans_order_id` unik. Dengan demikian, satu pesanan dapat mempunyai beberapa percobaan pembayaran tanpa mencampur status transaksi yang berbeda.

### 9.9 Tabel `wishlists`

| Kolom             | Fungsi           |
| ----------------- | ---------------- |
| `user_id` UUID    | Pengguna         |
| `product_id` UUID | Produk favorit   |
| `created_at`      | Waktu penambahan |

Constraint unik pada pasangan `user_id` dan `product_id` mencegah entri favorit yang berulang.

### 9.10 Tabel `reviews`

| Kolom                | Fungsi                                   |
| -------------------- | ---------------------------------------- |
| `id` UUID            | ID ulasan                                |
| `product_id` UUID    | Produk yang diulas                       |
| `user_id` UUID       | Penulis                                  |
| `order_item_id` UUID | Item pembelian yang menjadi dasar ulasan |
| `rating` INTEGER     | Nilai 1–5                                |
| `comment` TEXT       | Komentar                                 |
| `status` TEXT        | Status publikasi                         |
| `created_at`         | Waktu ulasan                             |

Server harus memastikan bahwa pengguna berhak mengulas item terkait sebelum menyimpan ulasan.

### 9.11 Tabel `coupons`

| Kolom                            | Fungsi                    |
| -------------------------------- | ------------------------- |
| `id` UUID                        | ID promosi                |
| `code` TEXT                      | Kode unik                 |
| `discount_type` TEXT             | `percentage` atau `fixed` |
| `discount_value` NUMERIC         | Persentase atau nominal   |
| `min_purchase` NUMERIC, nullable | Minimum transaksi         |
| `max_discount` NUMERIC, nullable | Batas diskon              |
| `usage_limit` INTEGER, nullable  | Batas penggunaan          |
| `starts_at` TIMESTAMPTZ          | Mulai berlaku             |
| `expires_at` TIMESTAMPTZ         | Akhir berlaku             |
| `is_active` BOOLEAN              | Status aktif              |
| `created_at`                     | Waktu pembuatan           |

### 9.12 Tabel `coupon_redemptions`

Mencatat penggunaan promosi per pesanan agar batas penggunaan dan penerapan diskon dapat diaudit.

Kolom awal: `id`, `coupon_id`, `user_id`, `order_id`, `discount_amount`, dan `created_at`. Constraint serta kebijakan pemakaian ulang ditentukan berdasarkan aturan promo final.

### 9.13 Tabel `payment_webhook_events`

Direkomendasikan untuk menyimpan identitas event/notifikasi yang telah diproses, hasil verifikasi, waktu pemrosesan, dan referensi pembayaran terkait.

Tujuannya adalah mendukung idempotensi dan investigasi jika notifikasi dikirim ulang.

### 9.14 Relasi Data Utama

- Satu profil memiliki banyak alamat dan pesanan.
- Satu kategori memiliki banyak produk.
- Satu produk mempunyai banyak gambar, item pesanan, ulasan, dan entri wishlist.
- Satu pesanan mempunyai banyak item pesanan dan dapat memiliki beberapa percobaan pembayaran.
- Satu kode promo dapat digunakan oleh banyak pesanan sesuai batas yang berlaku.
- Satu ulasan harus berkaitan dengan produk serta item pembelian yang memenuhi ketentuan.

---

## 10. Integrasi Pembayaran Midtrans

### 10.1 Metode Integrasi

Gunakan Midtrans Snap sebagai rancangan awal karena menyediakan antarmuka pembayaran yang dapat dibuka melalui popup atau halaman redirect. Pilihan presentasi final mengikuti kebutuhan UI/UX.

### 10.2 Alur Teknis Pembayaran

1. Pelanggan menyelesaikan formulir checkout.
2. Server memvalidasi session, data penerima, item, harga, stok, dan promosi.
3. Server menghitung ulang semua komponen biaya.
4. Sistem membuat pesanan dan catatan percobaan pembayaran.
5. Server mengirim permintaan pembuatan transaksi Snap menggunakan Server Key.
6. Token atau URL pembayaran dikirim ke frontend sesuai kebutuhan integrasi.
7. Pelanggan menyelesaikan pembayaran melalui Midtrans.
8. Midtrans mengirim notifikasi ke endpoint webhook server.
9. Server memvalidasi autentisitas notifikasi atau memeriksa status transaksi melalui API status Midtrans.
10. Server memperbarui status pembayaran dan pesanan secara aman.
11. Halaman pesanan menampilkan status yang sudah diverifikasi.

### 10.3 Aturan Keamanan Pembayaran

- Server Key Midtrans hanya boleh berada di lingkungan server.
- Client Key dapat digunakan pada sisi frontend sesuai dokumentasi Midtrans.
- Nilai total transaksi tidak boleh dipercaya jika berasal dari browser.
- Status sukses dari callback frontend tidak cukup untuk menandai pesanan sebagai lunas.
- Notifikasi harus diverifikasi menggunakan mekanisme yang disediakan Midtrans.
- Penanganan webhook harus idempoten; notifikasi yang sama tidak boleh menggandakan pengurangan stok atau penggunaan kupon.
- Endpoint notifikasi harus menggunakan HTTPS pada lingkungan produksi.
- Catat hasil verifikasi dan perubahan status untuk mendukung audit.
- Jangan menyimpan data pembayaran sensitif yang tidak diperlukan.

Referensi: [Midtrans Snap Integration Guide](https://docs.midtrans.com/docs/snap-snap-integration-guide), [Midtrans HTTP(S) Notifications](https://docs.midtrans.com/docs/https-notification-webhooks), [Midtrans Transaction Status](https://docs.midtrans.com/reference/transaction-status).

### 10.4 Pemetaan Status Pembayaran

| Status Midtrans  | Makna                               | Penanganan website                             |
| ---------------- | ----------------------------------- | ---------------------------------------------- |
| `pending`        | Menunggu pembayaran                 | Pesanan menunggu pembayaran                    |
| `capture`        | Pembayaran kartu berhasil ditangkap | Dapat dianggap berhasil setelah verifikasi     |
| `settlement`     | Pembayaran berhasil diselesaikan    | Tandai pembayaran berhasil                     |
| `deny`           | Pembayaran ditolak                  | Tandai gagal atau ditolak                      |
| `expire`         | Masa pembayaran berakhir            | Tandai kedaluwarsa                             |
| `cancel`         | Transaksi dibatalkan                | Tandai dibatalkan                              |
| `failure`        | Terjadi kegagalan pemrosesan        | Tandai gagal sesuai hasil verifikasi           |
| `refund`         | Pengembalian dana tercatat          | Tandai sesuai status refund yang terverifikasi |
| `partial_refund` | Sebagian dana dikembalikan          | Catat status dan nominal pengembalian          |

Pemetaan akhir harus mempertimbangkan tipe pembayaran dan alur status transaksi Midtrans.

### 10.5 Pemisahan Status Pesanan dan Pembayaran

Status pembayaran tidak boleh disamakan dengan status pemenuhan pesanan.

**Status pembayaran** misalnya: `pending`, `paid`, `failed`, `expired`, `refunded`.

**Status pesanan** misalnya: `pending_payment`, `processing`, `shipped`, `completed`, `cancelled`.

Status operasional seperti `shipped` diperbarui oleh admin karena integrasi kurir otomatis belum termasuk dalam ruang lingkup.

### 10.6 Pengelolaan Stok

Server harus memeriksa ketersediaan stok secara atomik agar dua transaksi yang berlangsung bersamaan tidak menjual stok yang sama secara berlebihan.

Strategi reservasi atau pengurangan stok dan pemulihan stok pada transaksi kedaluwarsa atau dibatalkan harus ditentukan dan diuji sebagai bagian implementasi checkout.

### 10.7 Lingkungan Pengujian

- Gunakan kredensial dan endpoint Sandbox untuk pengembangan serta pengujian.
- Uji pembayaran berhasil, pending, ditolak, kedaluwarsa, notifikasi berulang, dan gangguan jaringan.
- Gunakan kredensial Production hanya setelah konfigurasi, keamanan, dan pengujian penerimaan terpenuhi.

---

## 11. Keamanan dan Hak Akses Supabase

### 11.1 Autentikasi

Supabase Auth menangani identitas dan session pengguna. Integrasi Next.js menggunakan mekanisme session yang sesuai untuk rendering server dan browser.

### 11.2 Row Level Security (RLS)

RLS harus diaktifkan dan kebijakannya diuji untuk tabel yang dapat diakses melalui API database.

Prinsip kebijakan:

- Pengunjung hanya dapat membaca data publik yang memang boleh dipublikasikan.
- Pelanggan hanya dapat membaca serta mengubah data miliknya sesuai kewenangan.
- Pelanggan tidak dapat mengubah harga, total pesanan, status pembayaran, atau role admin.
- Admin dapat mengakses operasi administratif yang diperbolehkan.
- Operasi server yang memerlukan hak istimewa harus dilindungi dan tidak diekspos ke browser.

Mengaktifkan RLS saja tidak cukup jika hak akses tabel masih terlalu luas; grants dan policies harus diperiksa bersama.

Referensi: [Supabase Server-Side Auth](https://supabase.com/docs/guides/auth/server-side), [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security).

### 11.3 Pengelolaan Secret

Variabel seperti Supabase Service Role Key dan Midtrans Server Key hanya disimpan dalam environment server. Secret tidak boleh memakai prefiks publik seperti `NEXT_PUBLIC_`.

### 11.4 Validasi dan Audit

- Validasi input di server menggunakan skema yang konsisten.
- Batasi operasi admin pada route dan operasi database.
- Gunakan constraint database untuk identifier yang harus unik.
- Catat perubahan penting pada status pesanan dan pembayaran.
- Hindari menampilkan detail internal atau secret pada pesan error kepada pengguna.

---

## 12. Kebutuhan Nonfungsional

### 12.1 Performa

- Katalog dan detail produk dioptimalkan untuk waktu pemuatan yang cepat.
- Gambar dioptimalkan dan disajikan dalam ukuran yang sesuai.
- Pengambilan data tidak memuat kolom atau relasi yang tidak diperlukan.
- Interaksi seperti tambah keranjang memberikan respons visual yang jelas.
- Sasaran performa web awal: LCP sampai dengan 2,5 detik pada persentil ke-75 untuk halaman utama dan halaman produk jika kondisi pengujian memungkinkan.

Target performa harus diukur dengan data lapangan dan disesuaikan berdasarkan hasil pengujian.

### 12.2 Responsivitas

Layout harus berfungsi pada desktop, tablet, dan mobile. Tidak boleh ada elemen checkout atau tombol penting yang terpotong pada ukuran layar yang didukung.

### 12.3 Keamanan

Aplikasi harus melindungi data pengguna, menerapkan otorisasi pada server dan database, menjaga secret, memvalidasi transaksi pembayaran, serta mencegah pengguna mengubah nilai pesanan melalui manipulasi browser.

### 12.4 Reliabilitas

Kegagalan koneksi atau notifikasi pembayaran tidak boleh langsung menyebabkan status pembayaran yang salah. Sistem harus dapat memproses notifikasi berulang dengan aman dan memiliki mekanisme pemeriksaan status ketika diperlukan.

### 12.5 Aksesibilitas

Formulir memiliki label yang jelas, navigasi keyboard memadai, kontras teks yang layak, dan pesan validasi yang dapat dipahami.

### 12.6 Maintainability

- Struktur kode dipisahkan berdasarkan domain fitur.
- Tipe data dan model transaksi didefinisikan secara konsisten.
- Perubahan skema database menggunakan migrasi yang dapat dilacak.
- Logika total pesanan dan promosi tidak diduplikasi dalam beberapa komponen UI.
- Aturan bisnis penting diuji secara otomatis.

---

## 13. Rancangan Struktur Proyek

Struktur awal yang disarankan:

```text
src/
  app/
    (store)/
      page.tsx
      products/
        page.tsx
        [slug]/
          page.tsx
      categories/
        [slug]/
          page.tsx
      cart/
        page.tsx
      checkout/
        page.tsx
      wishlist/
        page.tsx
      orders/
        page.tsx
        [id]/
          page.tsx
    (auth)/
      login/
        page.tsx
      register/
        page.tsx
    admin/
      page.tsx
      products/
        page.tsx
      categories/
        page.tsx
      orders/
        page.tsx
      promotions/
        page.tsx
    api/
      payments/
        midtrans/
          create/
            route.ts
          notification/
            route.ts
  components/
    layout/
    products/
    cart/
    checkout/
    orders/
    admin/
    ui/
  features/
    auth/
    products/
    cart/
    checkout/
    orders/
    wishlist/
    reviews/
    promotions/
  lib/
    supabase/
    midtrans/
    validations/
    utils/
  stores/
    cart-store.ts
  types/
  styles/
supabase/
  migrations/
  tests/
```

Struktur ini bersifat rekomendasi dan dapat disesuaikan dengan kebutuhan implementasi. Endpoint final harus menerapkan validasi session, input, otorisasi, dan penanganan error yang tepat.

---

## 14. Kriteria Penerimaan (Acceptance Criteria)

Fitur dinyatakan memenuhi persyaratan apabila kondisi berikut telah diuji dan terpenuhi.

### 14.1 Katalog dan Produk

- Pengunjung dapat membuka katalog dan detail produk yang dipublikasikan.
- Pencarian dan filter menghasilkan produk sesuai kriteria.
- Produk draft atau arsip tidak tampil sebagai produk aktif untuk pelanggan.
- Kondisi stok habis ditampilkan dengan jelas.

### 14.2 Auth dan Profil

- Pengguna dapat registrasi, login, dan logout.
- Pengguna yang tidak login tidak dapat membaca riwayat pesanan pribadi.
- Pelanggan tidak dapat mengakses dashboard admin.
- Pengguna tidak dapat mengubah role atau data profil pengguna lain.

### 14.3 Keranjang dan Checkout

- Produk dapat ditambahkan, diperbarui jumlahnya, dan dihapus dari keranjang.
- State keranjang tetap terjaga sesuai mekanisme persistensi yang dipilih.
- Total pada checkout dihitung kembali di server.
- Harga, stok, dan promosi yang berubah memicu validasi ulang sebelum pembayaran.
- Permintaan checkout yang diulang tidak menciptakan pembayaran ganda tanpa sengaja.

### 14.4 Pembayaran

- Server dapat membuat transaksi Midtrans dari pesanan yang valid.
- Server Key tidak terpapar pada browser.
- Callback frontend saja tidak dapat menandai transaksi sebagai lunas.
- Notifikasi yang lolos verifikasi memperbarui status dengan benar.
- Notifikasi yang dikirim ulang tidak menggandakan efek bisnis.
- Status pending, settlement/capture, deny, expire, cancel, dan kondisi error diuji.
- Percobaan pembayaran ulang menggunakan identifier transaksi unik.

### 14.5 Riwayat Pesanan

- Pelanggan hanya melihat pesanan miliknya sendiri.
- Snapshot item, harga, dan total lama tidak berubah saat data produk diperbarui.
- Perubahan status pembayaran tidak secara otomatis mengklaim pesanan telah dikirim.
- Admin dapat memperbarui status operasional sesuai kewenangannya.

### 14.6 Wishlist, Ulasan, dan Promosi

- Wishlist tersimpan per akun.
- Rating di luar rentang 1–5 ditolak.
- Ulasan hanya dapat dibuat oleh pengguna yang memenuhi persyaratan pembelian.
- Kode promo tidak dapat digunakan di luar masa berlaku atau melampaui batas yang ditetapkan.
- Perhitungan promo dilakukan atau diverifikasi pada server.

### 14.7 Dashboard Admin

- Admin dapat mengelola produk, kategori, stok, pesanan, dan promosi.
- Perubahan data tervalidasi sebelum disimpan.
- User tanpa role admin tidak dapat menjalankan operasi administratif melalui URL atau API secara langsung.

### 14.8 UI/UX dan Performa

- Halaman utama dan alur belanja dapat digunakan pada ukuran layar desktop dan mobile.
- Loading, error, dan empty state tersedia pada halaman yang memerlukan pengambilan data.
- Formulir menampilkan pesan validasi yang jelas.
- Pengujian performa awal dicatat dan dibandingkan dengan target proyek.

---

## 15. Tahapan Pengembangan

### Tahap 1 — Finalisasi Kebutuhan

- Konfirmasi identitas merek, kategori produk, dan aturan bisnis.
- Menentukan peraturan stok, pengiriman, pembatalan, dan promosi.
- Menyepakati user flow dan kriteria penerimaan.

**Output:** PRD final dan user flow.

### Tahap 2 — Desain UI/UX

- Membuat design system untuk warna, tipografi, komponen, dan layout.
- Merancang halaman landing, katalog, detail produk, keranjang, checkout, login, akun, pesanan, dan admin.
- Membuat desain responsif dan state antarmuka.

**Output:** Wireframe dan desain UI/UX.

### Tahap 3 — Fondasi Aplikasi

- Inisialisasi Next.js dan Tailwind CSS.
- Membangun struktur route dan komponen dasar.
- Menyiapkan Supabase, konfigurasi environment, autentikasi, serta migrasi database.
- Menerapkan RLS dan pengujian kebijakan akses awal.

**Output:** Fondasi proyek dan database awal.

### Tahap 4 — Katalog dan Keranjang

- Implementasi produk, kategori, detail produk, pencarian, dan filter.
- Membuat Zustand cart store.
- Menambahkan validasi stok serta sinkronisasi ulang ketika checkout.

**Output:** Alur penelusuran produk dan keranjang.

### Tahap 5 — Checkout dan Pembayaran

- Implementasi validasi checkout pada server.
- Membuat pesanan dan snapshot item.
- Integrasi Midtrans Sandbox.
- Membuat webhook, verifikasi status, penanganan idempotensi, dan mekanisme pengujian transaksi.

**Output:** Alur checkout dan pembayaran yang dapat diuji dari awal hingga akhir.

### Tahap 6 — Fitur Pelanggan

- Wishlist.
- Riwayat dan detail pesanan.
- Rating dan ulasan.
- Promosi dan kode diskon.
- Pengelolaan profil.

**Output:** Seluruh fitur pelanggan yang termasuk dalam ruang lingkup.

### Tahap 7 — Dashboard Admin

- CRUD produk dan kategori.
- Pengelolaan stok.
- Pengelolaan pesanan dan status operasional.
- Pengelolaan promosi.

**Output:** Dashboard operasional admin.

### Tahap 8 — Pengujian dan Peluncuran

- Pengujian unit untuk kalkulasi dan aturan bisnis.
- Pengujian integrasi database, autentikasi, dan pembayaran.
- Pengujian akses RLS dan otorisasi admin.
- Pengujian UI responsif dan alur checkout.
- Konfigurasi domain, HTTPS, environment produksi, dan Midtrans Production setelah pengujian Sandbox dinyatakan berhasil.

**Output:** Website yang siap diluncurkan sesuai kriteria penerimaan.

---

## 16. Risiko dan Mitigasi

| Risiko                              | Mitigasi                                                |
| ----------------------------------- | ------------------------------------------------------- |
| Harga dimanipulasi dari browser     | Semua total dihitung ulang oleh server                  |
| Status pembayaran palsu             | Verifikasi notifikasi atau status melalui Midtrans      |
| Notifikasi datang berulang          | Pemrosesan webhook idempoten                            |
| Stok terjual berlebihan             | Validasi atomik dan strategi reservasi stok             |
| Data pesanan bocor antar pengguna   | RLS dan validasi otorisasi                              |
| Pengguna biasa mengakses admin      | Pemeriksaan role pada server dan database               |
| Promo disalahgunakan                | Validasi batas, masa berlaku, dan pencatatan redemption |
| Harga transaksi lama berubah        | Snapshot harga dan item pada pesanan                    |
| Session atau state UI tidak sinkron | Validasi ulang data pada operasi server                 |

---

## 17. Keputusan Bisnis yang Masih Perlu Ditetapkan

Bagian ini sengaja dibiarkan terbuka agar PRD tidak menetapkan kebijakan bisnis yang belum dipilih.

1. **Identitas toko:** Nama merek, logo, warna utama, dan domain.
2. **Produk:** Kategori awal, struktur harga, foto, dan apakah varian produk seperti ukuran atau warna diperlukan.
3. **Pengiriman:** Wilayah layanan, metode pengiriman, rumus biaya, serta apakah biaya berupa tarif tetap atau dihitung dari layanan eksternal.
4. **Kebijakan stok:** Kapan stok direservasi atau dikurangi dan kapan stok dipulihkan setelah transaksi gagal.
5. **Promosi:** Tipe promo yang benar-benar akan digunakan, batas pemakaian per akun, dan aturan penggabungan diskon.
6. **Pembatalan dan refund:** Ketentuan pembatalan pesanan serta proses refund manual atau otomatis yang akan didukung.
7. **Ulasan:** Apakah ulasan langsung dipublikasikan atau memerlukan moderasi.
8. **Autentikasi:** Apakah konfirmasi email diwajibkan dan apakah fitur reset kata sandi disediakan pada versi pertama.
9. **Admin:** Jumlah role admin yang diperlukan dan apakah ada pembagian kewenangan antara pengelola produk dan pengelola pesanan.

Keputusan tersebut dapat dikunci sebelum implementasi pada bagian yang terkait. Hal-hal di atas bukan penambahan fitur wajib di luar cakupan yang telah disepakati.

---

## 18. Definisi Selesai (Definition of Done)

Website dinyatakan siap untuk peluncuran awal ketika:

- Seluruh fitur dalam ruang lingkup telah diimplementasikan.
- Kriteria penerimaan setiap fitur lulus pengujian.
- Integrasi Supabase Auth dan RLS telah diuji.
- Perhitungan pesanan dilakukan dengan benar pada server.
- Integrasi Midtrans lulus skenario Sandbox yang relevan.
- Akses dashboard admin telah dibatasi secara benar.
- Antarmuka utama responsif dan memiliki penanganan loading serta error.
- Konfigurasi produksi, secret, HTTPS, dan endpoint notifikasi telah diperiksa.
- Dokumentasi struktur database, konfigurasi, dan alur deployment tersedia.

## 19. Referensi Teknis Resmi

- Next.js App Router: https://nextjs.org/docs/app
- Next.js Route Handlers: https://nextjs.org/docs/app/getting-started/route-handlers
- Supabase Auth untuk Next.js: https://supabase.com/docs/guides/auth/quickstarts/nextjs
- Supabase Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase Storage: https://supabase.com/docs/guides/storage
- Midtrans Snap Integration: https://docs.midtrans.com/docs/snap-snap-integration-guide
- Midtrans HTTP(S) Notifications: https://docs.midtrans.com/docs/https-notification-webhooks
- Midtrans Transaction Status: https://docs.midtrans.com/reference/transaction-status

---

**Akhir Dokumen PRD — Website E-Commerce Premium, Versi 1.0**

- referensi gambar dari foto:
  ![alt text](<Screenshot 2026-10-22 215207.png>)
  ![alt text](<Screenshot 2026-10-22 215232.png>)
