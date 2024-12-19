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
  console.log(res)
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
  console.log(res.data);
  return res.data;
};
