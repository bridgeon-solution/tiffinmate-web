import axios from "axios";
import { ProfileValues } from "../../Components/ProfileComponet/type";

export const FetchProfileService = async (id: string | null) => {
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/User/id?id=${id}`
  );
  return res;
};

export const UpdateProfileService = async (
  values: ProfileValues,
  id: string
) => {
  const payload = {
    name: values.fullName,
    phone: values.phoneNumber,
    email: values.email,
    address: values.address,
    city: values.city,
    image: values.profileImage,
  };
  const res = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/Upload/${id}`,
    payload
  );
  return res;
};

export const UploadProfileImage = async (FormData: FormData, id: string) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/Upload/image?id=${id}`,
    FormData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res;
};

export const FetchMenuDetails = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/FoodItem/fooditem`
  );
  return res;
};

export const FetchMenu = async () => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/Menu`);
  return res;
};
