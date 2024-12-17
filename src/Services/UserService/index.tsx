import axios from "axios";

export const FetchProfileService = async (id: string | null) => {
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/User/id?id=${id}`
  );
  return res;
};
interface ProfileValues {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  profileImage: string;
}

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
