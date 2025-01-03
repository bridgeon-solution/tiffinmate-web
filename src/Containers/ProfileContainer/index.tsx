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
import { ProfileValues } from "../../Components/ProfileComponet/type";
import { toast } from "react-toastify";
import { Box, CircularProgress } from "@mui/material";

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
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const id = localStorage.getItem("id");
      if (!id) {
        navigate("/login");
        return;
      }
      try {
        const response = await FetchProfileService(id);
        setInitialValues({
          fullName: response.data.result?.name || "",
          phoneNumber: response.data.result?.phone || "",
          email: response.data.result?.email || "",
          address: response.data.result?.address || "",
          city: response.data.result?.city || "",
          profileImage: response.data.result?.image,
        });
      } catch (error) {
        toast.error("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    const id = localStorage.getItem("id");
    if (!image || !id) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      const response = await UploadProfileImage(formData, id);
      setInitialValues((prev) => ({
        ...prev,
        profileImage: response.data.result,
      }));
    } catch (error) {
      toast.error("Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: ProfileValues) => {
    const id = localStorage.getItem("id");
    if (!id) {
      return;
    }
    setUpdating(true);
    try {
      await UpdateProfileService(values, id);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Error updating profile");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          {" "}
          <CircularProgress />
        </Box>
      ) : (
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
              loading={updating}
            />
          )}
        </Formik>
      )}
    </>
  );
};

export default ProfileContainer;
