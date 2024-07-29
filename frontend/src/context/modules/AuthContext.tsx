import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AuthContextProps,
  ChildrenNode,
  EmailData,
  EmailPasswordData,
  FormData,
} from "../../types/authTypes/AuthTypes";

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: ChildrenNode) => {
  const [signupForm, setSignupForm] = useState<FormData | null>(null);
  const [loginEmailTrue, setLoginEmailTrue] = useState<string | undefined>();
  const [singleEmail , setSingleEmail] = useState<string>('');

  const navigate = useNavigate();

  const SignUp = async (formData: FormData) => {
    setSignupForm(formData);
    if (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim() &&
      formData.password.trim() &&
      formData.phoneNumber.trim() !== ""
    ) {
      navigate("/otp");
      try {
        const response = await axios.post(
          "http://localhost:5000/api/client/signup",
          formData
        );
        setSingleEmail(formData.email)
        console.log("Sign-up process started", response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("sign up failed:", error.response?.data?.message);
          throw error.response?.data?.message || "sign up failed";
        } else {
          console.error("An unexpected error occurred:", error);
          throw "An unexpected error occurred";
        }
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  const EmailLogin = async (loginData: EmailData) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/client/loginMailCheck",{
        params: { loginData: JSON.stringify(loginData) },
      });
      setSingleEmail(loginData.email); 
      setLoginEmailTrue(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("email not valid:", error.response?.data?.message);
        throw error.response?.data?.message || "email not valid";
      } else {
        console.error("An unexpected error occurred:", error);
        throw "An unexpected error occurred";
      }
    }
  };

  const Login = async (loginData: EmailPasswordData) => {
    if (loginData.email.trim() && loginData.password.trim() !== "") {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/client/login",
          loginData
        );
        console.log("Login process started", response.data);
        navigate("/home");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("login failed:", error.response?.data?.message);
          throw error.response?.data?.message || "login failed";
        } else {
          console.error("An unexpected error occurred:", error);
          throw "An unexpected error occurred";
        }
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <AuthContext.Provider
      value={{ SignUp, EmailLogin, Login, signupForm, loginEmailTrue , singleEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
