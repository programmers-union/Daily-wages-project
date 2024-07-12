import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/modules/AuthContext";
import { AuthContextProps, EmailData, EmailPasswordData } from '../../types/authTypes/AuthTypes';
import AuthError from "../../components/error/AuthError";

const Login: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string>('');
  const [emailData, setEmailData] = useState<EmailData>({ email: "" });
  const [logFormData, setLogFormData] = useState<EmailPasswordData>({
    email: "",
    password: ""
  });

  const { EmailLogin, Login: contextLogin, loginEmailTrue } = useContext(AuthContext) as AuthContextProps;

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
      } catch (error) {
        setError(error as string);
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
                {isActive && <AuthError item={error} />}
              </>
            )}
            <div className="my-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-black"
              >
                {isActive ? "Submit" : "Continue"}
              </button>
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
                src="https://cdn-icons-png.flaticon.com/128/179/179309.png"
                alt="Apple Logo"
                className="w-5 h-5 mr-2"
              />
              Continue with Apple
            </button>
            <button className="bg-black w-full justify-center text-white text-[12px] helvetic py-2 px-4 rounded flex items-center">
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
    </div>
  );
};

export default Login;
