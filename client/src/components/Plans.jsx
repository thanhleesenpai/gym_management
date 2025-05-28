
import React, { useState, useEffect } from 'react';
import { Heading } from ".";
import { planImg1, planImg2, planImg3, planImg4 } from '../images';
import { Plan } from '.';
import axios from 'axios';
import { BASE_URL } from '../utils/fetchData';
import Loader from './Loader';
import {toast} from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,  // Animation duration in milliseconds
      offset: -200,     // Offset from the top
      easing: 'ease-in-out', // Easing function
      once: true       
    });
  }, []);
  // Handle get Plans
  const getAllPlans = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/plan/getall-plan`);
      if (res.data && res.data.success) {
        setPlans(res.data.plans);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting plans");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className=" pt-10 relative">
       <div
             data-aos="zoom-in">
      <Heading name="Trending Plans" />
             </div>
      <div className="container py-16 mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((p, i) => (
             <div
             key={i}
             data-aos="zoom-in" 
           >
            <Plan
              img={planImg1} 
              alt={`plan-img-${i}`}
              name={p.planName}
              id={p._id}
              monthlyPrice={p.monthlyPlanAmount}
              yearlyPrice={p.yearlyPlanAmount}
              key={i}
            />
             </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-800 to-yellow-300 opacity-80 pointer-events-none z-[-1]"></div>

    </section>
  );
};

export default Plans;









