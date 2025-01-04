import * as Yup from "yup";
import { Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import ResetPasswordComponent from "../../Components/ResetPasswordComponent";
import { ResetPasswordService } from "../../Services/AuthService";
import { toast } from "react-toast";
import { useState } from "react";

interface FormValues {
  password: string;
}
const validationSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
function ResetPasswordContainer() {
  const location = useLocation();
  const [loading, setLoding] = useState<boolean>(false);
  const initialValues: FormValues = { password: "" };
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const email = params.get("email") as string;
  const handleSubmit = async (values: FormValues) => {
    const data = { email, ...values };
    setLoding(true);
    try {
      await ResetPasswordService(data);
      toast.success("Password succesfully updated");
      navigate("/login");
    } catch {
      toast.error("Failed to update password");
    } finally {
      setLoding(false);
    }
  };
  return (
    <>
      <Formik<FormValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => <ResetPasswordComponent loading={loading} />}
      </Formik>
    </>
  );
}

export default ResetPasswordContainer;
