import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FetchProfileService,
  UpdateProfileService,
  UploadProfileImage,
} from "../../Services/UserService";
import ProfileComponent from "../../Components/ProfileComponet";
interface ProfileValues {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  profileImage: string;
}
const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
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
    profileImage: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
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
        profileImage: response.data.result?.image,
      });
    };

    fetchData();
  }, [navigate]);

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    const id = localStorage.getItem("id");
    if (!image || !id) return;
    const formData = new FormData();
    formData.append("image", image);
    const response = await UploadProfileImage(formData, id);
    setInitialValues((prev) => ({
      ...prev,
      profileImage: response.data.result,
    }));
  };

  const handleSubmit = async (values: ProfileValues) => {
    const id = localStorage.getItem("id");
    if (!id) {
      return;
    }
    await UpdateProfileService(values, id);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ handleSubmit, values }) => (
        <ProfileComponent
          handleSubmit={handleSubmit}
          values={values}
          handleUploadImage={handleUploadImage}
        />
      )}
    </Formik>
  );
};

export default ProfileContainer;
