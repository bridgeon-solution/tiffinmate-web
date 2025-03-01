import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useEffect } from "react";

import OrderComponent from "../../Components/Order";
import {
  GetOrderById,
  PostOrderDetails,
  RazorPayOrder,
} from "../../Services/OrderService";
import { useNavigate, useParams } from "react-router-dom";
import {
  OrderDtailsProps,
  RazorpayOptions,
  RazorpayResponse,
} from "../../Components/Order/type";
import OrderModal from "../../Atoms/Modal";
import { Box, CircularProgress } from "@mui/material";

const OrderContainer: React.FC = () => {
  const navigate=useNavigate();
  const { id, menuId } = useParams();
  const [initialValues, setInitialValues] = useState({
    user_name: "",
    address: "",
    city: "",
    ph_no: "",
  });
  const providerId = id || "";
  const menuid = menuId || "";
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [orderId, setOrderId] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<string>();
  const [, setRazrPay] = useState<RazorpayResponse | null>(null);
  const [RazrPayLoad, setRazrPayLoad] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postPaymentLoading, setPostPaymentLoading] = useState(false);
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
  useEffect(() => {
    const user = localStorage.getItem("user_name");  
    if (user) {
      setInitialValues((prevValues) => ({
        ...prevValues,
        user_name: user,  
      }));
    }
  }, []);

  const formik = useFormik({
    initialValues
    ,
    validationSchema: Yup.object({
      address: Yup.string().required("Address is required"),
      ph_no: Yup.string()
        .required("Phone number is required")
        .matches(/^\d{10}$/, "Phone number must contain exactly 10 digits"),
      city: Yup.string().required("Current location is required"),
    }),
    onSubmit: async (values) => {

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
          return;
        }
      }

      try {
        
        const response = await GetOrderById(orderId);
        const total = response.result.total_price;

        if (!total) {
          toast.error("Total amount is missing.");
          setLoading(false);
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
            setLoading(true);
              setPostPaymentLoading(true);
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
              await PostOrderDetails(orderId, orderDetailsData);

              toast.success("order palced succesfully");
              formik.resetForm();
              setTimeout(() => {
                setIsModalOpen(true);
                setLoading(false);
                setPostPaymentLoading(false);
              }, 2000);
              
            } catch (error) {
              toast.error("Payment failed.");
            } finally {
              setLoading(false);
              setPostPaymentLoading(false)
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
        setLoading(false);
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
  const handleOpenInvoice  = () => {
    if (orderId) {
      navigate(`/provider/${providerId}/menu/${menuid}/order/invoice`, {
        state: { orderId },
      });
    }
  };

  if (postPaymentLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
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
      <OrderModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOpenInvoice={handleOpenInvoice} 
      />
    </>
  );
};

export default OrderContainer;
