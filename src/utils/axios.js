import axios from "axios";
import { toast } from "react-hot-toast";

const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 60000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data?.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      const skipErrorToastEndpoints = [
        "/auth/check-auth",
        "/auth/refresh-token",
      ];

      if (
        error.config &&
        skipErrorToastEndpoints.some((endpoint) =>
          error.config.url.includes(endpoint)
        )
      ) {
        return Promise.reject(error);
      }

      if (status === 401) {
        toast.error(data?.message || "Unauthorized");
      } else if (data?.message) {
        toast.error(data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } else {
      toast.error("Network error. Please check your connection.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
