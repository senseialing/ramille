import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TrackingStep {
  title: string;
  description: string;
  location: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
}

export interface DetailedOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: {
    id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  shippingAddress: {
    recipientName: string;
    phone: string;
    addressLine: string;
    city: string;
    postalCode: string;
  };
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentStatus: 'settlement' | 'pending' | 'failed' | 'expire';
  paymentMethod: 'BCA Virtual Account' | 'QRIS (GoPay)' | 'Kartu Kredit (Visa/Mastercard)' | 'Mandiri Bill';
  paymentDetails?: string;
  paymentDate: string;
  orderStatus: 'pending_payment' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  courier: string;
  trackingNumber: string;
  currentLocation: string;
  estimatedArrival: string;
  trackingHistory: TrackingStep[];
  createdAt: string;
}

const DEFAULT_ORDERS: DetailedOrder[] = [
  {
    id: 'RAM-894210',
    customerName: 'Rama Aditya',
    customerEmail: 'rama@gmail.com',
    customerPhone: '081298765432',
    items: [
      {
        id: 'prod-1',
        name: 'Linen Oversized Trench Coat',
        category: 'Apparel & Linen',
        price: 1450000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 'prod-3',
        name: 'Restorative Botanical Facial Elixir',
        category: 'Skincare & Botanicals',
        price: 420000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1608248597359-2ff43e3c5ec7?auto=format&fit=crop&w=900&q=80',
      },
    ],
    shippingAddress: {
      recipientName: 'Rama Aditya',
      phone: '081298765432',
      addressLine: 'Jl. Senopati No. 45, Kebayoran Baru',
      city: 'Jakarta Selatan',
      postalCode: '12190',
    },
    subtotal: 1870000,
    discount: 0,
    shippingFee: 0,
    total: 1870000,
    paymentStatus: 'settlement',
    paymentMethod: 'BCA Virtual Account',
    paymentDetails: 'VA: 80777 081298765432 (Midtrans Sandbox)',
    paymentDate: '27 Okt 2026, 09:15 WIB',
    orderStatus: 'shipped',
    courier: 'JNE Express (Reguler)',
    trackingNumber: 'JNE-RAM89421098ID',
    currentLocation: 'Sorting Hub DC Jakarta Selatan — Paket sedang dibawa kurir (Hendra - 0813xxxx) menuju alamat tujuan',
    estimatedArrival: 'Hari ini, 27 Okt 2026 (Perkiraan: 14:00 - 17:00 WIB)',
    createdAt: '26 Okt 2026, 14:30 WIB',
    trackingHistory: [
      {
        title: 'Pesanan Berhasil Dibuat',
        description: 'Pesanan telah masuk ke sistem Ramille Atelier.',
        location: 'Sistem Ramille Store',
        timestamp: '26 Okt 2026, 14:30 WIB',
        completed: true,
      },
      {
        title: 'Pembayaran Lunas Diverifikasi',
        description: 'Pembayaran sukses diverifikasi otomatis oleh Midtrans Sandbox via BCA Virtual Account.',
        location: 'Midtrans Payment Gateway',
        timestamp: '26 Okt 2026, 14:35 WIB',
        completed: true,
      },
      {
        title: 'Pesanan Selesai Dikemas',
        description: 'Quality check selesai, produk dikemas dalam Ramille Luxury Eco-Box.',
        location: 'Atelier Warehouse Kemang, Jakarta Selatan',
        timestamp: '26 Okt 2026, 17:15 WIB',
        completed: true,
      },
      {
        title: 'Paket Diserahkan ke Kurir JNE',
        description: 'Paket telah di-pickup kurir JNE Express dan diterbitkan nomor resi JNE-RAM89421098ID.',
        location: 'Drop Point JNE Kemang',
        timestamp: '27 Okt 2026, 08:30 WIB',
        completed: true,
      },
      {
        title: 'Paket Tiba di Sorting Hub',
        description: 'Paket tiba di fasilitas sortir transit untuk persiapan pengantaran akhir.',
        location: 'Sorting Hub DC Jakarta Selatan',
        timestamp: '27 Okt 2026, 11:20 WIB',
        completed: true,
      },
      {
        title: 'Sedang Diantar ke Alamat Penerima',
        description: 'Kurir (Hendra) sedang dalam perjalanan menuju alamat tujuan Anda.',
        location: 'Menuju Kebayoran Baru, Jakarta Selatan',
        timestamp: '27 Okt 2026, 13:40 WIB',
        completed: false,
        current: true,
      },
      {
        title: 'Pesanan Diterima',
        description: 'Paket sampai dengan aman dan ditandatangani penerima.',
        location: 'Alamat Tujuan',
        timestamp: 'Estimasi: 27 Okt 2026 (Sore)',
        completed: false,
      },
    ],
  },
  {
    id: 'RAM-773192',
    customerName: 'Siti Rahma',
    customerEmail: 'siti@gmail.com',
    customerPhone: '081377889900',
    items: [
      {
        id: 'prod-1',
        name: 'Linen Oversized Trench Coat',
        category: 'Apparel & Linen',
        price: 1450000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80',
      },
    ],
    shippingAddress: {
      recipientName: 'Siti Rahma',
      phone: '081377889900',
      addressLine: 'Jl. Dago Asri No. 12',
      city: 'Bandung',
      postalCode: '40135',
    },
    subtotal: 1450000,
    discount: 0,
    shippingFee: 0,
    total: 1450000,
    paymentStatus: 'settlement',
    paymentMethod: 'QRIS (GoPay)',
    paymentDetails: 'NMID: ID102003920192 (Midtrans QRIS)',
    paymentDate: '22 Okt 2026, 17:15 WIB',
    orderStatus: 'completed',
    courier: 'SiCepat BEST',
    trackingNumber: 'SIC-77319200ID',
    currentLocation: 'Paket telah diterima dengan baik oleh Ibu Siti Rahma (Ybs)',
    estimatedArrival: 'Telah terkirim',
    createdAt: '22 Okt 2026, 17:12 WIB',
    trackingHistory: [
      {
        title: 'Pesanan Dibuat & Dibayar',
        description: 'Lunas seketika via scan QRIS GoPay.',
        location: 'Midtrans QRIS',
        timestamp: '22 Okt 2026, 17:15 WIB',
        completed: true,
      },
      {
        title: 'Paket Telah Diterima',
        description: 'Diterima oleh penerima bersangkutan dalam kondisi sempurna.',
        location: 'Bandung',
        timestamp: '24 Okt 2026, 14:10 WIB',
        completed: true,
        current: true,
      },
    ],
  },
  {
    id: 'RAM-662819',
    customerName: 'Budi Santoso',
    customerEmail: 'budi@yahoo.com',
    customerPhone: '085612344321',
    items: [
      {
        id: 'prod-4',
        name: 'Raw Silk Relaxed Robe Cardigan',
        category: 'Apparel & Linen',
        price: 890000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
      },
    ],
    shippingAddress: {
      recipientName: 'Budi Santoso',
      phone: '085612344321',
      addressLine: 'Jl. Pemuda No. 8',
      city: 'Surabaya',
      postalCode: '60271',
    },
    subtotal: 890000,
    discount: 0,
    shippingFee: 0,
    total: 890000,
    paymentStatus: 'pending',
    paymentMethod: 'Mandiri Bill',
    paymentDetails: 'Company Code: 70012, Bill Key: 882910284',
    paymentDate: 'Menunggu transfer pembeli',
    orderStatus: 'processing',
    courier: 'JNE Express',
    trackingNumber: 'Menunggu Resi',
    currentLocation: 'Menunggu pelunasan pembayaran pelanggan via Mandiri Bill sebelum dikemas',
    estimatedArrival: '1-2 hari setelah lunas',
    createdAt: '22 Okt 2026, 15:30 WIB',
    trackingHistory: [
      {
        title: 'Menunggu Pembayaran',
        description: 'Nomor tagihan Mandiri Bill diterbitkan (Kadaluwarsa dalam 24 jam).',
        location: 'Midtrans Payment Portal',
        timestamp: '22 Okt 2026, 15:30 WIB',
        completed: false,
        current: true,
      },
    ],
  },
  {
    id: 'RAM-551042',
    customerName: 'Dewi Lestari',
    customerEmail: 'dewi@gmail.com',
    customerPhone: '081822334455',
    items: [
      {
        id: 'prod-3',
        name: 'Restorative Botanical Facial Elixir',
        category: 'Skincare & Botanicals',
        price: 420000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1608248597359-2ff43e3c5ec7?auto=format&fit=crop&w=900&q=80',
      },
    ],
    shippingAddress: {
      recipientName: 'Dewi Lestari',
      phone: '081822334455',
      addressLine: 'Jl. Malioboro No. 34',
      city: 'Yogyakarta',
      postalCode: '55271',
    },
    subtotal: 420000,
    discount: 0,
    shippingFee: 35000,
    total: 455000,
    paymentStatus: 'settlement',
    paymentMethod: 'Kartu Kredit (Visa/Mastercard)',
    paymentDetails: 'Card: **** **** **** 4811',
    paymentDate: '21 Okt 2026, 11:22 WIB',
    orderStatus: 'completed',
    courier: 'J&T Express',
    trackingNumber: 'JT-55104299ID',
    currentLocation: 'Paket telah diterima dengan baik oleh Dewi Lestari (Ybs)',
    estimatedArrival: 'Telah terkirim',
    createdAt: '21 Okt 2026, 11:20 WIB',
    trackingHistory: [
      {
        title: 'Pesanan Dibuat & Terbayar',
        description: 'Transaksi kartu kredit terverifikasi 3D Secure Midtrans.',
        location: 'Midtrans Sandbox',
        timestamp: '21 Okt 2026, 11:22 WIB',
        completed: true,
      },
      {
        title: 'Paket Diterima',
        description: 'Terkirim sukses ke Yogyakarta.',
        location: 'Yogyakarta',
        timestamp: '23 Okt 2026, 10:40 WIB',
        completed: true,
        current: true,
      },
    ],
  },
];

