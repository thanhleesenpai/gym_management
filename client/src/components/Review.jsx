import React from 'react';

const Review = ({ img, alt, name, height,weight,age, description }) => {
  return (
    <div className="flex flex-col items-center text-black rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300 text-center gap-2">
      <img src={img} alt={alt} className="w-24 h-24 rounded-full mb-2 group-hover:scale-110 " />
      <h3 className="text-xl font-semibold text-white">{name}</h3>
      <h4 className="text-lg font-medium text-gray-100">Height: {height}</h4>
      <h4 className="text-lg font-medium text-gray-100">Weight: {weight}</h4>
      <h4 className="text-lg font-medium text-gray-100">Age: {age}</h4>
      <p className='text-gray-100 text-md font-medium'>{description}</p>
    </div>
  );
};

export default Review;
