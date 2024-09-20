import React, { useContext, useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { XMarkIcon, CalendarIcon } from '@heroicons/react/24/outline';
import AdminFormContext from '../../../context/modules/AdminFormContext';
import { AdminFormListData, Item } from '../../../types/AdminGategoryType';
import { ClientAddFormData, ClientForm, PropsData } from '../../../types/ClientFormType';
import ClientContext from '../../../context/modules/ClientFormContext';
import LocationAndMap from './LocationAndMap';

const JobRequestForm: React.FC<PropsData> = ({ setIsActive, calendarDate }) => {
  const [formData, setFormData] = useState<ClientAddFormData>({
    jobTitle: '',
    time: '',
    location: {
      country: '',
      state: '',
      district: '',
      city: '',
      mapLocation: undefined,
    },
    description: '',
  });
  const [mapLocation, setMapLocation] = useState<boolean>(false);
  const [dropClick, setDropClick] = useState<boolean>(false);

  const { getSubCategoriesItemsDatas } = useContext(AdminFormContext) as AdminFormListData;
  const { ClientCalendarAddForm } = useContext(ClientContext) as ClientForm;

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'country' || name === 'state' || name === 'district' || name === 'city') {
      setFormData((prevData) => ({
        ...prevData,
        location: { ...prevData.location, [name]: value }
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  }, []);

  const handleJobTitleClick = (jobTitle: string) => {
    setFormData((prevData) => ({ ...prevData, jobTitle }));
    setDropClick(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const dateParts = calendarDate.match(/(\w+)\s(\d+)[a-z]{2}\s(\d{4})/i);
    if (!dateParts) {
      alert('Invalid date format');
      return;
    }

    const [, month, day, year] = dateParts;
    const monthIndex = new Date(Date.parse(`${month} 1, 2012`)).getMonth() + 1;
    const formattedDate = `${year}-${String(monthIndex).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    if (!formData.jobTitle.trim() || !formData.time.trim()  || !formData.description.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const calendarAddData = {
      ...formData,
      date: new Date(formattedDate).toISOString(),
    };

    ClientCalendarAddForm(calendarAddData);
    setIsActive(false);
  };

  const toggleMapLocation = () => {
    setMapLocation((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-normal">Add title and time</h2>
            <button onClick={() => setIsActive(false)} className="text-gray-400 hover:text-gray-600">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 relative">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="Job Title"
                  className="flex-grow border-b text-xs pb-2 bg-transparent placeholder:text-gray-300 border-gray-300 focus:border-blue-500 outline-none"
                  onFocus={() => setDropClick(true)}
                  required
                />
              </div>
              {dropClick && formData.jobTitle && (
                <div className="absolute top-2 left-0 z-40 w-full">
                  <div className="border border-gray-400 rounded-md py-2 w-full px-4 max-h-20 overflow-y-scroll bg-white text-xs flex flex-col gap-2">
                    {getSubCategoriesItemsDatas
                      .filter((item: Item) => item.jobTitle.toLowerCase().includes(formData.jobTitle.toLowerCase()))
                      .map((item: Item, index: number) => (
                        <div
                          key={index}
                          onClick={() => handleJobTitleClick(item.jobTitle)}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          {item.jobTitle}
                        </div>
                      ))}
                  </div>
                </div>
              )}
              <h6 className="text-blue-600 text-sm hover:text-blue-700">Time</h6>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-3 w-3 text-gray-400" />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="flex-grow border-b text-xs border-gray-300 pb-2 placeholder:text-gray-300 focus:border-blue-500 outline-none"
                  required
                />
              </div>
              <LocationAndMap 
                mapLocation={mapLocation} 
                toggleMapLocation={toggleMapLocation} 
                formData={formData} 
                handleInputChange={handleInputChange} 
                setFormData={setFormData}
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Add description"
                className="w-full border text-sm placeholder:text-xs p-2 border-gray-300 rounded-sm outline-none resize-none"
                required
              />
            </div>
            <div className="mt-2 flex justify-end space-x-2">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-xs text-white rounded hover:bg-blue-700">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobRequestForm;