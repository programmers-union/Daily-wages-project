import React from 'react'

const CompletedWorkDetails:React.FC = () => {
  return (
    <div>
      <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Experience</h2>
                <div className="flex space-x-4 mb-4">
                    <span className="text-gray-600">All</span>
                    <span className="text-gray-600">Performance</span>
                    <span className="text-purple-600 font-semibold">Training</span>
                    <span className="text-gray-600">Accolades</span>
                    <span className="text-gray-600">Education</span>
                    <span className="text-gray-600">Job Titles</span>
                    <span className="text-gray-600">Commissions</span>
                    <span className="text-gray-600">MasterclassName</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white border rounded-lg p-4 flex justify-between items-center">
                        <div>
                            <div className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center mb-2">S</div>
                            <h3 className="font-semibold">Studio Artist</h3>
                            <p className="text-sm text-gray-600">Sarasota Opera Young Artist Program</p>
                        </div>
                        <span className="text-gray-400">Oct 2017</span>
                    </div>
                    

                    <div className="bg-white border rounded-lg p-4 flex justify-between items-center">
                        <div>
                            <div className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center mb-2">C</div>
                            <h3 className="font-semibold">Creative Director</h3>
                            <p className="text-sm text-gray-600">Sarasota Opera Creative Director Program</p>
                        </div>
                        <span className="text-gray-400">Oct 2018 to Nov 2018</span>
                    </div>
                </div>
                
            </div>
    </div>
  )
}

export default CompletedWorkDetails
