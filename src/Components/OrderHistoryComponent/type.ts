 export interface Address {
    userName: string;
    address: string;
    city: string;
    ph_no: string;
  }
  
  export enum OrderStatus {
    Pending = 0,
    Confirmed = 1,
    Delivered = 2,
    Cancelled = 3,
  }
  export interface Order {
    order_id: string;
    foodItemName: string;
    category: string;
    provider: string;
    foodItemImage: string;
    foodItemPrice: number;
    order_status:string,
    date: string;
    address: Address;
  }