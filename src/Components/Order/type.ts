export interface OrderDtailsProps{
    user_name: string;
  address: string;
  city: string;
  ph_no: string;
  categories: string[]; 
  date: string|undefined; 
  provider_id: string; 
  menu_id: string;
  order_string:string,
  transaction_string:string 
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  error?: {
    code: string;
    description: string;
  };
}





declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export interface RazorpayOptions {
 
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

interface RazorpayInstance {
  open: () => void;
}

