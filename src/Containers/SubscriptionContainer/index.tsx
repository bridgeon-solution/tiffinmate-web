import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { RazorpayResponse ,RazorpayOptions,OrderDtailsProps} from '../../Components/Order/type';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { RazorPayOrder , GetSubscriptionId, PostSubscriptionDetails} from '../../Services/OrderService';
import OrderComponent from '../../Components/Order';


const SubscriptionContainer :React.FC= () => {


    const { id, menuId } = useParams();
    const providerId = id || "";
    const menuid = menuId || "";
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [orderId, setOrderId] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState<string>();
    const [, setRazrPay] = useState<RazorpayResponse | null>(null);
    const [RazrPayLoad, setRazrPayLoad] = useState<boolean>(false);


    const loadScript = (src: string) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => resolve(true);
          script.onerror = () => reject(false);
          document.body.appendChild(script);
        });
      };
const [paymentDetails] = useState({
    user_name: "",
    ph_no: "",
  });

  const formik = useFormik({
      initialValues: {
        user_name: "",
        address: "",
        city: "",
        ph_no: "",
      },
      validationSchema: Yup.object({
        user_name: Yup.string().required("Name is required"),
        address: Yup.string().required("Address is required"),
        ph_no: Yup.string()
          .required("Phone number is required")
          .matches(/^\d{10}$/, "Phone number must contain exactly 10 digits"),
        city: Yup.string().required("Current location is required"),
      }),
      onSubmit: async (values) => {
setLoading(true)
            // RazorPay
            
            if (!RazrPayLoad) {
              try {
                const scriptLoad = await loadScript(
                  "https://checkout.razorpay.com/v1/checkout.js"
                );
                if (typeof scriptLoad === "boolean") {
                  setRazrPayLoad(scriptLoad);
                }
              } catch (error) {
                toast.error("Error loading payment script.");
                setLoading(false)
                return;
              }
            }
             try {
                    const response = await GetSubscriptionId(orderId);
                    const total = response.result.total_price;
            
                    if (!total) {
                      toast.error("Total amount is missing.");
                      setLoading(false)
                      return;
                    }
            
                    // RazorPay id creation
            
                    const res = await RazorPayOrder(total);
            
                    const RazororderId = res.result;
            
                    const options: RazorpayOptions = {
                      amount: total,
                      currency: "INR",
                      name: "TiffinMate",
                      description: "Order Payment",
                      order_id: RazororderId,
            
                      handler: async (response: RazorpayResponse) => {
                        const paymentData = {
                          razorpay_payment_id: response.razorpay_payment_id,
                          razorpay_order_id: response.razorpay_order_id,
                          razorpay_signature: response.razorpay_signature,
                        };
                        setRazrPay(paymentData);
            
                        try {
                          // post Order details
            
                          const orderDetailsData: OrderDtailsProps = {
                            ...values,
                            categories: selectedCategories,
                            date: date!,
                            provider_id: providerId,
                            menu_id: menuid,
                            order_string: paymentData.razorpay_order_id,
                            transaction_string: paymentData.razorpay_payment_id,
                          };
                          await PostSubscriptionDetails(orderId, orderDetailsData);
                          toast.success("order palced succesfully");
                          setLoading(true);
                        } catch (error) {
                          toast.error("Payment failed.");
                        } finally {
                          setLoading(false);
                        }
                      },
                      prefill: {
                        name: paymentDetails.user_name,
                        contact: paymentDetails.ph_no,
                      },
                      theme: {
                        color: "#3399cc",
                      },
                    };
            
                    const razorPay = new window.Razorpay(options);
                    razorPay.open();
                  } catch (error) {
                    toast.error("Failed to create order.");
                    setLoading(false)
                  }
                },
              });
            
              const errorDisplay = {
                user_name:
                  formik.touched.user_name && formik.errors.user_name
                    ? formik.errors.user_name
                    : "",
                address:
                  formik.touched.address && formik.errors.address
                    ? formik.errors.address
                    : "",
                city: formik.touched.city && formik.errors.city ? formik.errors.city : "",
                ph_no:
                  formik.touched.ph_no && formik.errors.ph_no ? formik.errors.ph_no : "",
              };

  return (
    <OrderComponent
    formData={formik.values}
    handleSubmit={formik.handleSubmit}
    handleChange={formik.handleChange}
    errors={errorDisplay}
    setSelectedCategories={setSelectedCategories}
    setOrderId={setOrderId}
    setDate={setDate}
    loading={loading}
  />

  )
}

export default SubscriptionContainer
