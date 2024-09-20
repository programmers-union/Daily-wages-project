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
// import Success from "../../components/success/Success";

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: ChildrenNode) => {
  const [signupForm, setSignupForm] = useState<FormData | null>(null);
  const [loginEmailTrue, setLoginEmailTrue] = useState<string | undefined>();
  const [singleEmail , setSingleEmail] = useState<string>('');
  const [signupError , setSignupError] = useState<string >('');
  const [ isCheckLoginClientOrEmployee, setIsCheckLoginClientOrEmployee] = useState<boolean | undefined>(false)
  const [loginSuccess, setLoginSuccess] = useState<string>('')
  const [loginError, setLoginError] = useState<string>('')

  const navigate = useNavigate();

  const SignUp = async (formData: FormData) => {
    setSignupForm(formData);
  
    // Ensure all fields are filled and trimmed
    if (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim() &&
      formData.password.trim() &&
      formData.phoneNumber.trim() !== ""
    ) {
      try {
        // Make the signup request
        const response = await axios.post("http://localhost:5000/api/client/signup", formData);
        navigate("/otp");
        const { data } = response;
        setIsCheckLoginClientOrEmployee(data);
        setSingleEmail(formData.email);
      } catch (error) {
        // Handle Axios-specific errors
        if (axios.isAxiosError(error)) { 
          const errorMessage = error.response?.data?.msg;
          setSignupError(errorMessage);
          console.error("Sign up failed:", errorMessage);
        } else {
          // Handle unexpected errors
          setSignupError("An unexpected error occurred");
          console.error("An unexpected error occurred:", error);
        }
      }
    } else {
      // Show alert if any of the required fields are missing
      alert("Please fill all the fields");
    }
  };
  

  const EmailLogin = async (loginData: EmailData) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/common/login-mail-check",{
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
          "http://localhost:5000/api/common/login",
          loginData,{
            withCredentials: true,
          }
        );
        console.log("Login process started", response.data);
        localStorage.setItem("accessToken",response.data.accesstoken);
        setIsCheckLoginClientOrEmployee(response.data.isCheck);
        setLoginSuccess('login successful')
          navigate("/home");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setLoginError(error.response?.data?.msg)
          console.error("login failed:", error.response?.data?.msg);
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
      value={{ SignUp, EmailLogin, Login, loginSuccess,loginError, signupForm, signupError, loginEmailTrue , singleEmail ,isCheckLoginClientOrEmployee }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
