import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const refreshToken = async () => {
  try {
    const refresh_token = localStorage.getItem("refresh_token");
    if (!refresh_token) {
      throw new Error("Refresh token not found. Please log in again.");
    }
    const response = await axios.post("https://localhost:7009/api/v1/Refresh", {
      refresh_token,
    });
    const { token } = response.data.result;
    localStorage.setItem("token", token);
    return token; 
  } catch (error) {
    localStorage.clear();
    throw error;
  }
};

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    const refresh_Token = localStorage.getItem("refresh_token");
    if(refresh_Token){
      const RefreshpayloadBase64 = refresh_Token.split(".")[1];
      const Refreshpayload = JSON.parse(atob(RefreshpayloadBase64));
      const currentTime = Math.floor(Date.now() / 1000);
      if(Refreshpayload.exp && currentTime > Refreshpayload.exp){
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        toast.error("Session expired. Please login again.");
      }

    }

    if (token) {
   
      const payloadBase64 = token.split(".")[1];
      const payload = JSON.parse(atob(payloadBase64));
      const currentTime = Math.floor(Date.now() / 1000);

      if (payload.exp && currentTime > payload.exp) {
        localStorage.removeItem("token");

        const newToken = await refreshToken();
        config.headers["Authorization"] = `Bearer ${newToken}`;
      } else {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // const status = error.response.status;
      // switch (status) {
      //   case 400:
      //     toast.error("Bad Request");
      //     break;
      //   case 401:
      //     toast.error("Unauthorized: Please log in to continue.");
      //     break;
      //   case 500:
      //     toast.error("Internal Server Error");
      //     break;
      //   default:
      //     toast.error(`Error: ${status}`);
      // }
    }
    return Promise.reject(error);
  }
);

export default api;

