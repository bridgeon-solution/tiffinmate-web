import axios from 'axios'

const LoginService=async(values:{email:string,password:string})=> {
 const res=await axios.post("https://localhost:7009/api/Auth/login",values)
 return res
}

export default LoginService