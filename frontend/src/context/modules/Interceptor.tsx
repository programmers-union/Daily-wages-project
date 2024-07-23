import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

interface JwtPayload {
  exp?: number;
}

const Interceptor = async (): Promise<string | null> => {
  const getToken = (): string | null => localStorage.getItem('accessToken');
  const setToken = (token: string): void => localStorage.setItem('accessToken', token);
  const getRefreshToken = (): string | null => localStorage.getItem('refreshToken');

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp ? decoded.exp < now : true;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return null;

    try {
      const response = await axios.post('/api/client/refreshToken', { refreshToken });
      const newAccessToken = response.data.accessToken;
      setToken(newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  };

  let token = getToken();

  if (!token) return null;

  if (isTokenExpired(token)) {
    token = await refreshAccessToken();
  }

  return token;
};

// Axios interceptor setup
axios.interceptors.request.use(
  async (config) => {
    const token = await Interceptor();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default Interceptor;
