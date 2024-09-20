import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/modules/AuthContext";
import { AuthContextProps, EmailData, EmailPasswordData } from '../../types/authTypes/AuthTypes';
import AuthError from "../../components/error/AuthError";
import { Link } from "react-router-dom";
// import swal from 'sweetalert'; // Import from 'sweetalert'
import { OtpContextType } from "../../types/Otp";
import { OtpContext } from "../../context/modules/OtpContext";
import Fail from "../../components/faild/Fail";
// import 'sweetalert/dist/sweetalert.css';


const Login: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string>('');
  const [emailData, setEmailData] = useState<EmailData>({ email: "" });
  const [logFormData, setLogFormData] = useState<EmailPasswordData>({
    email: "",
    password: ""
  });
  

  const { EmailLogin, Login: contextLogin,loginError,  loginEmailTrue } = useContext(AuthContext) as AuthContextProps;
  const { setIsChangePassword } = useContext(OtpContext) as OtpContextType;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogFormData((prev) => ({ ...prev, [name]: value }));
    setEmailData((prev) => ({ ...prev, [name]: value }));
  };

  const loginSubmitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isActive) {
      // login with email and password
      try {
        await contextLogin(logFormData);
        // swal("Login Success!", "You have successfully logged in!", "success");
        // swal({
        //   title: "Login Success!",
        //   text: "You have successfully logged in!",
        //   icon: "success", // or "error", "warning", "info"
        //   timer: 3000, // automatically close the alert after 3 seconds
        // });
      } catch (error) {
        setError(error as string);
        // swal("Error", "There was a problem with your login.", "error");
      }
    } else {
      // login with email only
      try {
        await EmailLogin(emailData);
      } catch (error) {
        setError(error as string);
      }
    }
  };


  useEffect(() => {
    if (loginEmailTrue) {
      setIsActive(true);
    }
  }, [loginEmailTrue]);

  return (
    <div className="">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-slate-800 h-screen w-full"></div>
        <div className="p-8 w-full">
          <h2 className="text-2xl font-normal mb-6 text-center">Login</h2>
          <p className="w-3/4 m-auto text-xs helvetic">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
            corporis accusantium sunt, a magni quod.
          </p>
          <form onSubmit={loginSubmitData} className="w-3/4 m-auto">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-[12px] text-gray-700 mt-10 helvetic"
              >
                Email
              </label>
              <input
                onChange={onChange}
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full border-b bg-transparent border-gray-300 rounded py-2 px-3 outline-none"
                required
              />
            </div>
            {!isActive && <AuthError item={error} />}
            {isActive && logFormData.email.trim() !== "" && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-[12px] helvetic"
                  >
                    Password
                  </label>
                  <input
                    onChange={onChange}
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 block w-full border-b bg-transparent border-gray-300 rounded py-2 px-3 outline-none"
                    required
                  />
                </div>
                <div className="flex justify-between items-center">
                  <Link to='/forgot-password'>
                <h6  onClick={()=>setIsChangePassword(true)} className="text-blue-600 underline text-xs">Forgotten your password?</h6>
                  </Link>
                {isActive && <AuthError item={error} />}
                </div>
              </>
            )}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-black"
              >
                {isActive ? "Submit" : "Continue"}
              </button>
            </div>
            <div className="flex justify-between items-center mt-2  underline text-xs ">
            <Link to="/sign-up" className="hover:text-blue-500" >Create a new Accout</Link>
            <Link to="/worker-form" className="hover:text-blue-500">Become a daily wager</Link>

            </div>
          </form>
          <div className="flex items-center mb-4 w-3/4 m-auto">
            <div className="border-b border-gray-300 w-full"></div>
            <div className="text-gray-500 mx-4">or</div>
            <div className="border-b border-gray-300 w-full"></div>
          </div>
          <div className="flex justify-center items-center mb-4 w-3/4 m-auto">
            <button className="bg-black w-full text-white py-2 text-[12px] helvetic px-4 rounded mr-2 flex justify-center items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/15047/15047435.png"
                alt="Apple Logo"
                className="w-5 h-5 mr-2"
              />
              Continue with Facebook
            </button>
            <button 
            onClick={()=>{ window.location.href='http://localhost:5000/api/auth/google',{
              withCredentials: true,
            }}} className="bg-black w-full justify-center text-white text-[12px] helvetic py-2 px-4 rounded flex items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/281/281764.png"
                alt="Google Logo"
                className="w-5 h-5 mr-2"
              />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
      {loginError.length > 0 && <Fail error={loginError} />}
      
    </div>
  );
};

export default Login;
