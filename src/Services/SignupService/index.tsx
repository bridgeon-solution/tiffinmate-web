import axios from 'axios'
interface formData{
    name:string,
    email:string,
    phone:string,
    password:string
  }
const SignupService=async(values:formData)=> {
 const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/Auth/signup`,values)
 return res
}

export default SignupService

export const ResendOtpService=async(phone:string)=> {
    const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/Auth/resend-otp?phone=${phone}`)
    return res
   }
export const VerifyOtpService=async(values:{phone:string,otp:string})=> {
    const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/Auth/verify-otp`,values)
    return res
   }
   
   