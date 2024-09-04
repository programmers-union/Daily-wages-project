import React, { useState, useEffect } from "react";
// import Navbar from "../header/LandingNavBar";
import { Link } from "react-router-dom";

const Banner: React.FC = () => {
  const [index, setIndex] = useState(0);
  const phrases = ["walk my dog", "talk to me", "fix my tap", "like my pics","clean my home " , " fix my garden","walk my dog", "talk to me", "fix my tap", "like my pics","clean my home " , " fix my garden"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 500); // Adjusted interval for faster animation

    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <>
      <div className="bg-custom-gradient h-screen">
       {/* <Navbar /> */}
        <div className="h-[80vh] flex justify-center items-center ">
          <div className="text-center flex flex-col items-center">
            <h1 className="px-4 py-1 rounded-lg cursor-pointer text-slate-800 text-[78px] font-light -tracking-[0.3rem]">
              I need someone to
            </h1>
           
            <div className="overflow-hidden h-[48px] -mb-2">
              <div className="animate-slide text-[38px] font-medium">
                {phrases.map((phrase, i) => (
                  <div
                    key={i}
                    className={`transition-opacity text-slate-800 duration-500 ease-in-out ${
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
        <div className="px-5 pt-3 flex justify-center items-center  ">
          <Link to='/worker-form' >
          <p className="text-sm px-6 bg-custom-gradient py-2 border-b rounded-full  text-[#3a3a3a] hover:cursor-pointer font-normal ">
            Become a daily wager
          </p>
          </Link>
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
            phrases.length * 0.5
          }s linear infinite; // Adjusted animation duration
        }
      `}</style>
    </>
  );
};

export default Banner;


