import React from 'react'

const LatestCommond:React.FC = () => {
  return (
    <div className='py-4 w-1/2 my-4'>
        <h1 className='text-sm font-medium'>Good Commond</h1>
        {[...Array(4)].map((_,i)=>
      <div key={i} className='border my-4 border-gray-400 shadow-sm rounded-bl-2xl rounded-tr-2xl rounded-br-2xl px-4 py-2 '>
        <h6 className='text-sm text-blue-900 my-1'>Johne Alice</h6>
        <p className='text-xs '>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias laudantium excepturi rerum ullam expedita amet!</p>
      </div>
        )}
    </div>
  )
}

export default LatestCommond
