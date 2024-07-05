import React from 'react';

const About: React.FC = () => {
  return (
    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <div className="border-b border-red-500 py-3 px-6">
        <h1 className="text-xl font-semibold text-gray-800">Edit Profile</h1>
      </div>
      <form className="p-6">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">FIRST NAME</label>
            <h6>hrithik</h6>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LAST NAME</label>
            <h6>sukumar</h6>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">TITLE</label>
            <input type="date" placeholder="Job Title" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">EMAIL ADDRESS/USERNAME</label>
            <h6>hrithik@gmail.com</h6>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PHONE NUMBER</label>
            <h6>9876543210</h6>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">COUNTRY</label>
              <h6>Africa</h6>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ADDRESS</label>
            <h6>pittapillil, Ernakulam</h6>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CITY</label>
            <h6>Edapally</h6>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">STATE</label>
            <h6>Ernakulam</h6>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/POSTAL CODE</label>
            <h6>567499</h6>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ORGANIZATION</label>
            <h6>National Builders</h6>
          </div>
        </div>
      </form>
    </div>
  );
};

export default About;
