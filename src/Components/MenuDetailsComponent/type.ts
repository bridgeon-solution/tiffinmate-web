export interface MenuItem {
    day: string;
    food_name: string;
    description: string;
    price: string;
    category_name: string;
    category_id:string
  }
  export interface category{
    id:string;
    name:string;
    image:string;
    description:string
  }

  export interface OrderProp{
    date:string,
    total_price:number
    menu_id:string,
    provider_id:string,
    user_id:string
  }
 