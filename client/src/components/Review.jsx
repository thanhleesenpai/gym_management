
import React from 'react';

const Review = ({ img, alt, name }) => {
  return (
    <div className="flex flex-col items-center text-black rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300 text-center gap-2">
      <img src={img} alt={alt} className="w-24 h-24 rounded-full mb-2 group-hover:scale-110 " />
      <h3 className="text-xl font-semibold text-white">{name}</h3>
        <p className='text-gray-100 text-md font-medium lowercase'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ex quidem, mollitia minus velit laudantium aliquid? Ea tenetur amet deserunt.</p>
    </div>
  );
};

export default Review;
