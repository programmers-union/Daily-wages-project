import React from "react";
import { workerFormType } from "../../../types/WorkerTypes";

interface SkillsType {
  isWorkerForm:workerFormType | undefined;
}

const WorkDetails: React.FC<SkillsType> = ({isWorkerForm}) => {
  const totalSkills = isWorkerForm?.skills.split(',').map(item => item.trim());
  return (
    <div>
      <div className="bg-white   p-4">
        <div className="flex justify-between items-center">
        <p className="text-sm mb-1 underline">Skills Categories</p>
          {/* <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
            Oct 2020
          </span> */}
        </div>
        <div className="flex items-center gap-4 flex-wrap my-4">
        {totalSkills?.map((item,index)=>
        <p key={index} className="text-[12px] bg-blue-300 px-2 py-ps w-fit  rounded-md">
         {item}
        </p>
        )}
        </div>
        
<div className="flex items-center gap-28">
  <div><p className="text-sm my-2 mt-3 underline">Skills</p>
        <p className="text-sm  text-gray-600 mb-4">
        {isWorkerForm?.skillLevel}
        </p></div>
  <div> <p className="text-sm my-2 mt-3 underline">Experience</p>
        <p className="text-sm text-gray-600 mb-4">
         {isWorkerForm?.experience}
        </p></div>
</div>
        

       

        <h4 className="font-semibold mb-2">INSTITUTION INFO</h4>
        <p className="text-sm mb-1">Name of the Institute</p>
        <p className="text-sm text-gray-600 mb-4">
          Sarasota Opera Young Artist Program
        </p>

        <h4 className="font-semibold mb-2">STUDY INFO</h4>
        <p className="text-sm mb-1">Position</p>
        <p className="text-sm text-gray-600">Studio Artist</p>
      </div>
    </div>
  );
};

export default WorkDetails;
