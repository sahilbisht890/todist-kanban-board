import axios from 'axios';
import { toast } from 'react-hot-toast'; // Import toast

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
      console.log('response',response);
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const skipErrorToastEndpoints = ['/auth/check-auth', '/auth/refresh-token'];

      if (skipErrorToastEndpoints.some((endpoint) => config.url.includes(endpoint))) {
        return Promise.reject(error);
      }

      if (status === 401) {
        console.error('Unauthorized! Redirecting to login...');
        toast.error(data.message);
      } else if (data?.message) {
        toast.error(data.message); 
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } else {
      toast.error('Network error. Please check your connection.'); 
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
