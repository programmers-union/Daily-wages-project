import React from 'react';
import Home from './pages/client/home/Home';

const App: React.FC = () => {
  return (
    <>
     <Home />
    </>
    <div className='flex justify-center items-center h-screen m-auto bg-[#fffcf2]'>
      <h1 className='bg-blue-500 px-4 py-1 rounded-lg text-white hover:bg-slate-900 shadow-md cursor-pointer' >welfffffffcom👋</h1>
    </div>
  );
}

export default App;
