import { MuiTelInput } from 'mui-tel-input';
import React, { ChangeEvent, useContext, useState } from 'react';
import { OtpContext } from '../../../context/modules/OtpContext';
import { ForgotPasswordType, OtpContextType } from '../../../types/Otp';
import AuthContext from '../../../context/modules/AuthContext';
import { AuthContextProps } from '../../../types/authTypes/AuthTypes';
import AuthError from '../../../components/error/AuthError';

const CheckEmailAndPhone = () => {
  const [method, setMethod] = useState<number>(1);
  const [value, setValue] = useState('');
  const [errorHandle , setErrorHandle ] = useState<string>('')


  const { ForgotPassword } = useContext(OtpContext) as ForgotPasswordType;
  const {  singleEmail  } = useContext(AuthContext) as AuthContextProps;
  const { setForgotCheckBox } = useContext(OtpContext) as OtpContextType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        if(singleEmail === value){
          ForgotPassword(value);
          setForgotCheckBox(method)
        }else if(value.includes('+') === true ){
          ForgotPassword(value);
          setForgotCheckBox(method)
        }else{
          setErrorHandle('not valid')
        }
     } catch (error) {
       console.log(error, 'error');
     }
  };

  const forgotHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setMethod(Number(e.target.value));
    
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            No worries, we'll send you reset instructions.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md  -space-y-px">
            <div className="flex gap-4 justify-center my-6">
              <input onChange={forgotHandle} value={1} type="radio" name="eORp" checked={method === 1} /> Email
              <input onChange={forgotHandle} value={2} type="radio" name="eORp" checked={method === 2} /> Phone number
            </div>
            <div>
              <label htmlFor="reset-value" className="sr-only">
                {method === 1 ? 'Email address' : 'Phone number'}
              </label>
              {method === 1 ? (
                <input
                  id="reset-value"
                  name="reset-value"
                  type='email'
                  required
                  className="appearance-none rounded relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder='Email address'
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              ) : (
                <MuiTelInput
                  value={value}
                  onChange={(number) => setValue(number)}
                  className="mt-1 block w-full text-[14px] helvetic border-b bg-transparent border-gray-300 rounded py-2 px-3 outline-none"
                  defaultCountry="IN"
                />
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send
            </button>
          </div>
        </form>
        <AuthError item={errorHandle} />
      </div>
    </div>
  );
};

export default CheckEmailAndPhone;
