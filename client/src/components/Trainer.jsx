


import React from 'react';
import { Link } from 'react-router-dom';

const Trainer = ({ img, alt, id, name, age }) => {
  return (
  <div className="text-black rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300 text-center">
      <img src={img} alt={alt} className="w-full  mx-auto rounded-t-lg" />
      <div className="p-5 text-center">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-gray-700 text-md">Age: {age}</p>
        <div className="mt-1">
          <Link to={`trainer/${id}`} className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-800 transition-colors duration-300">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Trainer;
