import React, { useState, useEffect, ChangeEvent } from 'react';
import { DisplayData } from './About';
import { ProfileDataType } from '../WorkerProfile';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  country: string;
  address: string;
  city: string;
  state: string;
}

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: ProfileDataType ;
  onSave: (data: ProfileData) => void;
  setProfileDisplayData: React.Dispatch<React.SetStateAction<DisplayData>>;
}

const AboutProfileEditPopup: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  profileData,
  onSave,
  setProfileDisplayData,
}) => {
  const [formData, setFormData] = useState<ProfileDataType>(profileData);

  useEffect(() => {
    setFormData(profileData);
  }, [profileData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedData: ProfileData = {
      firstName: formData.firstName ?? "",
      lastName: formData.lastName ?? "",
      email: formData.email ?? "",
      phoneNumber: formData.phoneNumber ?? "",
      dateOfBirth: formData.dateOfBirth ?? "",
      country: formData.country ?? "",
      address: formData.address ?? "",
      city: formData.city ?? "",
      state: formData.state ?? "",
    };
    
    onSave(cleanedData);
    setProfileDisplayData({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      dateOfBirth: formData.dateOfBirth,
      country: formData.country,
      address: formData.address,
      city: formData.city,
      state: formData.state,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-sm font-semibold">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2 flex flex-col">
              <label htmlFor="firstName" className="text-xs">First Name</label>
              <input
                className="text-xs bg-gray-200 p-2 rounded"
                id="firstName"
                name="firstName"
                value={formData?.firstName ?? ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label className="text-xs" htmlFor="lastName">Last Name</label>
              <input
                className="text-xs bg-gray-200 p-2 rounded"
                id="lastName"
                name="lastName"
                value={formData.lastName ?? ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label className="text-xs w-40" htmlFor="email">Email Address</label> 
              <input
                className="text-xs outline-none bg-gray-200 p-2"
                id="email"
                name="email"
                type="email"
                value={formData.email ?? ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label className="text-xs w-40" htmlFor="phoneNumber">Phone Number</label>
              <input
                className="text-xs outline-none bg-gray-200 p-2"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber ?? ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label className="text-xs w-40" htmlFor="dateOfBirth">Date of Birth</label>
              <input
                className="text-xs outline-none bg-gray-200 p-2"
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth ?? ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label className="text-xs w-40" htmlFor="country">Country</label>
              <input
                className="text-xs outline-none bg-gray-200 p-2"
                id="country"
                name="country"
                value={formData.country ?? ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label className="text-xs w-40" htmlFor="address">Address</label>
              <input
                className="text-xs outline-none bg-gray-200 p-2"
                id="address"
                name="address"
                value={formData.address ?? ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label className="text-xs w-40" htmlFor="city">City</label>
              <input
                className="text-xs outline-none bg-gray-200 p-2"
                id="city"
                name="city"
                value={formData.city ?? ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label className="text-xs w-40" htmlFor="state">State</label>
              <input
                className="text-xs outline-none bg-gray-200 p-2"
                id="state"
                name="state"
                value={formData.state ?? ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutProfileEditPopup;
