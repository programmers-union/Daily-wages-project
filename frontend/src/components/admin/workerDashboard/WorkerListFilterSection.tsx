import React, { useEffect, useRef, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { RiArrowDropDownLine } from 'react-icons/ri';

const WorkerListFilterSection: React.FC = () => {
  const [topRating, setTopRating] = useState(false);
  const [lowRating, setLowRating] = useState(false);
  const [search, setSearch] = useState('');
  const [experience, setExperience] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [experienceOptionsVisible, setExperienceOptionsVisible] = useState(false);
  const [skillLevelOptionsVisible, setSkillLevelOptionsVisible] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setExperienceOptionsVisible(false);
        setSkillLevelOptionsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const experienceOptions = ['Entry Level', 'Intermediate', 'Senior'];
  const skillLevelOptions = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div ref={filterRef} className="bg-white border  border-gray-400  rounded-md p-6">
      <h2 className="text-sm font-medium mb-4">Filter</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="top-rating" className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="top-rating"
              className="mr-2 form-checkbox h-5 w-5 text-indigo-600"
              checked={topRating}
              onChange={() => setTopRating(!topRating)}
            />
            <span className='text-sm'>Top Rating</span>
          </label>
        </div>

        <div>
          <label htmlFor="low-rating" className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="low-rating"
              className="mr-2 form-checkbox h-5 w-5 text-indigo-600"
              checked={lowRating}
              onChange={() => setLowRating(!lowRating)}
            />
            <span className='text-sm'>Low Rating</span>
          </label>
        </div>

        <div>
          <div className="relative">
            <input
              type="text"
              id="search"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center ">
              <IoIosSearch className="h-5 w-5 text-gray-400 cursor-pointer" />
            </div>
          </div>
        </div>

        <div>
          <div className="relative">
            <input
              type="text"
              id="experience"
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              onClick={() => setExperienceOptionsVisible(true)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center  cursor-pointer">
              <RiArrowDropDownLine className="h-5 w-5 text-gray-400 cursor-pointer" />
            </div>
            {experienceOptionsVisible && (
              <div className="absolute z-10 w-full bg-white shadow-lg rounded-md mt-1">
                {experienceOptions.map((option, index) => (
                  <div
                    key={index}
                    className="px-4  py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setExperience(option);
                      setExperienceOptionsVisible(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="relative">
            <input
              type="text"
              id="skill-level"
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Skill Level"
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              onClick={() => setSkillLevelOptionsVisible(true)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
              <RiArrowDropDownLine className="h-5 w-5 text-gray-400 cursor-pointer" />
            </div>
            {skillLevelOptionsVisible && (
              <div className="absolute z-10 w-full bg-white shadow-lg rounded-md mt-1">
                {skillLevelOptions.map((option, index) => (
                  <div
                    key={index}
                    className="px-4 text-sm py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSkillLevel(option);
                      setSkillLevelOptionsVisible(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <div className="mt-4 flex justify-end">
        <button className="bg-indigo-500 text-sm hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md mr-2">
          Clear
        </button>
        <button className="bg-indigo-500 text-sm hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md">
          Apply
        </button>
      </div> */}
    </div>
  );
};

export default WorkerListFilterSection;
