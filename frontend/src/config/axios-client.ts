import axios from "axios";
import { ENV } from "./constants";
import { supabase } from "./supbase.client";

// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = (await supabase.auth.getSession()).data.session
      ?.access_token;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/*axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.response.data.error.type === "INVALID_TOKEN" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const token = StorageUtil.getRefreshToken();
      if (token) {
        const data = await AuthApi.refreshToken(token);
        StorageUtil.saveAccessToken(data.accessToken);
        StorageUtil.saveRefreshToken(data.session.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } else {
        return Promise.reject(error);
      }
    }

    const errorMessage = error.response.data.error.message;
    toast.error(errorMessage);

    return Promise.reject(error);
  },
);
*/

export default axiosInstance;
