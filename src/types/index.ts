export interface Product {
  id: string;
  name: string;
  category: 'cakes' | 'croissants' | 'cookies' | 'bread' | 'seasonal';
  price: number;
  originalPrice?: number;
  description: string;
  longDescription: string;
  ingredients: string[];
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  badge?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  stock: number;
  weight?: string;
  servings?: string;
  allergens: string[];
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  note?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  items: CartItem[];
  total: number;
  deliveryType: 'pickup' | 'delivery';
  address?: string;
  estimatedTime?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  favoriteProducts: string[];
  addresses: Address[];
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

export interface Review {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  productId: string;
}

export interface AdminStats {
  totalRevenue: number;
  revenueGrowth: number;
  totalOrders: number;
  ordersGrowth: number;
  totalCustomers: number;
  customersGrowth: number;
  avgOrderValue: number;
  avgOrderGrowth: number;
}
