export interface OrderTrack {
    status: string;
    time: string;
    location?: string;
  }
  
 export interface OrderHistory {
    id: string;
    name: string;
    category: string;
    restaurant: string;
    status: string;
    imageUrl: string;
    trackingEvents: OrderTrack[];
  }

  export interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    totalPrice: number;
  }
  
  export interface CustomerInfo {
    name: string;
    email: string;
    phone: string;
    address: string;
  }
  
  export interface PaymentInfo {
    method: string;
    subtotal: number;
    deliveryFee: number;
    tax: number;
    total: number;
    status: 'pending' | 'completed' | 'failed';
  }
  
  export interface OrderDetails {
    id: string;
    orderDate: string;
    status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
    restaurant: string;
    items: OrderItem[];
    customer: CustomerInfo;
    payment: PaymentInfo;
  }