import axios from 'axios'
import React from 'react'

const LoginService=async(values:{email:string,password:string})=> {
 const res=await axios.post("https://localhost:7009/api/Auth/login",values)
 return res
}

export default LoginService