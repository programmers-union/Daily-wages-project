import React, { useState, useEffect } from "react";

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
      <div className="bg-custom-gradient h-screen">
        <div className="px-5 pt-6 flex justify-between items-center ">
          <p className="font-bold text-[1.5rem]"><span className="text-blue-300">D</span><span className="text-slate-500">W</span></p>
          <ul className="flex items-center gap-6 font-normal text-md justify-center cursor-pointer ">
            <li>Home</li>
            <li>Sechdule</li>
            <li>About</li>
            <li>Sechdule</li>
          </ul>
          <div className="flex gap-2">
            <p className="text-sm px-6 py-1 cursor-pointer hover:bg-slate-800 hover:text-white  border rounded-sm ">
              Log In
            </p>
            <p className="text-sm px-6 py-1 cursor-pointer hover:bg-slate-800 hover:text-white   border  rounded-sm ">
              Sign Up
            </p>
          </div>
        </div>
        <div className="h-[80vh] flex justify-center items-center ">
          <div className="text-center  items-center">
            <h1 className="px-4 py-1 rounded-lg cursor-pointer text-slate-800 text-[78px] font-medium -tracking-[0.4rem]">
              I need someone to
            </h1>
            <div className="overflow-hidden h-[48px] -mb-2">
              <div className="animate-slide text-[48px] font-medium">
                {phrases.map((phrase, i) => (
                  <div
                    key={i}
                    className={`transition-opacity text-slate-800 duration-700 ease-in-out ${
                      index === i ? "opacity-100" : "opacity-100"
                    }`}
                  >
                    {phrase}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="px-5 pt-3 flex justify-center items-center  bg-[#fffcf2]">
          <p className="text-sm px-6 py-2 border-b rounded-full  text-[#3a3a3a] hover:cursor-pointer font-medium ">
            Become a daily wager
          </p>
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
          animation: slide ${
            phrases.length * 0.7
          }s linear infinite; // Adjusted animation duration
        }
      `}</style>
    </>
  );
};

export default Banner;


