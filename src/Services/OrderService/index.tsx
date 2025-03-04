import { toast } from "react-toastify";
import { OrderProp } from "../../Components/MenuDetailsComponent/type";
import { OrderDtailsProps } from "../../Components/Order/type";
import api from "../api";
import { UpdateSubscription } from "../../Components/MonthlyBillComponent/type";

export const PostOrder = async (orderData:OrderProp) => {
    
      
      const response = await api.post(
        "/Order",orderData
      );
      
  
      if (response && response.data && response.data.result) {
        return response.data;
      }
      return null;
    
  };

export const PostOrderDetails = async (
  orderId: string | undefined,
  values: OrderDtailsProps
) => {
  try {
    const response = await api.post(`Order/details?orderid=${orderId}`, values);

    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch {
    toast.warning("something went wrong");
  }
};

export const RazorPayOrder = async (totalAmount: number | undefined) => {
  try {
    const response = await api.post(
      `/Order/razorpay_order?price=${totalAmount}`
    );

    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch {
    toast.error("ghj");
  }
};

export const GetOrderById = async (orderId: string | undefined) => {
  try {
    const response = await api.get(`/Order/${orderId}`);

    if (response && response.data && response.data.result) {
      return response.data; 
    }
    return null;
  } catch {
    toast.warning("Please login");
  }
};

// subscription

export const PostSubscriptionOrder = async (orderData: OrderProp) => {
  
    const response = await api.post("/Subscription/", orderData);

    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
 
};

export const PostSubscriptionDetails = async (
  orderId: string | undefined,
  values: OrderDtailsProps
) => {
  try {
    const response = await api.post(
      `Subscription/details?subscriptionid=${orderId}`,
      values
    );

    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch {
    toast.error("something went wrong");
  }
};

export const GetSubscriptionId = async (orderId: string | undefined) => {
  try {
    const response = await api.get(`Subscription/id?subscriptionid=${orderId}`);
    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch {
    toast.error("something went wrong");
  }
};

export const GetPaymentHistoryById = async (payment_id: string | undefined) => {
  try {
    const response = await api.get(
      `/Subscription/payment-history?id=${payment_id}`
    );
    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch {
    toast.error("something went wrong");
  }
};

export const UpdatePaymentHistory = async (values: UpdateSubscription) => {
  try {
    const response = await api.put("/Subscription", values);

    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch {
    toast.error("something went wrong");
  }
};

export const GetAllFoodItems = async (menuId: string, categories: string) => {
  try {
    const response = await api.post(
      `FoodItem/menu-category?menuId=${menuId}`,
      categories
    );

    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch {
    toast.error("something went wrong");
  }
};

export const GetSubscriptionByUser = async (userId:string) => {
  try {
    const response = await api.get(
      `/Subscription/user?userId=${userId}`
    );
    if (response && response.data && response.data.result) {
      return response.data;
    }
    return null;
  } catch {
    toast.error("something went wrong");
  }
};