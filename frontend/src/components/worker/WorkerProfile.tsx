import React, { useEffect, useState } from "react";
import About from "./profileInner/About";
import WorkDetails from "./profileInner/WorkDetails";
import CompletedWorkDetails from "./profileInner/CompletedWorkDetails";
import { Link } from "react-router-dom";
import { workerFormType } from "../../types/WorkerTypes";
import { createAxiosInstance } from "../../context/modules/Interceptor";

export interface ProfileDataType {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phoneNumber: string | null;
  dateOfBirth?: string | null;
  country?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
}

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileDataType | undefined>();
  const [isWorkerForm, setIsWorkerForm] = useState<workerFormType | undefined>();
  const [aboutClickHandle, setAboutClickHandle] = useState<number>(1);

  useEffect(() => {
    const axiosInstance = createAxiosInstance();
    const fetchProfileData = async () => {
      try {
        const accessTokenIs = localStorage.getItem('accessToken');
        if (accessTokenIs) {
          const response = await axiosInstance.get('http://localhost:5000/api/common/profile');
          setProfileData(response.data?.address); // Directly setting the profile data
          setIsWorkerForm(response.data.form);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);
 console.log(profileData,'some')
  return (
    <div className="flex justify-center ">
      <div className="bg-slate-600 h-[89vh] w-16"></div>
      <div className="container mx-auto ">
        <div className="bg-white h-[88vh] overflow-hidden">
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                alt="Profile"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h1 className="text-slate-800 text-sm font-normal uppercase">
                  {profileData?.firstName} {profileData?.lastName}
                </h1>
                <p className="text-slate-800 text-xs">{profileData?.email}</p>
              </div>
            </div>
          </div>

          <nav className="bg-white border-b border-t border flex justify-between m-1 items-center ">
            <ul className="flex">
              {isWorkerForm === null ? (
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
              ) : (
                <>
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
                  <li
                    onClick={() => setAboutClickHandle(2)}
                    className={`px-4 py-2 ${
                      aboutClickHandle === 2
                        ? "border-b-2 border-purple-600 text-blue-600"
                        : null
                    } text-gray-600 cursor-pointer`}
                  >
                    Skills
                  </li>
                  <li
                    onClick={() => setAboutClickHandle(3)}
                    className={`px-4 py-2 ${
                      aboutClickHandle === 3
                        ? "border-b-2 border-purple-600 text-blue-600"
                        : null
                    } text-gray-600 cursor-pointer`}
                  >
                    More...
                  </li>
                </>
              )}
            </ul>
            {isWorkerForm === null && (
              <Link to="/worker-form">
                <button className="text-xs mr-4 bg-gray-500 px-3 py-3 text-white hover:bg-gray-600">
                  Become a Daily wager
                </button>
              </Link>
            )}
          </nav>
          {aboutClickHandle === 1 && <About profileData={profileData} isWorkerForm={isWorkerForm} />}
          {aboutClickHandle === 2 && <WorkDetails isWorkerForm={isWorkerForm} />}
          {aboutClickHandle === 3 && <CompletedWorkDetails />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
