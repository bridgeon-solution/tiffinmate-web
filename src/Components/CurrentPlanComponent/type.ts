export interface MenuDay {
    day: string;
    breakfast: string;
    lunch: string;
    dinner: string;
  }
  export interface UserSubscription {
    providerId: string;
    providerName: string;
    monthly_amount: number;
    paid_amount: number;
    categories: string;
    menuId: string;
  }
  export interface categories{
    id:string;
    name:string;
  }