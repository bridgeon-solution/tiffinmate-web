import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { FetchProfileService, UpdateProfileService } from "../../Services/UserService";
import ProfileComponent from "../../Components/ProfileComponet";
interface ProfileValues {
    fullName: string;
    phoneNumber: string;
    email: string;
    address: string;
    city: string;
  }
const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  address: Yup.string(),
  city: Yup.string(),
});

const ProfileContainer = () => {
    const [initialValues, setInitialValues] = useState<ProfileValues>({
        fullName: "",
        phoneNumber: "",
        email: "",
        address: "",
        city: "",
      });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("id");
        if (!id) {
          navigate("/login");
          return;
        }
        const response = await FetchProfileService(id);
        
        setInitialValues({
          fullName: response.data.result?.name || "",
          phoneNumber: response.data.result?.phone || "",
          email: response.data.result?.email || "",
          address: response.data.result?.address || "",
          city: response.data.result?.city || "",
        });
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchData();
  }, [navigate]);

  
  const handleSubmit = async (values:ProfileValues) => {
    await UpdateProfileService(values)   
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ handleSubmit, values }) => (
        <ProfileComponent handleSubmit={handleSubmit} values={values} />
      )}
    </Formik>
  );
};

export default ProfileContainer;
