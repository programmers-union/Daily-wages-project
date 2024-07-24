import React from 'react'

const WorkDetails:React.FC = () => {
  return (
    <div>
      <div className="bg-white   p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Studio Artist</h3>
                        <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">Oct 2020</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Sarasota Opera Young Artist Program</p>
                    <p className="text-xs text-gray-500 mb-4">Church Singer, Rock Singer</p>
                    
                    <h4 className="font-semibold mb-2">PROGRAM INFO</h4>
                    <p className="text-sm mb-1">Name of the Program</p>
                    <p className="text-sm text-gray-600 mb-4">Sarasota Opera Young Artist Program</p>
                    
                    <p className="text-sm mb-1">Location</p>
                    <p className="text-sm text-gray-600 mb-4">Sarasota Opera House, North Pineapple Ave, Sarasota, FL, USA</p>
                    
                    <h4 className="font-semibold mb-2">INSTITUTION INFO</h4>
                    <p className="text-sm mb-1">Name of the Institute</p>
                    <p className="text-sm text-gray-600 mb-4">Sarasota Opera Young Artist Program</p>
                    
                    <h4 className="font-semibold mb-2">STUDY INFO</h4>
                    <p className="text-sm mb-1">Position</p>
                    <p className="text-sm text-gray-600">Studio Artist</p>
                </div>
    </div>
  )
}

export default WorkDetails
