import React from "react";

const MainCategory: React.FC = () => {

  const headerName = ["Name", "Email", "Country", "Price","Total Work","Raiting","Job","start Date", "End Date","Email", "Country", "Price","Total Work","Raiting","Job","start Date", "End Date"];
  const DataListTable = [{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "country": "USA",
    "price": "$100"
  }, {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "country": "USA",
    "price": "$100"
  }, {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "country": "USA",
    "price": "$100"
  }, {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "country": "USA",
    "price": "$100"
  }, {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "country": "USA",
    "price": "$100"
  },{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "country": "USA",
    "price": "$100"
  },{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "country": "USA",
    "price": "$100"
  },{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "country": "USA",
    "price": "$100"
  },];

  return (
    <div>
      <div className="border-b w-full border-gray-400 p-2">
        <div className="flex justify-start">
          <button className="px-6 py-1 bg-blue-400">Basic Service</button>
          <button className="px-6 py-1">Skill Service</button>
          <button className="px-6 py-1">Professional Service</button>
          <button className="px-6 py-1">Products Service</button>
        </div>
      </div>
      <div>
        <section className="antialiased text-gray-600 h-screen px-4 mt-4">
          <div className="flex flex-col shadow-lg rounded-sm border border-gray-200">
            <div className="w-full mx-auto">
              <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">Customers</h2>
              </header>
              <div className="px-2 py-1">
              <div className=" ">
                  <div className="max-h-80 overflow-y-auto">
                    <table className="table-auto w-full min-w-max ">
                      <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 sticky top-0 z-10">
                        <tr>
                          {headerName.map((item,index) =>
                            <th key={index} className="p-2 whitespace-nowrap " key={item}>
                              <div className="font-semibold text-left">{item}</div>
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-gray-100">
                        {DataListTable.map((item, index) =>
                          <tr className="border-r border-gray-300" key={index}>
                            <td className="p-2 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                  <img
                                    className="rounded-full"
                                    src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg"
                                    width="40"
                                    height="40"
                                    alt="Alex Shatov"
                                  />
                                </div>
                                <div className="font-medium text-gray-800">
                                  {item.name}
                                </div>
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-left">{item.email}</div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-left font-medium text-green-500">
                                {item.country}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-lg text-center">{item.price}</div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-2 w-full flex justify-end px-4 border-t border-gray-300">
              <button className="px-4 py-1 border border-gray-200 bg-blue-500 hover:bg-black text-white">Add</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainCategory;
