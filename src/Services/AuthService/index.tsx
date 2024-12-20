import axios from 'axios'
import { formData } from '../../Components/SignupComponent/type'
import { loginValues } from '../../Components/LoginComponent/type'
import { EmailValue } from '../../Containers/ForgotPasswordContainer/type'

export const SignupService = async (values: formData) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/User/signup`, values)
    return res
}

export const ResendOtpService = async (phone: string) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/User/resend-otp?phone=${phone}`)
    return res
}
export const VerifyOtpService = async (values: { phone: string, otp: string }) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/User/verify-otp`, values)
    return res
}

export const LoginService = async (values:loginValues) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/User/login`, values)
    return res
}

export const ForgotPasswordService = async (values:EmailValue) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/User/forgot-passowrd`, values)
    return res
}

export const VerifyEmailOtp = async (values: { email: string, otp: string }) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/User/verify-email-otp`, values)
    return res
}
export const ResetPasswordService = async (data:loginValues) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/User/reset-password`, data)
    return res
}

export const ResendMailOtp = async (values:EmailValue) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/User/resend-mail-otp`, values)
    return res
}