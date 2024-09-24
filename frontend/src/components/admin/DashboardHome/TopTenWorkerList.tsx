import React, { useEffect, useRef, useState } from "react";
import { CiFilter } from "react-icons/ci";

interface User {
  id: number;
  name: string;
  profilePic: string;
  place: string;
  rating: number;
}

const initialUsers: User[] = [
  { id: 1, name: "John Doe", profilePic: "https://randomuser.me/api/portraits/men/1.jpg", place: "malappuram", rating: 4.5 },
  { id: 2, name: "Jane Smith", profilePic: "https://randomuser.me/api/portraits/women/2.jpg", place: "eranakulam", rating: 3.8 },
  { id: 3, name: "Bob Johnson", profilePic: "https://randomuser.me/api/portraits/men/3.jpg", place: "wayanad", rating: 3.2 },
  { id: 4, name: "Alice Brown", profilePic: "https://randomuser.me/api/portraits/women/4.jpg", place: "kottayam", rating: 4.7 },
  { id: 5, name: "Charlie Davis", profilePic: "https://randomuser.me/api/portraits/men/5.jpg", place: "alappuzha", rating: 3 },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};

const TopTenWorkerList: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      filterButtonRef.current &&
      !filterButtonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMostRated = () => {
    const sortedUsers = [...users].sort((a, b) => b.rating - a.rating);
    setUsers(sortedUsers);
    setIsOpen(false);
  };

  const handleLowRated = () => {
    const sortedUsers = [...users].sort((a, b) => a.rating - b.rating);
    setUsers(sortedUsers);
    setIsOpen(false);
  };

  return (
    <div className="container w-1/2 p-6 relative">
      <div className="flex items-center justify-between px-20 bg-gray-200 py-3 rounded-tl-lg relative rounded-tr-lg">
        <h6 className="uppercase text-sm text-center">User Name</h6>
        <h6 className="uppercase text-sm text-center">Rating</h6>
        <button
          ref={filterButtonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="flex text-white items-center absolute top-2 left-2 bg-blue-400 cursor-pointer border border-gray-400 p-1 rounded-sm shadow-sm text-xs"
        >
          <CiFilter />
          Filter
        </button>
      </div>
      <div className="bg-white shadow-sm border rounded-sm custom-scrollbar-container overflow-y-scroll h-[23rem]">
        <table className="w-full">
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.profilePic}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <h6 className="text-xs">{user.place}</h6>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StarRating rating={user.rating} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="text-center border border-gray-300 w-full py-2 text-sm hover:text-blue-600">
        More Details
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-6 top-[60px] bg-white w-40 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div role="none">
            <button
              onClick={handleMostRated}
              className="block px-4 border-b border-gray-300 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full text-left"
              role="menuitem"
            >
              Most Rated
            </button>
            <button
              onClick={handleLowRated}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full text-left"
              role="menuitem"
            >
              Low Rated
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopTenWorkerList;
