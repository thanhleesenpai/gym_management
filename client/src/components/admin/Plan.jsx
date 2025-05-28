
import React from 'react';
import { Link } from 'react-router-dom';
import { planImg1 } from "../../images";

const Plan = ({ planName, monthlyPlanAmount, yearlyPlanAmount, p_id }) => {
  return (
    <Link to={`/dashboard/admin/plan/${p_id}`} key={p_id} className="group">
      <div className='flex flex-col gap-5 justify-center items-center border-2 border-gray-300 rounded-lg p-4 transition-all ease-in-out duration-300 shadow-md hover:shadow-xl hover:bg-gray-50 transform hover:scale-105'>
        <h3 className='text-white font-bold text-center text-2xl group-hover:text-indigo-600 transition-all ease-in-out'>
          {planName}
        </h3>
        <img 
          src={planImg1} 
          alt="Plan Image" 
          className='w-full rounded-lg object-cover h-[200px] group-hover:scale-110 transition-transform duration-300'
        />
        <div className='flex justify-around items-center w-full mt-4 gap-3'>
          <p className='text-white font-semibold text-xl bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md px-3 py-0 shadow-sm'>
            Monthly: {monthlyPlanAmount} ₹
          </p>
          <p className='text-white font-semibold text-xl bg-gradient-to-r from-green-500 to-teal-500 rounded-md px-3 py-0 shadow-sm'>
            Yearly: {yearlyPlanAmount} ₹
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Plan;
