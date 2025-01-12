import LoginComponent from "../../Components/LoginComponent";
import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { LoginService } from "../../Services/AuthService";
import { loginValues } from "../../Components/LoginComponent/type";
import { useState } from "react";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
function LoginContainer() {
  const initialValues: loginValues = { email: "", password: "" };
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (values: loginValues) => {
    setLoading(true);
    try {
      const res = await LoginService(values);
      if (res.data.status == "success") {
        localStorage.setItem("id", res.data.result.id);
        localStorage.setItem("token", res.data.result.token);
        localStorage.setItem("user", res.data.result.name);
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.warn(res.data.error_message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Formik<loginValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => <LoginComponent loading={loading} />}
      </Formik>
    </>
  );
}

export default LoginContainer;
