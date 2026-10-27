export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle?: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  category: string;
  categorySlug: string;
  images: string[];
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isNew?: boolean;
  badge?: string;
  details?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minPurchase: number;
  description: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  quote: string;
  location: string;
  verified: boolean;
}

export interface ShippingAddress {
  recipientName: string;
  phone: string;
  addressLine: string;
  city: string;
  province: string;
  postalCode: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  orderStatus: 'pending_payment' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'settlement' | 'expire' | 'failed';
  midtransToken?: string;
  createdAt: string;
}
