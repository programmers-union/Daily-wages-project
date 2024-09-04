import React from "react";

const SecondSection: React.FC = () => {

  const workDetails = [
    {
      title:'Plumber', img:'https://cdn-icons-png.flaticon.com/128/10037/10037634.png'
    },
    {
      title:'Walking Dog', img:'https://cdn-icons-png.flaticon.com/128/53/53113.png'
    },
    {
      title:'Electrician', img:'https://cdn-icons-png.flaticon.com/128/9990/9990074.png'
    },
    {
      title:'Clean', img:'https://cdn-icons-png.flaticon.com/128/17348/17348928.png'
    },
    {
      title:'Walking Dog', img:'https://cdn-icons-png.flaticon.com/128/17348/17348928.png'
    },
    {
      title:'Walking Dog', img:'https://cdn-icons-png.flaticon.com/128/17348/17348928.png'
    },
    {
      title:'Walking Dog', img:'https://cdn-icons-png.flaticon.com/128/17348/17348928.png'
    },
    {
      title:'Walking Dog', img:'https://cdn-icons-png.flaticon.com/128/17348/17348928.png'
    },
    {
      title:'Walking Dog', img:'https://cdn-icons-png.flaticon.com/128/17348/17348928.png'
    },
    {
      title:'Walking Dog', img:'https://cdn-icons-png.flaticon.com/128/17348/17348928.png'
    },
    {
      title:'Walking Dog', img:'https://cdn-icons-png.flaticon.com/128/17348/17348928.png'
    },
    {
      title:'Walking Dog', img:'https://cdn-icons-png.flaticon.com/128/17348/17348928.png'
    },
    {
      title:'Walking Dog', img:'https://cdn-icons-png.flaticon.com/128/17348/17348928.png'
    },
    {
      title:'Walking Dog', img:'https://cdn-icons-png.flaticon.com/128/17348/17348928.png'
    },
    {
      title:'Walking Dog', img:'https://cdn-icons-png.flaticon.com/128/17348/17348928.png'
    },
    {
      title:'Walking Dog', img:'https://cdn-icons-png.flaticon.com/128/17348/17348928.png'
    },
    {
      title:'Walking Dog', img:'https://cdn-icons-png.flaticon.com/128/17348/17348928.png'
    },
    {
      title:'Walking Dog', img:'https://cdn-icons-png.flaticon.com/128/17348/17348928.png'
    },
  ]

  return (
    <div className="h-screen ">
      <div className="px-28 mt-20 grid grid-cols-2 sm:grid-cols-3 gap-y-6 md:grid-cols-4 place-items-center my-10 lg:grid-cols-6">
        {workDetails.map((item,index)=>
        <div key={index} className="w-fit">
          <img src={item.img} alt="" className="w-24 h-24 border border-gary-400 p-4 rounded-md " />
          <p className="text-sm text-center">{item.title}</p>
        </div>
        )}
      </div>
    </div>
  );
};

export default SecondSection;
