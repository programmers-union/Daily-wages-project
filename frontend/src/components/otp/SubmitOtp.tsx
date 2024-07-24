import React, { useState, useEffect, useRef, useContext } from "react";
import { UseOtp } from "../../context/modules/UseOtp";
import AuthContext from "../../context/modules/AuthContext";
import { AuthContextProps } from "../../types/authTypes/AuthTypes";
import { OtpAndSignupType, OtpContextType } from "../../types/Otp";
import { OtpContext } from "../../context/modules/OtpContext";

const OtpPage: React.FC = () => {
  const [otpData, setOtpData] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(20);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    const newOtpData = [...otpData];
    newOtpData[index] = value;
    setOtpData(newOtpData);

    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === "Backspace" &&
      index > 0 &&
      !inputRefs.current[index]?.value
    ) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const { OTPSubmit, OTPReset } = UseOtp();

  const { singleEmail } = useContext(AuthContext) as AuthContextProps;
  const { ForgotPasswordOtp } = useContext(OtpContext) as OtpContextType;

  const otpResentHandle = () => {
    const otpAndSignup: OtpAndSignupType = {
      otp: "",
      signup: singleEmail,
    };
    OTPReset(otpAndSignup);
    setTimeLeft(60);
  };

  const otpSubmitHandle = () => {
    const otpString = otpData.join("");
    const otpAndSignup: OtpAndSignupType = {
      otp: otpString,
      signup: singleEmail,
    };
    ForgotPasswordOtp(otpAndSignup);
    OTPSubmit(otpAndSignup);
  };

  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <div className="bg-custom-gradient">
      <div className="flex flex-col justify-center w-full items-center h-screen m-auto max-w-sm">
        <div>
          <h1 className="text-16 text-center font-semibold">Verify OTP</h1>
          <p className="text-center w-full m-auto text-[12px] mt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            veritatis sed, labore earum esse nulla?
          </p>
          <div className="mt-4 text-center text-gray-500">00:{timeLeft}</div>
        </div>
        <div className="mt-10 flex gap-6">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              maxLength={1}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="input outline-none border-2 border-gray-200 w-16 h-16 text-center rounded-md appearance-none"
              type="number"
              value={otpData[index]}
            />
          ))}
        </div>
        <div className="mt-16 flex justify-between w-full">
          {timeLeft === 0 && (
            <button
              onClick={otpResentHandle}
              className="bg-slate-500 px-8 py-2 rounded-full text-white text-sm hover:bg-slate-900 ml-auto"
            >
              Resend
            </button>
          )}
          {timeLeft !== 0 && (
            <button
              onClick={otpSubmitHandle}
              className="bg-slate-500 px-8 py-2 rounded-full text-white text-sm hover:bg-slate-900 mr-auto"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
