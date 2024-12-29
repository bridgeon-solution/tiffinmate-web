import api from "../api";

export const fetchProvider = async () => {
  const res = await api.get(`/Provider`);
  return res.data;
};

export const fetchApprovedProviderDetails = async () => {
  const res = await api.get(`/Provider/details`);
  return res.data;
};
export const fetchProviderDetails = async (providerId: string) => {
  const res = await api.get(`/Provider/${providerId}/details`);
  return res.data;
};

export const fetchReviewsOfProvider = async (providerId: string) => {
  const res = await api.get(`/Provider/${providerId}/reviews`);
  return res.data;
};
export const fetchProviderReview = async (providerId: string) => {
  const res = await api.get(`Provider/${providerId}/reviews`);
  return res.data;
};

export const provideReview = async (values: any) => {
  const res = await api.post(`/Provider/review`, values);
  return res.data;
};

export const CalculateTotal = async (
  date: string,
  categories: string[],
  providerId: string,
  menuId: string,
  is_subscription: boolean
) => {
  const res = await api.post(
    `/FoodItem/total-amount?is_subscription=${is_subscription}`,
    { date, providerId, menuId, categories }
  );
  return res;
};
