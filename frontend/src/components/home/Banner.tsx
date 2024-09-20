import React, { useContext, useEffect, useRef, useState } from 'react';
import AdminFormContext from '../../context/modules/AdminFormContext';
import { AdminFormListData } from '../../types/AdminGategoryType';
import '../../App.css'
import AuthContext from '../../context/modules/AuthContext';
import { AuthContextProps } from '../../types/authTypes/AuthTypes';
import Success from '../success/Success';
import WorkerFormContext from '../../context/modules/WorkerFormData';
import { WorkerFormStateType } from '../../types/WorkerTypes';

const Banner: React.FC = () => {
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(''); // State for input value
  const [filteredItems, setFilteredItems] = useState<any[]>([]); // State for filtered items
  const inputRef = useRef<HTMLInputElement>(null);

  const context = useContext(AdminFormContext);
  const { passingCategoriesDataAllPage } = context as AdminFormListData;
  const { loginSuccess } = useContext(AuthContext) as AuthContextProps;
  const {  signupSuccess} = useContext(WorkerFormContext) as WorkerFormStateType;


  // Handler to set inputFocus to true when the input is clicked
  const inputClickHandler = () => {
    setInputFocus(true);
  };

  // Handler for updating the input value and filtering dropdown items
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    if (passingCategoriesDataAllPage?.subCategoryItems) {
      const filtered = passingCategoriesDataAllPage.subCategoryItems.filter((item: any) =>
        item.jobTitle.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  // Handler for selecting an item from the dropdown
  const handleSelectItem = (item: any) => {
    setInputValue(item.jobTitle); // Set the input value to the selected jobTitle
    setInputFocus(false); // Close the dropdown after selection
  };

  // Effect to detect clicks outside the input and dropdown to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setInputFocus(false); // Click outside input or dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='grid place-items-center h-screen m-auto'>
      <div className='relative flex flex-col justify-start items-center w-full'>
        <div
          className={`flex px-8 gap-6 items-center shadow-sm border border-slate-400 w-1/2 h-14 rounded-2xl ${
            inputFocus ? 'bg-gray-100 rounded-bl-2xl rounded-br-2xl border-t border-gray-400' : 'bg-transparent'
          }`}
        >
          <img
            className='w-12 h-6 border-r pr-6 border-gray-400'
            src='https://cdn-icons-png.flaticon.com/128/2811/2811806.png'
            alt='Icon'
          />
          <input
            ref={inputRef}
            className='outline-none bg-transparent w-full'
            type='text'
            value={inputValue} // Controlled input
            onChange={handleInputChange} // Update input value and filter items
            onClick={inputClickHandler} // Open dropdown on click
            placeholder={filteredItems.length > 0 ? 'no result ' : ' search something'}
          />
        </div>
        <div>
          <p className='text-[12px] mt-6 w-3/4 m-auto text-center'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, animi quam ipsa quidem modi molestiae tempore id? Libero, eligendi unde.
          </p>
        </div>

        {inputFocus && (
          <ul className=' absolute bg-gray-100 max-h-40 h-fit overflow-y-auto w-1/2 flex flex-col pb-3 gap-1 border-l border-b border-r border-gray-400 rounded-br-2xl rounded-bl-2xl pt-2 -bottom-[87px]'>
            {filteredItems.length > 0 && (
              filteredItems.map((item: any, index) => (
                <li
                  key={index}
                  className='cursor-pointer border-b text-[11px] border-gray-200 py-1 px-6 hover:bg-gray-200'
                  onClick={() => handleSelectItem(item)} 
                >
                  {item.jobTitle} 
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      {loginSuccess.length > 0 && <Success success={loginSuccess} />}
      {signupSuccess.length > 0 && <Success success={signupSuccess} />}
    </div>
  );
};

export default Banner;
