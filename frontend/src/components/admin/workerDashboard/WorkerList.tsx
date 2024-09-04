import React, { useState, useContext } from "react";
import WorkerListFilterSection from "./WorkerListFilterSection";
import AdminFormContext from "../../../context/modules/AdminFormContext";
import { AdminFormListData, EmployeeData } from "../../../types/AdminGategoryType";

const WorkerList: React.FC = () => {
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const { getEmployeeFullData } = useContext(
    AdminFormContext
  ) as AdminFormListData;

  const handleToggleDetails = (userId: string) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  console.log(getEmployeeFullData,'--------')
  return (
    <div className="p-4">
      <WorkerListFilterSection />

      <table className="w-full border border-gray-400 mt-4 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name & Place
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rating
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Experience (Years)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Skill Level
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Work
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Completed Work
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Current Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {getEmployeeFullData.map((user:EmployeeData, index:number) => (
            <React.Fragment key={index}>
              <tr className={` ${expandedUserId === user._id && 'bg-gray-200'}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.profilePic}
                        alt={`${user.holderName}'s profile`}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.holderName}
                      </div>
                      <h6 className="text-xs text-gray-500">{user.city}</h6>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {/* {Array(Math.round(user.rating))
                    .fill("★")
                    .join(" ")} */} ******
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {user.experience}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {user.skillLevel}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {user.totalWork || "15"} {/* Assuming 15 is the placeholder */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {user.completedWork || "11"} {/* Assuming 11 is the placeholder */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`border py-1 px-4 text-xs rounded-full ${
                      user.workStatus === "No work"
                        ? "bg-green-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {user.workStatus}
                  </span>
                </td>
              </tr>
              {expandedUserId === user._id && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 bg-gray-200">
                    <div className="flex gap-6">
                      <div className="flex gap-2 flex-col">
                        <div className="text-sm text-gray-900">
                          <strong>Phone:</strong> {user.linkedPhoneNumber}
                        </div>
                        <div className="text-sm text-gray-900">
                          <strong>Email:</strong> {user.email}
                        </div>
                        <div className="text-sm text-gray-900">
                          <strong>Bank Details:</strong> {user.bankAccountDetails}
                        </div>
                      </div>
                      <div className="flex gap-2 flex-col">
                        <div className="text-sm text-gray-900">
                          <strong>Phone:</strong> {user.linkedPhoneNumber}
                        </div>
                        <div className="text-sm text-gray-900">
                          <strong>Email:</strong> {user.email}
                        </div>
                        <div className="text-sm text-gray-900">
                          <strong>Bank Details:</strong> {user.bankAccountDetails}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-2 whitespace-nowrap text-right text-sm text-blue-600 cursor-pointer"
                  onClick={() => handleToggleDetails(user._id)}
                >
                  <span className="hover:underline">More Details</span>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerList;
