'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  User,
  Package,
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  CreditCard,
  QrCode,
  Building2,
  Copy,
  Check,
  Eye,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Heart,
  ChevronRight,
  X
} from 'lucide-react';
import { useOrdersStore, DetailedOrder } from '@/stores/orders-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { useCartStore } from '@/stores/cart-store';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'wishlist'>('orders');
  
  // Persistent orders & wishlist
  const { orders } = useOrdersStore();
  const { items: wishlistItems, toggleWishlist } = useWishlistStore();
  const { addItem, openCart } = useCartStore();

  // Selected Order for Detail Modal
  const [selectedOrder, setSelectedOrder] = useState<DetailedOrder | null>(null);
  const [copiedResi, setCopiedResi] = useState(false);

  // Profile Form State
  const [profile, setProfile] = useState({
    name: 'Rama Aditya',
    email: 'rama@gmail.com',
    phone: '081298765432',
    recipientName: 'Rama Aditya',
    addressLine: 'Jl. Senopati No. 45, Kebayoran Baru',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    postalCode: '12190',
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const copyResi = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedResi(true);
    setTimeout(() => setCopiedResi(false), 2000);
  };

  // Helper payment badge
  const renderPaymentBadge = (order: DetailedOrder) => {
    const isSettled = order.paymentStatus === 'settlement';
    return (
      <div className="space-y-1">
        <span
          className={
            'px-2.5 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center space-x-1 ' +
            (isSettled ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800')
          }
        >
          {isSettled ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
          <span>{isSettled ? 'Lunas / Settlement (Midtrans)' : 'Menunggu Pembayaran'}</span>
        </span>
        <div className="text-xs text-[#70655B] font-medium flex items-center space-x-1.5 pt-0.5">
          {order.paymentMethod.includes('QRIS') && <QrCode className="w-3.5 h-3.5 text-[#8A6B4F]" />}
          {(order.paymentMethod.includes('BCA') || order.paymentMethod.includes('VA') || order.paymentMethod.includes('Mandiri')) && (
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
          )}
          {order.paymentMethod.includes('Kartu Kredit') && <CreditCard className="w-3.5 h-3.5 text-purple-600" />}
          <span>{order.paymentMethod}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col font-sans text-[#1E1A17]">
      {/* Top Header */}
      <header className="bg-white border-b border-[#E3DBD0] sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-[#1E1A17] group">
            <span className="text-xl font-serif text-[#8A6B4F]">✻</span>
            <span className="text-2xl font-serif tracking-wide font-normal">Ramille</span>
          </Link>

          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#70655B] hover:text-[#1E1A17] bg-[#FAF7F2] border border-[#E3DBD0] px-4 py-2 rounded-full transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali Berbelanja</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Account Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        {/* Profile Header Banner */}
        <div className="bg-[#EDE7DE] rounded-3xl p-6 sm:p-8 border border-[#D8CFC3] shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-[#1E1A17] text-white flex items-center justify-center text-xl font-serif font-bold shadow-xs">
                {profile.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-serif font-bold text-[#1E1A17]">{profile.name}</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1E1A17] text-white tracking-wider uppercase">
                    Member Ramille
                  </span>
                </div>
                <p className="text-xs text-[#70655B] mt-0.5">{profile.email} • {profile.phone}</p>
                <p className="text-[11px] text-[#8A6B4F] mt-1 font-medium">
                  📍 Alamat Utama: {profile.city}, {profile.province}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center space-x-4 border-t sm:border-t-0 sm:border-l border-[#D8CFC3] pt-4 sm:pt-0 sm:pl-6">
              <div className="text-center sm:text-left">
                <span className="text-xs text-[#70655B] block">Total Pesanan</span>
                <span className="text-xl font-bold font-serif text-[#1E1A17]">{orders.length}</span>
              </div>
              <div className="text-center sm:text-left pl-4 border-l border-[#D8CFC3]">
                <span className="text-xs text-[#70655B] block">Wishlist</span>
                <span className="text-xl font-bold font-serif text-[#1E1A17]">{wishlistItems.length}</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-2 mt-8 pt-4 border-t border-[#D8CFC3]/70 overflow-x-auto">
            <button
              onClick={() => setActiveTab('orders')}
              className={
                'px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center space-x-2 ' +
                (activeTab === 'orders'
                  ? 'bg-[#1E1A17] text-white shadow-xs'
                  : 'bg-white/80 text-[#70655B] hover:bg-white hover:text-[#1E1A17]')
              }
            >
              <Package className="w-3.5 h-3.5" />
              <span>Pesanan & Pelacakan Saya ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={
                'px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center space-x-2 ' +
                (activeTab === 'profile'
                  ? 'bg-[#1E1A17] text-white shadow-xs'
                  : 'bg-white/80 text-[#70655B] hover:bg-white hover:text-[#1E1A17]')
              }
            >
              <User className="w-3.5 h-3.5" />
              <span>Profil & Alamat Pengiriman</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={
                'px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center space-x-2 ' +
                (activeTab === 'wishlist'
                  ? 'bg-[#1E1A17] text-white shadow-xs'
                  : 'bg-white/80 text-[#70655B] hover:bg-white hover:text-[#1E1A17]')
              }
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Wishlist Saya ({wishlistItems.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: ORDERS & TRACKING */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-serif text-[#1E1A17]">Status & Pelacakan Pesanan Anda</h2>
                <p className="text-xs text-[#70655B] mt-0.5">
                  Pantau posisi paket, status pembayaran Midtrans, dan nomor resi kurir pengiriman secara real-time.
                </p>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E3DBD0] space-y-4">
                <Package className="w-12 h-12 text-[#A89C8F] mx-auto" />
                <h3 className="text-lg font-serif">Belum Ada Riwayat Pesanan</h3>
                <p className="text-xs text-[#70655B]">Koleksi fashion linen dan skincare Ramille siap menemani gaya hidup Anda.</p>
                <Link
                  href="/"
                  className="inline-block px-6 py-2.5 bg-[#1E1A17] text-white text-xs font-medium rounded-full"
                >
                  Mulai Belanja
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => {
                  const isShipped = order.orderStatus === 'shipped';
                  const isCompleted = order.orderStatus === 'completed';

                  return (
                    <div
                      key={order.id}
                      className="bg-white rounded-3xl border border-[#E3DBD0] p-6 sm:p-7 shadow-xs space-y-6"
                    >
                      {/* Order Card Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3DBD0] gap-3">
                        <div className="flex items-center space-x-3">
                          <span className="font-mono font-bold text-base text-[#1E1A17]">{order.id}</span>
                          <span className="text-xs text-[#70655B]">Dipesan pada {order.createdAt}</span>
                        </div>

                        {/* Status Badges */}
                        <div className="flex items-center space-x-2">
                          <span
                            className={
                              'px-3 py-1 rounded-full text-xs font-semibold capitalize inline-flex items-center space-x-1.5 ' +
                              (isShipped
                                ? 'bg-blue-100 text-blue-800'
                                : isCompleted
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-[#EDE7DE] text-[#1E1A17]')
                            }
                          >
                            {isShipped && <Truck className="w-3.5 h-3.5" />}
                            {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                            <span>
                              {isShipped ? 'Sedang Dikirim (Dalam Perjalanan)' : isCompleted ? 'Pesanan Selesai' : 'Sedang Diproses'}
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* REAL-TIME LOCATION BANNER (Where is my package right now?) */}
                      <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#E3DBD0] space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center space-x-2 text-xs font-bold text-[#8A6B4F]">
                            <Truck className="w-4 h-4" />
                            <span>{order.courier}</span>
                            <span className="text-[#A89C8F]">•</span>
                            <span className="font-mono text-[#1E1A17]">{order.trackingNumber}</span>
                            <button
                              onClick={() => copyResi(order.trackingNumber)}
                              className="p-1 text-[#70655B] hover:text-[#1E1A17] transition-colors"
                              title="Salin Nomor Resi"
                            >
                              {copiedResi ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </div>

                          <div className="text-xs text-[#70655B]">
                            Estimasi Sampai: <strong className="text-[#1E1A17]">{order.estimatedArrival}</strong>
                          </div>
                        </div>

                        {/* Current Location Highlight */}
                        <div className="bg-white p-3.5 rounded-xl border border-[#E3DBD0] flex items-start space-x-3">
                          <MapPin className="w-5 h-5 text-rose-600 shrink-0 mt-0.5 animate-bounce" />
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A6B4F] block">
                              POSISI PAKET TERKINI
                            </span>
                            <p className="text-xs sm:text-sm font-semibold text-[#1E1A17] mt-0.5 leading-relaxed">
                              {order.currentLocation}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Items Purchased Preview */}
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-20 object-cover rounded-xl bg-[#FAF7F2] border border-[#E3DBD0] shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-[#1E1A17] truncate">{item.name}</h4>
                              <p className="text-xs text-[#70655B] mt-0.5">{item.category}</p>
                              <span className="text-xs text-[#70655B]">Jumlah: {item.quantity} x Rp {item.price.toLocaleString('id-ID')}</span>
                            </div>
                            <span className="text-sm font-bold text-[#1E1A17]">
                              {'Rp ' + (item.price * item.quantity).toLocaleString('id-ID')}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer & Action */}
                      <div className="pt-4 border-t border-[#E3DBD0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          {renderPaymentBadge(order)}
                          <div className="text-xs text-[#70655B] mt-1">
                            Total Bayar: <span className="font-bold text-sm text-[#1E1A17]">Rp {order.total.toLocaleString('id-ID')}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-6 py-3 rounded-full bg-[#1E1A17] hover:bg-[#332D28] text-white text-xs font-semibold tracking-wide flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Lacak Perjalanan & Detail Lengkap</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PROFILE & SHIPPING ADDRESS */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl border border-[#E3DBD0] p-6 sm:p-10 shadow-xs max-w-2xl mx-auto">
            <h2 className="text-2xl font-serif text-[#1E1A17] mb-1">Informasi Profil & Alamat</h2>
            <p className="text-xs text-[#70655B] mb-6">
              Kelola data diri dan alamat utama pengiriman untuk kemudahan checkout otomatis.
            </p>

            {saveSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Perubahan profil dan alamat Anda berhasil disimpan!</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-[#1E1A17] block mb-1.5">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E3DBD0] text-xs sm:text-sm text-[#1E1A17] outline-hidden focus:border-[#8A6B4F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#1E1A17] block mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E3DBD0] text-xs sm:text-sm text-[#1E1A17] outline-hidden focus:border-[#8A6B4F]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1E1A17] block mb-1.5">Nomor WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E3DBD0] text-xs sm:text-sm text-[#1E1A17] outline-hidden focus:border-[#8A6B4F]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E3DBD0]">
                <h3 className="text-sm font-serif font-bold text-[#1E1A17] mb-3">Alamat Pengiriman Utama</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-[#1E1A17] block mb-1.5">Alamat Jalan & No Rumah</label>
                    <textarea
                      rows={2}
                      required
                      value={profile.addressLine}
                      onChange={(e) => setProfile({ ...profile, addressLine: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E3DBD0] text-xs sm:text-sm text-[#1E1A17] outline-hidden focus:border-[#8A6B4F]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[#1E1A17] block mb-1.5">Kota / Kab</label>
                      <input
                        type="text"
                        required
                        value={profile.city}
                        onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E3DBD0] text-xs sm:text-sm text-[#1E1A17] outline-hidden focus:border-[#8A6B4F]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#1E1A17] block mb-1.5">Provinsi</label>
                      <input
                        type="text"
                        required
                        value={profile.province}
                        onChange={(e) => setProfile({ ...profile, province: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E3DBD0] text-xs sm:text-sm text-[#1E1A17] outline-hidden focus:border-[#8A6B4F]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#1E1A17] block mb-1.5">Kode Pos</label>
                      <input
                        type="text"
                        required
                        value={profile.postalCode}
                        onChange={(e) => setProfile({ ...profile, postalCode: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E3DBD0] text-xs sm:text-sm text-[#1E1A17] outline-hidden focus:border-[#8A6B4F]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#1E1A17] hover:bg-[#332D28] text-white text-xs font-semibold tracking-wide transition-all shadow-md cursor-pointer mt-4"
              >
                Simpan Perubahan
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif text-[#1E1A17]">Wishlist Produk Disimpan ({wishlistItems.length})</h2>
            
            {wishlistItems.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E3DBD0] space-y-4">
                <Heart className="w-12 h-12 text-[#A89C8F] mx-auto" />
                <h3 className="text-lg font-serif">Belum Ada Produk di Wishlist</h3>
                <p className="text-xs text-[#70655B]">Tandai produk kesukaan Anda dengan mengklik ikon hati di katalog.</p>
                <Link
                  href="/"
                  className="inline-block px-6 py-2.5 bg-[#1E1A17] text-white text-xs font-medium rounded-full"
                >
                  Jelajahi Koleksi
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((prod) => (
                  <div key={prod.id} className="bg-white rounded-2xl border border-[#E3DBD0] p-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <img src={prod.images[0]} alt={prod.name} className="w-full aspect-4/5 object-cover rounded-xl bg-[#FAF7F2]" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#8A6B4F]">{prod.category}</span>
                        <h4 className="text-sm font-serif font-semibold text-[#1E1A17] mt-0.5">{prod.name}</h4>
                        <p className="text-sm font-bold text-[#1E1A17] mt-1">Rp {prod.price.toLocaleString('id-ID')}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4 pt-3 border-t border-[#E3DBD0]">
                      <button
                        onClick={() => {
                          addItem(prod, 1);
                          openCart();
                        }}
                        className="flex-1 py-2 px-3 rounded-full bg-[#1E1A17] text-white text-xs font-medium flex items-center justify-center space-x-1"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Beli Sekarang</span>
                      </button>
                      <button
                        onClick={() => toggleWishlist(prod)}
                        className="p-2 rounded-full border border-[#E3DBD0] text-[#70655B] hover:text-rose-600"
                        title="Hapus dari Wishlist"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* MODAL DETAIL PESANAN & LIVE TRACKING LENGKAP */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div onClick={() => setSelectedOrder(null)} className="fixed inset-0 bg-black/50 backdrop-blur-xs" />

          <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E3DBD0] overflow-hidden my-8">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-[#E3DBD0] flex items-center justify-between bg-white">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-serif text-[#8A6B4F]">✻</span>
                <div>
                  <h3 className="text-lg font-serif text-[#1E1A17]">
                    Pelacakan & Detail Pesanan: {selectedOrder.id}
                  </h3>
                  <span className="text-xs text-[#70655B]">Dipesan pada {selectedOrder.createdAt}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-full hover:bg-[#EDE7DE] text-[#70655B] hover:text-[#1E1A17] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Live Location Alert Box */}
              <div className="bg-[#EDE7DE] p-5 rounded-2xl border border-[#D8CFC3] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-5 h-5 text-[#8A6B4F]" />
                    <span className="font-serif font-bold text-sm text-[#1E1A17]">
                      {selectedOrder.courier}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs text-[#70655B]">No. Resi:</span>
                    <span className="font-mono text-xs font-semibold text-[#1E1A17]">
                      {selectedOrder.trackingNumber}
                    </span>
                    <button
                      onClick={() => copyResi(selectedOrder.trackingNumber)}
                      className="p-1 text-[#70655B] hover:text-[#1E1A17] transition-colors"
                      title="Salin Resi"
                    >
                      {copiedResi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="bg-white/90 p-4 rounded-xl text-xs space-y-1">
                  <div className="flex items-start space-x-2.5">
                    <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5 animate-bounce" />
                    <div>
                      <span className="font-bold text-[#1E1A17]">Posisi Paket Terkini:</span>
                      <p className="text-[#70655B] mt-0.5 leading-relaxed font-medium">
                        {selectedOrder.currentLocation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* TIMELINE STEPPER (Udah sampai mana & di mana) */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1A17] mb-3">
                  Status Perjalanan Paket (Live Tracking Log)
                </h4>

                <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E3DBD0]">
                  {selectedOrder.trackingHistory.map((step, idx) => (
                    <div key={idx} className="relative">
                      {/* Checkpoint bullet */}
                      <div
                        className={
                          'absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ' +
                          (step.completed
                            ? 'bg-[#1E1A17] text-white'
                            : step.current
                            ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                            : 'bg-[#E3DBD0] text-transparent')
                        }
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-[#E3DBD0]">
                        <div className="flex items-baseline justify-between">
                          <span className={'text-xs font-bold ' + (step.current ? 'text-blue-700' : 'text-[#1E1A17]')}>
                            {step.title}
                          </span>
                          <span className="text-[10px] text-[#70655B]">{step.timestamp}</span>
                        </div>
                        <p className="text-xs text-[#70655B] mt-1 leading-relaxed">{step.description}</p>
                        <span className="text-[11px] text-[#8A6B4F] font-semibold block mt-1.5">
                          📍 Lokasi: {step.location}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PAYMENT DETAILS (Midtrans) */}
              <div className="bg-white p-5 rounded-2xl border border-[#E3DBD0] space-y-3">
                <div className="flex items-center justify-between border-b border-[#E3DBD0] pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E1A17]">
                    Rincian Pembayaran
                  </span>
                  <span
                    className={
                      'px-2.5 py-0.5 rounded-full text-[10px] font-bold ' +
                      (selectedOrder.paymentStatus === 'settlement'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800')
                    }
                  >
                    {selectedOrder.paymentStatus === 'settlement' ? 'LUNAS (SETTLEMENT)' : 'PENDING'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#70655B] block">Metode Pembayaran:</span>
                    <span className="font-semibold text-[#1E1A17]">{selectedOrder.paymentMethod}</span>
                    {selectedOrder.paymentDetails && (
                      <span className="text-[11px] text-[#8A6B4F] font-mono block mt-0.5">
                        {selectedOrder.paymentDetails}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-[#70655B] block">Waktu Pembayaran:</span>
                    <span className="font-semibold text-[#1E1A17]">{selectedOrder.paymentDate}</span>
                  </div>
                </div>
              </div>

              {/* PRODUCTS LIST */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1A17] mb-2.5">
                  Rincian Produk Pesanan
                </h4>
                <div className="bg-white rounded-xl border border-[#E3DBD0] divide-y divide-[#E3DBD0]/60 p-3">
                  {selectedOrder.items.map((it, i) => (
                    <div key={i} className="py-2.5 first:pt-0 last:pb-0 flex items-center space-x-3">
                      <img src={it.image} alt={it.name} className="w-12 h-14 object-cover rounded-lg bg-[#FAF7F2]" />
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-xs text-[#1E1A17] block truncate">{it.name}</span>
                        <span className="text-[11px] text-[#70655B]">{it.quantity} x Rp {it.price.toLocaleString('id-ID')}</span>
                      </div>
                      <span className="font-bold text-xs text-[#1E1A17]">
                        {'Rp ' + (it.price * it.quantity).toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DESTINATION ADDRESS */}
              <div className="bg-white p-4 rounded-xl border border-[#E3DBD0] text-xs space-y-1">
                <span className="font-bold text-[#1E1A17] block">Tujuan Pengiriman:</span>
                <p className="text-[#70655B]">
                  <strong className="text-[#1E1A17]">{selectedOrder.shippingAddress.recipientName}</strong> ({selectedOrder.shippingAddress.phone})<br />
                  {selectedOrder.shippingAddress.addressLine}, {selectedOrder.shippingAddress.city} {selectedOrder.shippingAddress.postalCode}
                </p>
              </div>

              {/* BILL SUMMARY */}
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E3DBD0] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#70655B]">
                  <span>Subtotal Produk</span>
                  <span>{'Rp ' + selectedOrder.subtotal.toLocaleString('id-ID')}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Potongan Diskon</span>
                    <span>{'- Rp ' + selectedOrder.discount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#70655B]">
                  <span>Biaya Pengiriman</span>
                  <span>{selectedOrder.shippingFee === 0 ? 'GRATIS' : 'Rp ' + selectedOrder.shippingFee.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#1E1A17] pt-2 border-t border-[#E3DBD0]">
                  <span>Total Transaksi</span>
                  <span className="text-[#8A6B4F]">{'Rp ' + selectedOrder.total.toLocaleString('id-ID')}</span>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#E3DBD0] bg-white flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2.5 rounded-full bg-[#1E1A17] hover:bg-[#332D28] text-white text-xs font-semibold cursor-pointer"
              >
                Tutup Pelacakan
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
