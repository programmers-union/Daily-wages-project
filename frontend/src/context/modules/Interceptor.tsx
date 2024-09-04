import axios from "axios";

export const axiosInterceptorPage = () => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // Ensure cookies are sent with requests
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
        (error.response && error.response.status === 401) ||
        (error.response && error.response.status === 400 && error.response.data === "Invalid or expired access token.")
      ) {
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const response = await axios.post(
              "http://localhost:5000/api/client/refresh-token",
              { withCredentials: true }
            );
            const { accessToken } = response.data;
            if (accessToken) {
              localStorage.setItem("accessToken", accessToken);
              axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
              originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
              return axiosInstance(originalRequest);
            }
          } catch (refreshError) {
            console.error('Refresh token error:', refreshError);
            localStorage.removeItem("accessToken");
            // Redirect to login page if refresh fails
            window.location.href = '/';
            return Promise.reject(refreshError);
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
