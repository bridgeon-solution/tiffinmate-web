import axios from 'axios'

interface formData {
    name: string,
    email: string,
    phone: string,
    password: string
}
export const SignupService = async (values: formData) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/Auth/signup`, values)
    return res
}

export const ResendOtpService = async (phone: string) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/Auth/resend-otp?phone=${phone}`)
    return res
}
export const VerifyOtpService = async (values: { phone: string, otp: string }) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/Auth/verify-otp`, values)
    return res
}

export const LoginService = async (values: { email: string, password: string }) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/Auth/login`, values)
    return res
}

export const ForgotPasswordService = async (values: { email: string }) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/Auth/forgot-passowrd`, values)
    return res
}

export const VerifyEmailOtp = async (values: { email: string, otp: string }) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/Auth/verify-email-otp`, values)
    return res
}
export const ResetPasswordService = async (data: { email: string, password: string }) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/Auth/reset-password`, data)
    return res
}

export const ResendMailOtp = async (values: { email: string }) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/Auth/resend-mail-otp`, values)
    return res
}