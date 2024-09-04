import React, { createContext, ReactNode, useState, useCallback } from "react";
import axios from "axios";
import { OtpAndSignupType, OtpContextType } from "../../types/Otp";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const OtpContext = createContext<OtpContextType | undefined>(undefined);

const OtpProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [forgotCheckBox, setForgotCheckBox] = useState<number>(0);
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const [isCheckClientOrWorker, setIsCheckClientOrWorker] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const getEndpoint = useCallback(
    (path: string) =>
      isCheckClientOrWorker
        ? `http://localhost:5000/api/employee/${path}`
        : `http://localhost:5000/api/client/${path}`,
    [isCheckClientOrWorker]
  );

  const handleResponse = (response:any, successMessage: string) => {
    if (response && response.data) {
      const { accesstoken, otpVerified } = response.data;

      if (typeof accesstoken === "string") {
        localStorage.setItem("accessToken", accesstoken);
      } else {
        console.error("Access token is not a string:", accesstoken);
      }

      if (otpVerified) {
        if (isChangePassword) {
          navigate("/change-password");
        } else {
          navigate("/home");
          swal({
            title: "Success!",
            text: successMessage,
            icon: "success",
            timer: 3000,
          });
        }
      } else {
        console.error("OTP not verified:", response.data);
      }
    } else {
      console.error("Unexpected response format:", response);
    }
  };

  const OTPSubmit = async (otp: OtpAndSignupType) => {
    try {
      const response = await axios.patch(getEndpoint("verify-otp"), otp, {
        withCredentials: true,
      });
      handleResponse(response, "Password changed");
    } catch (error) {
      console.error("OTP submit error:", error);
    }
  };

  const OTPReset = async (otp: OtpAndSignupType) => {
    console.log(otp,'some some otp top')
    try {
      const response = await axios.post('http://localhost:5000/api/common/resend-otp', {
        otp,
        forgotCheckBox,
      });
      console.log("Reset OTP started:", response.data);
      // Update state as needed
    } catch (error) {
      console.error("Reset OTP failed:", error);
    }
  };

  const ForgotPassword = async (forgotPassword: string) => {
    if (forgotPassword.trim()) {
      navigate("/otp");
    }
    try {
      const response = await axios.get('http://localhost:5000/api/common/forgot-password', {
        params: { forgotPassword, forgotCheckBox },
      });
      console.log("Forgot password request started:", response.data);
    } catch (error) {
      console.error("Forgot password request failed:", error);
    }
  };

  const ForgotPasswordOtp = async (forgotPasswordOtp: OtpAndSignupType) => {
    try {
      const response = await axios.post(
        getEndpoint("forgot-password-otp"),
        { forgotPasswordOtp }
      );
      console.log("Forgot password OTP request started:", response.data);
    } catch (error) {
      console.error("Forgot password OTP request failed:", error);
    }
  };

  const ChangePassword = async (changePass: OtpAndSignupType) => {
    try {
      const response = await axios.patch('http://localhost:5000/api/common/change-password',
        {
          newPassword: changePass.changePass,
          email: changePass.email,
        },
        { withCredentials: true }
      );
      navigate("/home");
      swal({
        title: "Success!",
        text: "Password changed",
        icon: "success",
        timer: 3000,
      });
      console.log("Password change request successful:", response.data);
    } catch (error) {
      console.error("Password change request failed:", error);
    }
  };

  return (
    <OtpContext.Provider
      value={{
        OTPSubmit,
        OTPReset,
        ForgotPassword,
        ForgotPasswordOtp,
        setIsChangePassword,
        ChangePassword,
        setForgotCheckBox,
        setIsCheckClientOrWorker,
        isCheckClientOrWorker,
      }}
    >
      {children}
    </OtpContext.Provider>
  );
};

export { OtpContext, OtpProvider };
