import React from 'react'

const CardTotalCount:React.FC = () => {
  return (
    <div>
        <div className='flex justify-center items-center gap-3'>
        <div className='border text-sm w-full  shadow-sm p-4 rounded-sm'>
            <h3 className='text-[#387908]'>USER</h3>
            <p>Total Users: 1000</p>
        </div>
        <div className='border text-sm w-full  shadow-sm p-4 rounded-sm'>
            <h3 className='text-[#ff7300]'>employee</h3>
            <p>Total Users: 1000</p>
        </div>
        <div className='border text-sm w-full  shadow-sm p-4 rounded-sm'>
            <h3>Total Data</h3>
            <p> 1000</p>
        </div>
      </div>
    </div>
  )
}

export default CardTotalCount
