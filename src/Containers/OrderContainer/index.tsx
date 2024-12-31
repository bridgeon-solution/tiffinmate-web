import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { PostOrderDetails } from '../../Services/OrderService';



const OrderContainer:React.FC = () => {

    const [loading,setLoadnig]=useState(false);
    const formik = useFormik({
        initialValues: {
          name: "",
          address: "",
          city:"",
          phno:""
        },
        validationSchema: Yup.object({
          name: Yup.string().required("name is required"),
          address: Yup.string().required("addres is required"),
          phno: Yup.string().required("phone no is required"),
          city: Yup.string().required("current location is required") .min(6, "phone no must contain 10 values")
          .max(6, "phone no maximum 10 values"),
        }),
        onSubmit: async () => {
          try {
            setLoadnig(true);
            const response = await PostOrderDetails();
            
          } catch (error) {
            toast.error("something went wrong");
          } finally {
            setLoadnig(false);
          }
        },
      });
      const errorDisplay = {
        name:
          formik.touched.name && formik.errors.name ? formik.errors.name : "",
        address:
          formik.touched.address && formik.errors.address
            ? formik.errors.address
            : "",
        city:
            formik.touched.city&& formik.errors.city ? formik.errors.city : "",
        phno:
            formik.touched.phno && formik.errors.phno ? formik.errors.phno : "",
      };
    
      
  return (
    <div>
      
    </div>
  )
}

export default OrderContainer
