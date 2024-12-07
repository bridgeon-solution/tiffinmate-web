import axios from 'axios'
import React from 'react'
interface formData{
    name:string,
    email:string,
    phone:string,
    password:string
  }
const SignupService=async(values:formData)=> {
 const res=await axios.post("https://localhost:7009/api/Auth/signup",values)
 return res
}

export default SignupService

export const ResendOtpService=async(phone:string)=> {
    const res=await axios.post(`https://localhost:7009/api/Auth/resend-otp?phone=${phone}`)
    return res
   }
export const VerifyOtpService=async(values:{phone:string,otp:string})=> {
    const res=await axios.post("https://localhost:7009/api/Auth/verify-otp",values)
    return res
   }
   
   