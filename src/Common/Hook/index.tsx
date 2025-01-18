import { useState } from "react";
import { toast } from "react-toastify";
import { RazorpayOptions, RazorpayResponse } from "../../Components/Order/type";
import { RazorPayOrder, UpdatePaymentHistory } from "../../Services/OrderService"; // Import your API service

export const useRazorpayPayment = (payment_id: string, totalAmount: number) => {
  const [razorpayResponse, setRazorpayResponse] = useState<RazorpayResponse | null>(null);
interface UpdateSubscription{
    payment_id:string,
    action:string
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
      // Load Razorpay script
      const scriptLoad = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!scriptLoad) {
        toast.error("Failed to load payment script.");
        return;
      }

      // Create Razorpay order ID
      const response = await RazorPayOrder(totalAmount);
      const RazororderId = response.result;

      // Configure Razorpay options
      const options: RazorpayOptions = {
        amount: totalAmount,
        currency: "INR",
        name: "TiffinMate",
        description: "Payment",
        order_id: RazororderId,
        handler: async (response: RazorpayResponse) => {
          setRazorpayResponse(response);
          toast.success("Payment Successful!");

          try {
            // Call API to update payment history
            const action='renew'
            const values:UpdateSubscription={payment_id,action}
            await UpdatePaymentHistory(values); // Pass paymentId and the payment status
            toast.success("Payment history updated successfully.");
          } catch (apiError) {
            console.error("Error updating payment history:", apiError);
            toast.error("Failed to update payment history.");
          }
        },
        prefill: {
          name: "suhaila",
          contact: "9645877112",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorPay = new (window as any).Razorpay(options);
      razorPay.open();
    } catch (error) {
      console.error("Error during payment:", error);
      toast.error("Payment failed.");
    }
  };

  return { initiatePayment, razorpayResponse };
};
