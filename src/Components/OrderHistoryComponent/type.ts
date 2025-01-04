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