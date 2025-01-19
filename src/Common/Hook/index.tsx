import { useState } from "react";
import { toast } from "react-toastify";
import { RazorpayOptions, RazorpayResponse } from "../../Components/Order/type";
import {
  RazorPayOrder,
} from "../../Services/OrderService";

export const useRazorpayPayment = (
  totalAmount: number,
  userDetails: { name: string; phone: string },
  UpdateSubscription:()=>void
) => {
  const [razorpayResponse, setRazorpayResponse] =
    useState<RazorpayResponse | null>(null);
  interface UpdateSubscription {
    payment_id: string;
    action: string;
  }
  const loadScript = async (src: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => reject(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async () => {
    if (!totalAmount) {
      toast.error("Total amount is missing.");
      return;
    }

    try {
      const scriptLoad = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!scriptLoad) {
        toast.error("Failed to load payment script.");
        return;
      }

      const response = await RazorPayOrder(totalAmount);
      const RazororderId = response.result;

      const options: RazorpayOptions = {
        amount: totalAmount,
        currency: "INR",
        name: "TiffinMate",
        description: "Payment",
        order_id: RazororderId,
        handler: async (response: RazorpayResponse) => {
          setRazorpayResponse(response);
          toast.success("Payment Successful!");

          UpdateSubscription()
        },
        prefill: {
          name: userDetails.name,
          contact: userDetails.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorPay = new (window as any).Razorpay(options);
      razorPay.open();
    } catch (error) {
      toast.error("Payment failed.");
    }
  };

  return { initiatePayment, razorpayResponse };
};
