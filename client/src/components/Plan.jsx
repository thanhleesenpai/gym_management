import React from 'react';
import { Link } from 'react-router-dom';
import {ButtonOutline} from "./";
import {exercisePng, planImg} from "../images";
const Plan = ({name, img, alt, id, monthlyPrice, yearlyPrice}) => {
  return (

    <div className="text-black rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300 p-6 text-center relative">
    <div className="rounded-lg overflow-hidden">
      <img src={planImg} alt={name} className="w-full object-cover rounded-md" />
    </div>
    <h3 className="text-2xl font-extrabold mt-4 mb-2">{name}</h3>
    <div className="space-y-2">
      <p className="text-lg">Monthly: <span className="font-bold">₹{monthlyPrice}</span></p>
      <p className="text-lg">Yearly: <span className="font-bold">₹{yearlyPrice}</span></p>
    </div>
    <Link 
      to={`/plan-detail/${id}`}
      className="mt-4 inline-block text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-800 bg-blue-600 transition-colors duration-300"
    >
      Select Plan
    </Link>
  </div>
  )
}

export default Plan;

