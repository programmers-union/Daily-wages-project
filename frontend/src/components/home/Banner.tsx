import React from 'react';


const Banner:React.FC = () => {
  return (
    <div className='flex flex-col justify-start pt-28 items-center h-[50vh] m-auto'>
       <div className='flex px-10 gap-6 items-center shadow-md border w-1/2 h-16 rounded-full bg-transparent'>
        <img className='w-12 h-6 border-r pr-6 border-gray-300' src="https://cdn-icons-png.flaticon.com/128/2811/2811806.png" alt="" />
        <input className='outline-none bg-transparent w-full' type=" text" />
        <img src="" alt="" />
       </div>
       <div>
        <p className='text-[12px] mt-12 w-3/4 m-auto text-center'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, animi quam ipsa quidem modi molestiae tempore id? Libero, eligendi unde. </p>
       </div>
    </div>
  )
}

export default Banner
