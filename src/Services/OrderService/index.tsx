import { toast } from "react-toastify";
import { OrderProp } from "../../Components/MenuDetailsComponent/type";
import { OrderDtailsProps } from "../../Components/Order/type";
import api from "../api";


export const PostOrder = async (orderData:OrderProp) => {
    try {
      
      const response = await api.post(
        '/Order',orderData
      );
      
  
      if (response && response.data && response.data.result) {
        return response.data;
      }
      return null;
    } catch  {
      toast.error("somethng went wrong")
    }
  };


  export const PostOrderDetails = async (orderId:string|undefined,values:OrderDtailsProps) => {
    try {
      const response = await api.post(
        `Order/details?orderid=${orderId}`,values
      );
      
      
  
      if (response && response.data && response.data.result) {
        return response.data;
      }
      return null;
    } catch {
      toast.error("somethng went wrong")
    }
  };

  export const RazorPayOrder = async (totalAmount:number|undefined) => {
    try {
      
      const response = await api.post(
        `/Order/razorpay_order?price=${totalAmount}`
      );
      
  
      if (response && response.data && response.data.result) {
        return response.data;
      }
      return null;
    } catch {
      toast.error("somethng went wrong")
    }
  };

  export const GetOrderById = async (orderId:string|undefined) => {
    try {
      
      const response = await api.get(
        `/Order/${orderId}`
      );
      
  
      if (response && response.data && response.data.result) {
        return response.data;
      }
      return null;
    } catch  {
      toast.error("somethng went wrong")
    }
  };



 
