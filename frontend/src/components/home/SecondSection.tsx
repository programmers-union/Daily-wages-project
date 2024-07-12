import React from 'react'

const SecondSection:React.FC = () => {
  return (
    <div className='h-screen'>
        <div className='w-full max-w-3xl m-auto h-[1px] bg-slate-300'></div>
      <div>
          <ul className='flex justify-center items-center gap-6'>
       { ['one', 'two', 'three', 'four', 'five', 'six'].map((item)=>
        <li className=''>{item}</li>
    )}
    </ul>
      </div>
    </div>
  )
}

export default SecondSection
