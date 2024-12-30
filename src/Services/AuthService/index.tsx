import { formData } from "../../Components/SignupComponent/type";
import { loginValues } from "../../Components/LoginComponent/type";
import { EmailValue } from "../../Containers/ForgotPasswordContainer/type";
import api from "../api";

export const SignupService = async (values: formData) => {
  const res = await api.post(`User/signup`, values);
  return res;
};

export const ResendOtpService = async (phone: string) => {
  const res = await api.post(`/User/resend-otp?phone=${phone}`);
  return res;
};
export const VerifyOtpService = async (values: {
  phone: string;
  otp: string;
}) => {
  const res = await api.post(`/User/verify-otp`, values);
  return res;
};

export const LoginService = async (values: loginValues) => {
  const res = await api.post(`/User/login`, values);
  return res;
};

export const ForgotPasswordService = async (values: EmailValue) => {
  const res = await api.post(`/User/forgot-passowrd`, values);
  return res;
};

export const VerifyEmailOtp = async (values: {
  email: string;
  otp: string;
}) => {
  const res = await api.post(`/User/verify-email-otp`, values);
  return res;
};
export const ResetPasswordService = async (data: loginValues) => {
  const res = await api.post(`/User/reset-password`, data);
  return res;
};

export const ResendMailOtp = async (values: EmailValue) => {
  const res = await api.post(`/User/resend-mail-otp`, values);
  return res;
};
