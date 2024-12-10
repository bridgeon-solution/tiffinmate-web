import axios from 'axios'

const LoginService=async(values:{email:string,password:string})=> {
 const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/Auth/login`,values)
 return res
}

export default LoginService