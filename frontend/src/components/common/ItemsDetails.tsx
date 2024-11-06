import React from 'react'

const ItemsDetails:React.FC = () => {
  return (
    <div>
      <div className=' my-10 '>
        <div className='flex gap-4 items-center bg-gray-200 w-full'>
            <img className='w-16 h-16 p-3' src="https://cdn-icons-png.flaticon.com/128/53/53113.png" alt="" />
        <h6 className='text-base font-normal'>Walking Dog</h6>
        </div>
        <p className='my-3 text-xs '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas eum, nobis maxime magni blanditiis quam minima libero expedita sunt veniam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas eum, nobis maxime magni blanditiis quam minima libero expedita sunt veniam?</p>
        <div className='bg-gray-100 p-4'> 
        <h6 className='font-semibold'>More Details</h6>
        <ul className='grid  grid-cols-2 space-y-2 px-6 justify-between items-center'>
           { ["2 hr (is Available )","Walking With Maintenance","Food Controlling","No more"].map((item,i)=>
            <li key={i} className=' text-[13px] list-disc'> {item}</li>
        )}
        </ul>
        </div>
      </div>
    </div>
  )
}

export default ItemsDetails
