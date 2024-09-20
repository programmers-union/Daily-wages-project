import React, { useState } from 'react';
import { ProfileDataType } from '../WorkerProfile';
import AboutProfileEditPopup from './AboutProfileEditPopup';
import { workerFormType } from '../../../types/WorkerTypes';

interface AboutProps {
  profileData: ProfileDataType | undefined;
  isWorkerForm:workerFormType | undefined;
}

export interface DisplayData {
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

const About: React.FC<AboutProps> = ({ profileData ,isWorkerForm}) => {
  const [isClickPopup, setIsClickPopUp] = useState<boolean>(false);
  const [profileDisplayData, setProfileDisplayData] = useState<DisplayData>({
    firstName: profileData?.firstName ?? null,
    lastName: profileData?.lastName ?? null,
    email: profileData?.email ?? null,
    phoneNumber: profileData?.phoneNumber ?? null,
    dateOfBirth: profileData?.dateOfBirth || '',
    country: profileData?.country || '',
    address: profileData?.address || '',
    city: profileData?.city || '',
    state: profileData?.state || '',
  });

  const popupClickHandle = () => {
    setIsClickPopUp(true);
  };

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden">
      <div className="border-b border-red-500 py-3 px-6">
        <h1 className="text-xl font-semibold text-gray-800">Edit Profile</h1>
      </div>
      <form className="p-6">
        <div onClick={popupClickHandle} className="flex justify-end">
          <img className="w-5 h-5 cursor-pointer" src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png" alt="Edit Icon" />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">FIRST NAME</label>
            <h6>{profileDisplayData.firstName || profileData?.firstName}</h6>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LAST NAME</label>
            <h6>{profileDisplayData.lastName || profileData?.lastName}</h6>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <h6>{profileDisplayData.dateOfBirth || 'N/A'}</h6>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">EMAIL ADDRESS/USERNAME</label>
            <h6>{profileDisplayData.email || profileData?.email}</h6>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PHONE NUMBER</label>
            <h6>{profileDisplayData.phoneNumber || profileData?.phoneNumber}</h6>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">COUNTRY</label>
            <h6>{profileDisplayData.country || isWorkerForm?.selectState || 'N/A'}</h6>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ADDRESS</label>
            <h6>{profileDisplayData.address || 'N/A'}</h6>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CITY</label>
            <h6>{profileDisplayData.city || isWorkerForm?.selectCity}</h6>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">STATE</label>
            <h6>{profileDisplayData.state || 'N/A'}</h6>
          </div>
        </div>
      </form>
      {isClickPopup && (
        <AboutProfileEditPopup
          setProfileDisplayData={setProfileDisplayData}
          isOpen={isClickPopup}
          onClose={() => setIsClickPopUp(false)}
          profileData={profileData!}
          onSave={(data) => console.log(data)}
        />
      )}
    </div>
  );
};

export default About;
