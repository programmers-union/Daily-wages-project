import React, { useContext, useState } from 'react';
import { OtpAndSignupType, OtpContextType } from '../../../types/Otp';
import { OtpContext } from '../../../context/modules/OtpContext';
import { AuthContextProps } from '../../../types/authTypes/AuthTypes';
import AuthContext from '../../../context/modules/AuthContext';

const ChangePassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [error, setError] = useState('');

  const { ChangePassword } = useContext(OtpContext) as OtpContextType;
  const {  singleEmail  } = useContext(AuthContext) as AuthContextProps;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== verifyPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) { 
      setError('Password must be at least 6 characters long');
      return;
    }

   
    const changePassData: OtpAndSignupType = {
      otp: '', 
      signup: null, 
      email: singleEmail || '', 
      changePass: password,
    };

    // Pass the object to ChangePassword
    ChangePassword(changePassData);
    setError('');
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset your password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
    
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="verify-password" className="block text-sm font-medium text-gray-700">
                  Verify Password
                </label>
                <div className="mt-1">
                  <input
                    id="verify-password"
                    name="verify-password"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Reset Password
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;