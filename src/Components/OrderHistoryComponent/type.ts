 export interface Address {
    userName: string;
    address: string;
    city: string;
    ph_no: string;
  }
  
  export interface Order {
    order_id: string;
    foodItemName: string;
    category: string;
    provider: string;
    foodItemImage: string;
    total_price: number;
    payment_status: boolean;
    date: string;
    address: Address;
  }