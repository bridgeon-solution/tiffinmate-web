import { useState } from "react";
import SignupComponent from "../../Components/SignupComponent";
import * as Yup from "yup";
import { Formik } from "formik";
import { Box, Modal, Typography } from "@mui/material";
import OTPInput, { ResendOTP } from "otp-input-react";
import StyledButton from "../../Atoms/Button";
import { useNavigate } from "react-router-dom";
import {
  ResendOtpService,
  SignupService,
  VerifyOtpService,
} from "../../Services/AuthService";
import { formData } from "../../Components/SignupComponent/type";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "password must match")
    .required("confirm password is required"),
});

function SignupContainer() {
  const [modal, setModal] = useState<boolean>(false);
  const [OTP, setOTP] = useState("");
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues: formData = {
    name: "",
    email: "",
    phone: "",
    password: "",
  };
  const navigate = useNavigate();

  const handleSubmit = async (values: formData) => {
    setLoading(true);
    try {
      const res = await SignupService(values);
      setPhone(values.phone);
      if (res.data.status === "success") {
        setModal(true);
      } else {
        toast.warn(res.data.error_message);
      }
      return res.data;
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setModal(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
    outline: "none",
  };

  const backdropStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => <SignupComponent loading={loading} />}
      </Formik>

      <Modal open={modal} onClose={handleClose} sx={backdropStyle}>
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
          >
            Verify Your Phone Number
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mb: 3, textAlign: "center" }}
          >
            We've sent an SMS with an activation code to your phone{" "}
            <strong>{phone}</strong>
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <OTPInput
              value={OTP}
              onChange={setOTP}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
              inputStyles={{
                width: 50,
                height: 50,
                fontSize: "1.2rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
                textAlign: "center",
              }}
            />
            <ResendOTP
              onResendClick={async () => {
                setLoading(true);
                try {
                  await ResendOtpService(phone);
                  toast.success("OTP send successfully!");
                } catch (error) {
                  toast.error("Failed to resend OTP");
                } finally {
                  setLoading(false);
                }
              }}
            />
            <StyledButton
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
              onClick={async () => {
                setLoading(true);
                try {
                  const res = await VerifyOtpService({ phone, otp: OTP });
                  if (res.data.result === true) {
                    toast.success("registered successfully!");
                    handleClose();
                    navigate("/login");
                  }
                } catch (error) {
                  toast.error("OTP verification failed");
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </StyledButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default SignupContainer;
