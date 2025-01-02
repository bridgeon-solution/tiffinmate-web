import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import OrderComponent from "../../Components/Order";
import { PostOrderDetails } from "../../Services/OrderService";
import { useParams } from "react-router-dom";
import { OrderDtailsProps } from "../../Components/Order/type";

const OrderContainer: React.FC = () => {
  const { id,menuId } = useParams();
  const providerId=id||"";
  const menuid=menuId||"";
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [orderId, setOrderId] = useState<string>();
  const [loading, setLoadnig] = useState(false);
  const [date, setDate] = useState<string>();

  const formik = useFormik({
    initialValues: {
      user_name: "",
      address: "",
      city: "",
      ph_no: "",
    },
    validationSchema: Yup.object({
      user_name: Yup.string().required("name is required"),
      address: Yup.string().required("addres is required"),
      ph_no: Yup.string()
        .required("Phone number is required")
        .matches(/^\d{10}$/, "Phone number must contain exactly 10 digits"),
      city: Yup.string().required("current location is required"),
    }),
    onSubmit: async (values) => {
      try {
        const orderDetailsData:OrderDtailsProps = {
          ...values,
          categories:selectedCategories,
          date:date!,
          provider_id:providerId,
          menu_id:menuid
        };
         await PostOrderDetails(orderId,orderDetailsData);
        setLoadnig(true);
      } catch (error) {
        
      } finally {
        setLoadnig(false);
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
    <div>
      <OrderComponent
        formData={formik.values}
        handleSubmit={formik.handleSubmit}
        handleChange={formik.handleChange}
        errors={errorDisplay}
        setSelectedCategories={setSelectedCategories}
        setOrderId={setOrderId}
        setDate={setDate}

      />
    </div>
  );
};

export default OrderContainer;
