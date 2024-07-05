import React, { useState } from "react";
import About from "./profileInner/About";
import WorkDetails from "./profileInner/WorkDetails";
import CompletedWorkDetails from "./profileInner/CompletedWorkDetails";

const WorkerProfile: React.FC = () => {
  const [aboutClickHandle, setAboutClickHandle] = useState<number>(1);
  return (
    <div className="flex justify-center ">
      <div className="bg-slate-800 h-screen w-16"></div>
      <div className="container mx-auto ">
        <div className="bg-white   overflow-hidden">
          <div className="bg-slate-800 p-4 flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                alt="Anthony Fernandes"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h1 className="text-white text-xl font-bold">
                  Anthony Fernandes
                </h1>
                <p className="text-white text-sm">Danbury, CT</p>
              </div>
            </div>
          </div>

          <nav className="bg-white border-b">
            <ul className="flex">
              <li
                onClick={() => setAboutClickHandle(1)}
                className={`px-4 py-2 ${
                  aboutClickHandle === 1
                    ? "border-b-2 border-purple-600 text-blue-600"
                    : null
                }  text-gray-600 cursor-pointer`}
              >
                About
              </li>
              <li className="px-4 py-2 text-gray-600">Media</li>
              <li
                onClick={() => setAboutClickHandle(2)}
                className={`px-4 py-2 ${
                  aboutClickHandle === 2
                    ? "border-b-2 border-purple-600 text-blue-600"
                    : null
                } text-gray-600 cursor-pointer`}
              >
                Highlights
              </li>
              <li
                onClick={() => setAboutClickHandle(3)}
                className={`px-4 py-2 ${
                  aboutClickHandle === 3
                    ? "border-b-2 border-purple-600 text-blue-600"
                    : null
                } text-gray-600 cursor-pointer`}
              >
                Experience
              </li>
            </ul>
          </nav>
          {aboutClickHandle === 1 && <About />}
          {aboutClickHandle === 2 && <WorkDetails />}
          {aboutClickHandle === 3 && <CompletedWorkDetails />}
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
