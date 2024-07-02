import React, { useState, useEffect } from 'react';

const Banner: React.FC = () => {
  const [index, setIndex] = useState(0);
  const phrases = ["walk my dog", "talk to me", "fix my tap", "like my pics"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 700); // Adjusted interval for faster animation

    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <>
      <div>
        <div className='px-5 pt-3 flex justify-between items-center bg-[#fffcf2]'>
          <p className='font-bold text-[1.5rem]'>DW</p>
          <div className='flex gap-2'> 
            <p className='text-sm px-6 py-1 cursor-pointer hover:bg-slate-900 hover:text-white  border rounded-sm '>Log In</p>
          <p className='text-sm px-6 py-1 cursor-pointer hover:bg-slate-900 hover:text-white   border  rounded-sm '>Sign Up</p>
          </div>
        </div>
        <div className='h-[80vh] flex justify-center items-center bg-[#fffcf2]'>
          <div className='text-center  items-center'>
            <h1 className='px-4 py-1 rounded-lg cursor-pointer text-[58px] font-light'>I need someone to</h1>
            <div className='overflow-hidden h-[48px] -mb-2'>
              <div className='animate-slide text-[48px] font-semibold'>
                {phrases.map((phrase, i) => (
                  <div
                    key={i}
                    className={`transition-opacity duration-700 ease-in-out ${index === i ? 'opacity-100' : 'opacity-100'}`}
                  >
                    {phrase}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='px-5 pt-3 flex justify-center items-center bg-[#fffcf2]'>
          <p className='text-sm px-3 text-[#3a3a3a] hover:cursor-pointer font-bold underline'>Become a daily wager</p>
        </div>
      </div>
      <style>{`
        @keyframes slide {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-100%);
          }
        }
        .animate-slide {
          animation: slide ${phrases.length * .7}s linear infinite; // Adjusted animation duration
        }
      `}</style>
  
    </>
  );
}

export default Banner;