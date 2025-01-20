export interface FoodItem {
  menu_id: string;
  day: string;
  food_name: string;
}

export interface Subscription {
  category: string;
  fooditems: FoodItem[];
}

export interface ApiResponse {
  result: {
    user_id: string;
    provider: string;
    total_amount: number;
    subscription: Subscription[];
  }[];
}

export interface UserSubscription {
  providerName: string;
  monthly_amount: number;
  categories: string;
}

export interface MenuItem {
  category_id: string;
  day: string;
  food_name: string;
}
