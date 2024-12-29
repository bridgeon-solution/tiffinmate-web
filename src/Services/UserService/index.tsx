import { ProfileValues } from "../../Components/ProfileComponet/type";
import api from "../api";

export const FetchProfileService = async (id: string | null) => {
  const res = await api.get(`/User/id?id=${id}`);
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
  const res = await api.put(`/Upload/${id}`, payload);
  return res;
};

export const UploadProfileImage = async (FormData: FormData, id: string) => {
  const res = await api.post(`/Upload/image?id=${id}`, FormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const FetchMenuDetails = async (providerId: string, menuid: string) => {
  const res = await api.get(
    `FoodItem/providerid/${providerId}?menuId=${menuid}`
  );
  return res;
};

export const FetchMenu = async (providerId: string) => {
  const res = await api.get(`/FoodItem/menu?providerId=${providerId}`);
  return res;
};
