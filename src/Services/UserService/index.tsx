import axios from "axios"

export const FetchProfileService = async (id:string) => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/User/id?id=${id}`)
    return res
}
interface ProfileValues {
    fullName: string;
    phoneNumber: string;
    email: string;
    address: string;
    city: string;
  }
export const UpdateProfileService = async (values:ProfileValues) => {
    const id=localStorage.getItem("id")
    const payload = {
        name: values.fullName,      
        phone: values.phoneNumber,   
        email: values.email,
        address: values.address,
        city: values.city,
      };
    const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/User/id?id=${id}`,payload)
    return res
}