interface OrdersState {
  orders: DetailedOrder[];
  addOrder: (order: DetailedOrder) => void;
  updateOrderStatus: (orderId: string, status: DetailedOrder['orderStatus'], location?: string) => void;
  getOrderById: (orderId: string) => DetailedOrder | undefined;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: DEFAULT_ORDERS,

      addOrder: (newOrder: DetailedOrder) => {
        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));
      },

      updateOrderStatus: (orderId: string, status: DetailedOrder['orderStatus'], location?: string) => {
        set((state) => ({
          orders: state.orders.map((o) => {
            if (o.id === orderId) {
              const updatedHistory = [...o.trackingHistory];
              if (status === 'shipped') {
                updatedHistory.push({
                  title: 'Paket Sedang Diantar Kurir',
                  description: 'Paket dalam perjalanan ke alamat tujuan.',
                  location: location || 'Dalam perjalanan ekspedisi',
                  timestamp: new Date().toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                  completed: true,
                  current: true,
                });
              } else if (status === 'completed') {
                updatedHistory.push({
                  title: 'Pesanan Telah Sampai & Diterima',
                  description: 'Paket berhasil diserahterimakan.',
                  location: 'Alamat Tujuan',
                  timestamp: new Date().toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                  completed: true,
                  current: true,
                });
              }
              return {
                ...o,
                orderStatus: status,
                currentLocation: location || o.currentLocation,
                trackingHistory: updatedHistory,
              };
            }
            return o;
          }),
        }));
      },

      getOrderById: (orderId: string) => {
        return get().orders.find((o) => o.id === orderId);
      },
    }),
    {
      name: 'ramille-orders-storage',
    }
  )
);
