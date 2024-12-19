import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
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
      const status = error.response.status;
      switch (status) {
        case 400:
          console.error("Bad Request");
          break;
        case 401:
          console.error("Unauthorized: Please log in to continue.");
          break;
        case 500:
          console.error("Internal Server Error");
          break;
        default:
          console.error(`Error: ${status}`);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
