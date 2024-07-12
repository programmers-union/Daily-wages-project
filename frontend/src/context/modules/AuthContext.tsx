import { createContext, useState } from 'react';
import { AuthContextProps, ChildrenNode, EmailData, EmailPasswordData, FormData } from '../../types/authTypes/AuthTypes';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: ChildrenNode) => {
  const [signupForm, setSignupForm] = useState<FormData | null>(null);
  const [loginEmailTrue, setLoginEmailTrue] = useState<string | undefined>();
  const navigate = useNavigate();

  const SignUp = async (formData: FormData) => {
    setSignupForm(formData);
    try {
      const response = await axios.post('http://localhost:5000/api/client/signup', formData);
      console.log('Sign-up process started', response.data);
    } catch (error) {
      console.error('Sign-up process failed:', error);
      throw error.response?.data?.message || 'Sign-up process failed';
    }
    navigate('/otp');
  };

  const EmailLogin = async (loginData: EmailData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/client/loginMailCheck', loginData);
      setLoginEmailTrue(response.data);
    } catch (error) {
      console.error('Email login process failed:', error);
      throw error.response?.data?.message || 'Email login process failed';
    }
  };

  const Login = async (loginData: EmailPasswordData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/client/login', loginData);
      console.log('Login process started', response.data);
      navigate('/home');
    } catch (error) {
      console.error('Login process failed:', error.Response?.data?.massage);
      throw error.response?.data?.message || 'Login process failed';
    }
  };

  return (
    <AuthContext.Provider value={{ SignUp, EmailLogin, Login, signupForm, loginEmailTrue }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
