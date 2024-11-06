import axios, { AxiosInstance } from 'axios';

export const createAxiosInstance = (): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response &&
        (error.response.status === 401 ||
          (error.response.status === 400 && error.response.data === "Invalid or expired access token."))
      ) {

      if ( !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await axios.post(
            "http://localhost:5000/api/common/refresh-token",
            {},
            { withCredentials: true }
          );

          const { accessToken } = response.data;
          if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return axiosInstance(originalRequest);
          } else {
            throw new Error('Failed to refresh access token');
          }
        } catch (refreshError) {
          console.error('Refresh token error:', refreshError);
          localStorage.removeItem("accessToken");
          window.location.href = '/'; 
          return Promise.reject(refreshError);
        }
      }else {
        localStorage.removeItem("accessToken");
        window.location.href = '/';
        return Promise.reject(new Error('Failed to refresh access token'));
      }
    }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};




