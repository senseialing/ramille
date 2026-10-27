'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  ArrowLeft,
  Plus,
  CheckCircle2,
  Clock,
  Truck,
  TrendingUp,
  DollarSign,
  Users,
  AlertCircle,
  Eye,
  Trash2,
  Edit,
  X,
  CreditCard,
  QrCode,
  Building2,
  MapPin,
  FileText,
  Copy,
  Check
} from 'lucide-react';
import { PRODUCTS, AVAILABLE_COUPONS } from '@/data/products';
import { Product } from '@/types';
import { useOrdersStore, DetailedOrder } from '@/stores/orders-store';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'coupons'>('overview');
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [couponsList, setCouponsList] = useState(AVAILABLE_COUPONS);

  // Zustand persistent orders
  const { orders: ordersList, updateOrderStatus } = useOrdersStore();

  // Selected Order for Tracking & Detail Modal
  const [selectedOrder, setSelectedOrder] = useState<DetailedOrder | null>(null);
  const [copiedResi, setCopiedResi] = useState(false);

  // New Product Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'Apparel & Linen',
    price: 500000,
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    description: '',
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Product = {
      id: 'prod-' + (productsList.length + 1),
      name: newProd.name,
      slug: newProd.name.toLowerCase().replace(/\s+/g, '-'),
      category: newProd.category,
      categorySlug: newProd.category.toLowerCase().replace(/\s+/g, '-'),
      price: Number(newProd.price),
      stock: Number(newProd.stock),
      description: newProd.description || 'Koleksi istimewa dari Ramille Atelier.',
      images: [newProd.imageUrl],
      rating: 5.0,
      reviewCount: 0,
      isFeatured: true,
      badge: 'New Item',
    };

    setProductsList([created, ...productsList]);
    setIsAddModalOpen(false);
    setNewProd({
      name: '',
      category: 'Apparel & Linen',
      price: 500000,
      stock: 20,
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      description: '',
    });
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Yakin ingin menghapus produk ini dari katalog?')) {
      setProductsList(productsList.filter((p) => p.id !== id));
    }
  };

  const copyTracking = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedResi(true);
    setTimeout(() => setCopiedResi(false), 2000);
  };

  const totalRevenue = ordersList
    .filter((o) => o.paymentStatus === 'settlement')
    .reduce((sum, o) => sum + o.total, 0);

  // Helper payment icon & label
  const renderPaymentMethodBadge = (method: string) => {
    if (method.includes('QRIS')) {
      return (
        <span className="inline-flex items-center space-x-1 text-[11px] font-medium text-[#70655B] bg-[#FAF7F2] border border-[#E3DBD0] px-2 py-0.5 rounded-md mt-1">
          <QrCode className="w-3 h-3 text-[#8A6B4F]" />
          <span>{method}</span>
        </span>
      );
    }
    if (method.includes('BCA') || method.includes('VA') || method.includes('Mandiri')) {
      return (
        <span className="inline-flex items-center space-x-1 text-[11px] font-medium text-[#70655B] bg-[#FAF7F2] border border-[#E3DBD0] px-2 py-0.5 rounded-md mt-1">
          <Building2 className="w-3 h-3 text-blue-600" />
          <span>{method}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 text-[11px] font-medium text-[#70655B] bg-[#FAF7F2] border border-[#E3DBD0] px-2 py-0.5 rounded-md mt-1">
        <CreditCard className="w-3 h-3 text-purple-600" />
        <span>{method}</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F4EFEA] flex flex-col font-sans">
      {/* Admin Top Navigation */}
      <header className="bg-white border-b border-[#E3DBD0] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-serif text-[#8A6B4F]">✻</span>
            <span className="text-xl font-serif font-semibold text-[#1E1A17]">Ramille</span>
            <span className="bg-[#1E1A17] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wider uppercase">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/account"
              className="text-xs font-semibold text-[#8A6B4F] hover:underline px-3 py-1.5"
            >
              Halaman Akun Pelanggan →
            </Link>
            <Link
              href="/"
              className="flex items-center space-x-2 text-xs font-semibold text-[#70655B] hover:text-[#1E1A17] transition-colors bg-[#FAF7F2] border border-[#E3DBD0] px-4 py-2 rounded-full cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Lihat Website Toko</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 space-y-2 shrink-0">
          <nav className="bg-white rounded-2xl border border-[#E3DBD0] p-3 space-y-1 shadow-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={
                'w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ' +
                (activeTab === 'overview'
                  ? 'bg-[#1E1A17] text-white shadow-xs'
                  : 'text-[#70655B] hover:bg-[#FAF7F2] hover:text-[#1E1A17]')
              }
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Ringkasan Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={
                'w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ' +
                (activeTab === 'products'
                  ? 'bg-[#1E1A17] text-white shadow-xs'
                  : 'text-[#70655B] hover:bg-[#FAF7F2] hover:text-[#1E1A17]')
              }
            >
              <Package className="w-4 h-4" />
              <span>Katalog & Stok ({productsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={
                'w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ' +
                (activeTab === 'orders'
                  ? 'bg-[#1E1A17] text-white shadow-xs'
                  : 'text-[#70655B] hover:bg-[#FAF7F2] hover:text-[#1E1A17]')
              }
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Pesanan & Pembayaran ({ordersList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('coupons')}
              className={
                'w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ' +
                (activeTab === 'coupons'
                  ? 'bg-[#1E1A17] text-white shadow-xs'
                  : 'text-[#70655B] hover:bg-[#FAF7F2] hover:text-[#1E1A17]')
              }
            >
              <Tag className="w-4 h-4" />
              <span>Kupon & Diskon ({couponsList.length})</span>
            </button>
          </nav>

          {/* Database Info Card */}
          <div className="bg-white rounded-2xl border border-[#E3DBD0] p-4 text-xs space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A6B4F] block">
              STATUS SISTEM
            </span>
            <div className="flex items-center space-x-2 text-emerald-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Supabase & Midtrans Sinkron</span>
            </div>
            <p className="text-[11px] text-[#70655B]">
              Tersedia pelacakan live status kurir & metode pembayaran otomatis.
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-[#E3DBD0] shadow-xs">
                  <div className="flex items-center justify-between text-[#8A6B4F]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#70655B]">Total Omset</span>
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#1E1A17] mt-2">
                    {'Rp ' + totalRevenue.toLocaleString('id-ID')}
                  </h3>
                  <p className="text-[11px] text-emerald-700 mt-1 flex items-center space-x-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Lunas via Midtrans</span>
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-[#E3DBD0] shadow-xs">
                  <div className="flex items-center justify-between text-[#8A6B4F]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#70655B]">Total Pesanan</span>
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#1E1A17] mt-2">
                    {ordersList.length} Pesanan
                  </h3>
                  <p className="text-[11px] text-[#70655B] mt-1">
                    {ordersList.filter(o => o.orderStatus === 'shipped').length} paket dalam perjalanan
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-[#E3DBD0] shadow-xs">
                  <div className="flex items-center justify-between text-[#8A6B4F]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#70655B]">Katalog Aktif</span>
                    <Package className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#1E1A17] mt-2">
                    {productsList.length} Produk
                  </h3>
                  <p className="text-[11px] text-[#70655B] mt-1">
                    Semua stok siap tayang
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-[#E3DBD0] shadow-xs">
                  <div className="flex items-center justify-between text-[#8A6B4F]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#70655B]">Pelanggan</span>
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#1E1A17] mt-2">
                    142 Akun
                  </h3>
                  <p className="text-[11px] text-[#70655B] mt-1">
                    Terdaftar via Supabase Auth
                  </p>
                </div>
              </div>

              {/* Recent Orders in Overview */}
              <div className="bg-white rounded-2xl border border-[#E3DBD0] p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-serif text-[#1E1A17]">Pesanan Transaksi Terbaru</h3>
                    <p className="text-xs text-[#70655B]">Daftar aktivitas checkout, metode pembayaran, dan status kirim terkini.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-semibold text-[#8A6B4F] hover:underline cursor-pointer"
                  >
                    Buka Tab Pesanan →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF7F2] text-[#70655B] uppercase text-[10px] tracking-wider border-b border-[#E3DBD0]">
                      <tr>
                        <th className="py-3 px-4">Order ID</th>
                        <th className="py-3 px-4">Pelanggan</th>
                        <th className="py-3 px-4">Total</th>
                        <th className="py-3 px-4">Status & Metode Pembayaran</th>
                        <th className="py-3 px-4">Status Pengiriman</th>
                        <th className="py-3 px-4">Waktu</th>
                        <th className="py-3 px-4 text-right">Detail & Lacak</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E3DBD0]/60">
                      {ordersList.slice(0, 5).map((order) => (
                        <tr key={order.id} className="hover:bg-[#FAF7F2]/50">
                          <td className="py-3.5 px-4 font-mono font-bold text-[#1E1A17]">{order.id}</td>
                          <td className="py-3.5 px-4 text-[#1E1A17]">
                            <span className="font-semibold block">{order.customerName}</span>
                            <span className="text-[10px] text-[#70655B]">{order.shippingAddress.city}</span>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-[#1E1A17]">
                            {'Rp ' + order.total.toLocaleString('id-ID')}
                          </td>
                          
                          {/* STATUS & METODE PEMBAYARAN */}
                          <td className="py-3.5 px-4">
                            <div>
                              {order.paymentStatus === 'settlement' && (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 inline-flex items-center space-x-1">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Lunas / Settlement</span>
                                </span>
                              )}
                              {order.paymentStatus === 'pending' && (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 inline-flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>Pending Payment</span>
                                </span>
                              )}
                              {/* Payment Method Name */}
                              <div className="mt-1">
                                {renderPaymentMethodBadge(order.paymentMethod)}
                              </div>
                            </div>
                          </td>

                          {/* STATUS PENGIRIMAN */}
                          <td className="py-3.5 px-4">
                            <span
                              className={
                                'px-2.5 py-1 rounded-md text-[10px] font-semibold capitalize inline-flex items-center space-x-1 ' +
                                (order.orderStatus === 'shipped'
                                  ? 'bg-blue-100 text-blue-800'
                                  : order.orderStatus === 'completed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-[#EDE7DE] text-[#1E1A17]')
                              }
                            >
                              {order.orderStatus === 'shipped' && <Truck className="w-3 h-3 mr-1" />}
                              <span>{order.orderStatus}</span>
                            </span>
                            <span className="block text-[10px] text-[#70655B] mt-0.5 font-mono">
                              {order.courier.split(' ')[0]}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-[#70655B] whitespace-nowrap">{order.createdAt}</td>
                          
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="px-3 py-1.5 rounded-full bg-[#1E1A17] hover:bg-[#332D28] text-white text-[11px] font-medium transition-colors cursor-pointer inline-flex items-center space-x-1"
                            >
                              <Eye className="w-3 h-3" />
                              <span>Lacak & Detail</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="bg-white rounded-2xl border border-[#E3DBD0] p-6 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-serif text-[#1E1A17]">Manajemen Produk & Stok</h3>
                  <p className="text-xs text-[#70655B]">Tambah, perbarui harga, dan kelola ketersediaan inventaris toko Ramille.</p>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#1E1A17] hover:bg-[#332D28] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Produk Baru</span>
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F2] text-[#70655B] uppercase text-[10px] tracking-wider border-b border-[#E3DBD0]">
                    <tr>
                      <th className="py-3 px-4">Item</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4">Harga Satuan</th>
                      <th className="py-3 px-4">Sisa Stok</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E3DBD0]/60">
                    {productsList.map((product) => (
                      <tr key={product.id} className="hover:bg-[#FAF7F2]/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-10 h-12 object-cover rounded-md bg-[#EDE7DE]"
                            />
                            <div>
                              <span className="font-semibold text-[#1E1A17] block line-clamp-1">
                                {product.name}
                              </span>
                              <span className="text-[10px] text-[#70655B]">{product.slug}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#70655B]">{product.category}</td>
                        <td className="py-3 px-4 font-semibold text-[#1E1A17]">
                          {'Rp ' + product.price.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={
                              'px-2.5 py-0.5 rounded-full text-[10px] font-bold ' +
                              (product.stock < 10
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800')
                            }
                          >
                            {product.stock} unit
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-[11px] font-medium text-emerald-700">Published</span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-1.5 text-[#A89C8F] hover:text-rose-600 transition-colors"
                            title="Hapus Produk"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl border border-[#E3DBD0] p-6 shadow-xs space-y-6">
              <div>
                <h3 className="text-xl font-serif text-[#1E1A17]">Manajemen Pesanan, Pembayaran & Resi Kurir</h3>
                <p className="text-xs text-[#70655B]">Perbarui status operasional pemenuhan barang dan pantau kanal pembayaran.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F2] text-[#70655B] uppercase text-[10px] tracking-wider border-b border-[#E3DBD0]">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Pembeli & Tujuan</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Metode & Status Bayar</th>
                      <th className="py-3 px-4">Ekspedisi & Resi</th>
                      <th className="py-3 px-4">Status Pengiriman</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E3DBD0]/60">
                    {ordersList.map((order) => (
                      <tr key={order.id} className="hover:bg-[#FAF7F2]/50">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#1E1A17]">{order.id}</td>
                        <td className="py-3.5 px-4 text-[#1E1A17]">
                          <span className="font-semibold block">{order.customerName}</span>
                          <span className="text-[10px] text-[#70655B]">{order.shippingAddress.city}</span>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-[#1E1A17]">
                          {'Rp ' + order.total.toLocaleString('id-ID')}
                        </td>
                        
                        {/* PAYMENT METHOD & STATUS */}
                        <td className="py-3.5 px-4">
                          <div>
                            <span
                              className={
                                'px-2 py-0.5 rounded-full text-[10px] font-bold ' +
                                (order.paymentStatus === 'settlement'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800')
                              }
                            >
                              {order.paymentStatus === 'settlement' ? 'Lunas / Settlement' : 'Menunggu Bayar'}
                            </span>
                            <div className="mt-1">
                              {renderPaymentMethodBadge(order.paymentMethod)}
                            </div>
                          </div>
                        </td>

                        {/* COURIER & TRACKING */}
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-[#1E1A17] block">{order.courier}</span>
                          <span className="font-mono text-[10px] text-[#8A6B4F]">{order.trackingNumber}</span>
                        </td>

                        {/* DELIVERY STATUS */}
                        <td className="py-3.5 px-4">
                          <span
                            className={
                              'px-2.5 py-1 rounded-md text-[10px] font-semibold ' +
                              (order.orderStatus === 'shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : order.orderStatus === 'completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-[#EDE7DE] text-[#1E1A17]')
                            }
                          >
                            {order.orderStatus}
                          </span>
                        </td>

                        {/* ACTIONS */}
                        <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="px-2.5 py-1 rounded-full bg-[#EDE7DE] hover:bg-[#E3DBD0] text-[#1E1A17] text-[10px] font-semibold transition-colors cursor-pointer"
                          >
                            Detail & Lacak
                          </button>
                          
                          {order.orderStatus === 'processing' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'shipped', 'Paket diserahkan ke kurir JNE dan sedang dalam perjalanan')}
                              className="px-3 py-1 rounded-full bg-[#1E1A17] hover:bg-[#332D28] text-white text-[10px] font-semibold transition-colors cursor-pointer"
                            >
                              Kirim Barang
                            </button>
                          )}
                          {order.orderStatus === 'shipped' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'completed', 'Paket telah diterima di alamat penerima')}
                              className="px-3 py-1 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] font-semibold transition-colors cursor-pointer"
                            >
                              Selesaikan
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: COUPONS */}
          {activeTab === 'coupons' && (
            <div className="bg-white rounded-2xl border border-[#E3DBD0] p-6 shadow-xs space-y-6">
              <div>
                <h3 className="text-xl font-serif text-[#1E1A17]">Kode Promosi & Diskon Toko</h3>
                <p className="text-xs text-[#70655B]">Kupon aktif yang dapat digunakan pelanggan pada saat checkout.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {couponsList.map((cp, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-[#E3DBD0] bg-[#FAF7F2] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-[#1E1A17] text-white rounded-lg font-mono font-bold text-xs tracking-wider">
                        {cp.code}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 uppercase bg-emerald-100 px-2 py-0.5 rounded-full">
                        Aktif
                      </span>
                    </div>

                    <p className="text-xs text-[#70655B]">{cp.description}</p>
                    
                    <div className="pt-2 border-t border-[#E3DBD0] flex justify-between text-[11px] text-[#1E1A17]">
                      <span>Nilai Potongan:</span>
                      <span className="font-bold">
                        {cp.discountType === 'percentage' ? cp.value + '%' : 'Rp ' + cp.value.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>

      </div>

      {/* MODAL DETAIL PESANAN & LIVE TRACKING UNTUK ADMIN */}
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
                    Detail Pesanan: {selectedOrder.id}
                  </h3>
                  <span className="text-[11px] text-[#70655B]">Dibuat pada {selectedOrder.createdAt}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-full hover:bg-[#EDE7DE] text-[#70655B] hover:text-[#1E1A17] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Payment Summary Box */}
              <div className="bg-white p-5 rounded-2xl border border-[#E3DBD0] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#70655B]">
                    Informasi Pembayaran (Midtrans)
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div>
                    <span className="text-[#70655B] block">Metode Pembayaran:</span>
                    <span className="font-semibold text-[#1E1A17]">{selectedOrder.paymentMethod}</span>
                    {selectedOrder.paymentDetails && (
                      <span className="text-[11px] text-[#8A6B4F] block font-mono mt-0.5">
                        {selectedOrder.paymentDetails}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-[#70655B] block">Waktu Terbayar:</span>
                    <span className="font-semibold text-[#1E1A17]">{selectedOrder.paymentDate}</span>
                  </div>
                </div>
              </div>

              {/* Courier & Live Location Banner */}
              <div className="bg-[#EDE7DE] p-5 rounded-2xl border border-[#D8CFC3] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-5 h-5 text-[#8A6B4F]" />
                    <span className="font-serif font-bold text-sm text-[#1E1A17]">
                      {selectedOrder.courier}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-mono text-xs font-semibold text-[#1E1A17]">
                      {selectedOrder.trackingNumber}
                    </span>
                    <button
                      onClick={() => copyTracking(selectedOrder.trackingNumber)}
                      className="p-1 hover:text-[#8A6B4F] text-[#70655B] transition-colors"
                      title="Salin Resi"
                    >
                      {copiedResi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Location alert */}
                <div className="bg-white/80 p-3 rounded-xl text-xs space-y-1">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#1E1A17]">Posisi Paket Terkini:</span>
                      <p className="text-[#70655B] mt-0.5 leading-relaxed">{selectedOrder.currentLocation}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Timeline Stepper */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1A17] mb-3">
                  Riwayat Perjalanan Paket (Tracking Timeline)
                </h4>
                
                <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E3DBD0]">
                  {selectedOrder.trackingHistory.map((step, idx) => (
                    <div key={idx} className="relative">
                      {/* Bullet icon */}
                      <div
                        className={
                          'absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center ' +
                          (step.completed
                            ? 'bg-[#1E1A17] text-white'
                            : step.current
                            ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                            : 'bg-[#E3DBD0] text-transparent')
                        }
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>

                      <div>
                        <div className="flex items-baseline justify-between">
                          <span className={'text-xs font-bold ' + (step.current ? 'text-blue-700' : 'text-[#1E1A17]')}>
                            {step.title}
                          </span>
                          <span className="text-[10px] text-[#70655B]">{step.timestamp}</span>
                        </div>
                        <p className="text-xs text-[#70655B] mt-0.5">{step.description}</p>
                        <span className="text-[10px] text-[#8A6B4F] font-medium block mt-0.5">
                          📍 {step.location}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items Purchased */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1A17] mb-2.5">
                  Produk yang Dibeli
                </h4>
                <div className="bg-white rounded-xl border border-[#E3DBD0] divide-y divide-[#E3DBD0]/60 p-3">
                  {selectedOrder.items.map((it, i) => (
                    <div key={i} className="py-2 first:pt-0 last:pb-0 flex items-center space-x-3">
                      <img src={it.image} alt={it.name} className="w-12 h-14 object-cover rounded-lg bg-[#FAF7F2]" />
                      <div className="flex-1">
                        <span className="font-semibold text-xs text-[#1E1A17] block">{it.name}</span>
                        <span className="text-[11px] text-[#70655B]">{it.quantity} x Rp {it.price.toLocaleString('id-ID')}</span>
                      </div>
                      <span className="font-bold text-xs text-[#1E1A17]">
                        {'Rp ' + (it.price * it.quantity).toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Destination Address */}
              <div className="bg-white p-4 rounded-xl border border-[#E3DBD0] text-xs space-y-1">
                <span className="font-bold text-[#1E1A17] block">Alamat Tujuan Pengiriman:</span>
                <p className="text-[#70655B]">
                  <strong className="text-[#1E1A17]">{selectedOrder.shippingAddress.recipientName}</strong> ({selectedOrder.shippingAddress.phone})<br />
                  {selectedOrder.shippingAddress.addressLine}, {selectedOrder.shippingAddress.city} {selectedOrder.shippingAddress.postalCode}
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#E3DBD0] bg-white flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2.5 rounded-full bg-[#1E1A17] hover:bg-[#332D28] text-white text-xs font-semibold cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH PRODUK BARU */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsAddModalOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-xs" />
          
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E3DBD0] overflow-hidden p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#E3DBD0]">
              <h3 className="text-xl font-serif text-[#1E1A17]">Tambah Produk Baru</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full text-[#70655B] hover:text-[#1E1A17]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 pt-4">
              <div>
                <label className="text-xs text-[#70655B] font-medium block mb-1">Nama Produk</label>
                <input
                  type="text"
                  required
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  placeholder="Contoh: Linen Relaxed Shirt"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DBD0] text-xs text-[#1E1A17] outline-hidden focus:border-[#8A6B4F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#70655B] font-medium block mb-1">Kategori</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DBD0] text-xs text-[#1E1A17] outline-hidden focus:border-[#8A6B4F] bg-white"
                  >
                    <option value="Apparel & Linen">Apparel & Linen</option>
                    <option value="Skincare & Botanicals">Skincare & Botanicals</option>
                    <option value="Leather Goods">Leather Goods</option>
                    <option value="Home Sanctuary">Home Sanctuary</option>
                    <option value="Jewelry & Accents">Jewelry & Accents</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-[#70655B] font-medium block mb-1">Harga (IDR)</label>
                  <input
                    type="number"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DBD0] text-xs text-[#1E1A17] outline-hidden focus:border-[#8A6B4F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#70655B] font-medium block mb-1">Jumlah Stok</label>
                  <input
                    type="number"
                    required
                    value={newProd.stock}
                    onChange={(e) => setNewProd({ ...newProd, stock: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DBD0] text-xs text-[#1E1A17] outline-hidden focus:border-[#8A6B4F]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#70655B] font-medium block mb-1">URL Gambar</label>
                  <input
                    type="url"
                    required
                    value={newProd.imageUrl}
                    onChange={(e) => setNewProd({ ...newProd, imageUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DBD0] text-xs text-[#1E1A17] outline-hidden focus:border-[#8A6B4F]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#70655B] font-medium block mb-1">Deskripsi Produk</label>
                <textarea
                  rows={3}
                  value={newProd.description}
                  onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  placeholder="Keterangan singkat tentang bahan dan keunggulan..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DBD0] text-xs text-[#1E1A17] outline-hidden focus:border-[#8A6B4F]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#1E1A17] hover:bg-[#332D28] text-white text-xs font-semibold tracking-wide transition-all shadow-md cursor-pointer mt-2"
              >
                Simpan & Terbitkan Produk
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
