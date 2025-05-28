import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { Input, ButtonOutline, Loader } from '../components';
import { useAuth } from '../context/auth';
import { FiArrowUpRight } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { BASE_URL } from '../utils/fetchData';
const PlanSelection = () => {
  const { planid } = useParams();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState(auth?.user?.name);
  const [planName, setPlanName] = useState("");
  const [planAmount, setPlanAmount] = useState(0); // Initialize plan amount to 0
  const [monthlyPlanAmount, setMonthlyPlanAmount] = useState("");
  const [yearlyPlanAmount, setYearlyPlanAmount] = useState("");
  const [planType, setPlanType] = useState("");
  const [planId, setPlanId] = useState(planid);
const [loading, setLoading] = useState(false);

  const getPlan = async () => {
    try {
      // const res = await axios.get(`http://localhost:5000/api/v1/plan/get-plan/${planid}`);
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/plan/get-plan/${planid}`);
      if (res.data && res.data.success) {
        setPlanName(res.data.plan.planName);
        setMonthlyPlanAmount(res.data.plan.monthlyPlanAmount);
        setYearlyPlanAmount(res.data.plan.yearlyPlanAmount);
        console.log(res.data.plan);
      }
      setLoading(false);
    }
    catch (err) {
      console.log(err);
      toast.error("something went wrong in getting subscription");
    }
    setLoading(false);
  }

  useEffect(() =>{
    window.scrollTo({top:0, left:0, behavior:"smooth"});
    getPlan();
  },[planid]);

  const calculatePlanAmount = (planType) => {

    if (planType === "1 Month") {
      return monthlyPlanAmount;
    }
    else if (planType === "2 Month") {
      // Calculate plan amount for 3 months (e.g., by multiplying monthly amount by 3)
      return monthlyPlanAmount * 2;
    }
    else if (planType === "3 Month") {
      return monthlyPlanAmount * 3;
    }

    else if (planType === "4 Month") {
      return monthlyPlanAmount * 4;
    }

    else if (planType === "5 Month") {
      return monthlyPlanAmount * 5;
    }

    else if (planType === "6 Month") {
      return monthlyPlanAmount * 6;
    }

    else if (planType === "7 Month") {
      return monthlyPlanAmount * 7;
    }

    else if (planType === "8 Month") {
      return monthlyPlanAmount * 8;
    }

    else if (planType === "9 Month") {
      return monthlyPlanAmount * 9;
    }

    else if (planType === "10 Month") {
      return monthlyPlanAmount * 10;
    }

    else if (planType === "11 Month") {
      return monthlyPlanAmount * 11;
    }


    else if (planType === "1 Year") {
      return yearlyPlanAmount || monthlyPlanAmount * 12;
    }

    else {
      return 0;
    }

  }

  // Update plan amount when plan duration changes
  const handleDurationChange = (planType) => {
    setPlanType(planType);
    const amount = calculatePlanAmount(planType);
    setPlanAmount(amount);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(userName, planName, planAmount, planType, planId);




    try {
    

      const res = await axios.post(`${BASE_URL}/api/v1/subscription/create-subscription`, {
        userName, planType, planAmount, planId
      });
      

    if (res.data && res.data.success) {
      toast.success(res.data.message);
      navigate("/");
    } else {
      if (res.data && res.data.message === "You already have an active subscription") {
        toast.error(res.data.message);
        console.log(res.data.message);
        navigate("/dashboard/user/plan-detail");
      } else {
        toast.error(res.data.message || "Failed to create subscription");
      }
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong while creating subscription");
   
  }

  }

  if(loading){
    return <Loader/>
  }

  return (
    <section className='bg-gray-900'>
      <div className='container mx-auto px-6'>
        <form className='flex w-full h-screen justify-center items-center flex-col gap-5' onSubmit={onSubmit}>
          <h2 className='text-center text-4xl text-white font-bold'>Choose Plan</h2>

          <Input
            type="text"
            placeholder="User Name"
            name="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            pattern="[A-Za-z ]+"
            minLength="4"
            maxLength="30"
          />

          <Input
            type="text"
            placeholder="Plan Name"
            name="planname"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
          />
      
          <select
            value={planType}
            onChange={(e) => handleDurationChange(e.target.value)}
            className="w-full max-w-[750px] px-7 py-3 rounded-md border-none outline-none bg-white placeholder:text-gray-600 placeholder:font-bold font-medium"
          >
            <option value="">Select Duration</option>
            <option value="1 Month">1 Month</option>
            <option value="2 Month">2 Month</option>
            <option value="3 Month">3 Month</option>
            <option value="4 Month">4 Month</option>
            <option value="5 Month">5 Month</option>
            <option value="6 Month">6 Month</option>
            <option value="7 Month">7 Month</option>
            <option value="8 Month">8 Month</option>
            <option value="9 Month">9 Month</option>
            <option value="10 Month">10 Month</option>
            <option value="11 Month">11 Month</option>
            {/* <option value="12 Month">12 Month</option> */}

            <option value="1 Year">1 Year</option>
          </select>
          {/* </div> */}

          <Input
            type="text"
            placeholder="Plan Amount"
            name="planamount"
            value={planAmount}
            onChange={(e) => setPlanAmount(e.target.value)}
            // pattern="[0-9]+"
            disabled // Disable user input for plan amount
          />

             <Input
            type="text"
            placeholder="Plan Id"
            name="planid"
            value={planId}
            onChange={(e) => setPlanId(e.target.value)}
            // pattern="[0-9]+"
            disabled // Disable user input for plan amount
          />

          <button type='submit' className='btn px-5 py-2 font-normal outline-none border border-white rounded-sm text-xl text-white hover:text-black hover:bg-white transition-all ease-in w-full max-w-[750px]'>Submit</button>
        </form>
      </div>





{ planType === "1 Month" && <div className="container mx-auto px-6">
     <h2 className='text-center text-4xl text-white font-bold py-2'>Plan Detail</h2>
        <article className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-col-4
         gap-5 pt-20 '>
          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Water Stations"/> 
          <FiArrowUpRight className='text-green-500 text-4xl font-bold border-2 '/>
          </div>
          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Locker Rooms"/> 
          <FiArrowUpRight className='text-green-500 text-4xl font-bold border-2 '/>
          </div>
          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Special Events"/> 
          <FiArrowUpRight className='text-green-500 text-4xl font-bold border-2 '/>
          </div>
          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Wifi Service"/> 
          <FiArrowUpRight className='text-green-700 text-4xl font-bold border-2 '/>
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Cardio Class"/> 
          <FiArrowUpRight className='text-green-700 text-4xl font-bold border-2 '/>
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Refreshment Area"/> 
          <IoClose className='text-red-700 text-4xl font-bold border-2 '/>
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Smoothie Bar"/> 
          <IoClose className='text-red-700 text-4xl font-bold border-2 '/>
          </div>
         
        </article>
      </div>      
}








{ planType === "1 Year" && <div className="container mx-auto px-6">
     <h2 className='text-center text-4xl text-white font-bold py-2'>Plan Detail</h2>
        <article className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-col-4
         gap-5 pt-20 '>
          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Water Stations"/> 
          <FiArrowUpRight className='text-green-500 text-4xl font-bold border-2 '/>
          </div>
          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Locker Rooms"/> 
          <FiArrowUpRight className='text-green-500 text-4xl font-bold border-2 '/>
          </div>
          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Special Events"/> 
          <FiArrowUpRight className='text-green-500 text-4xl font-bold border-2 '/>
          </div>
          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Wifi Service"/> 
          <FiArrowUpRight className='text-green-700 text-4xl font-bold border-2 '/>
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Cardio Class"/> 
          <FiArrowUpRight className='text-green-700 text-4xl font-bold border-2 '/>
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Café or Lounge"/> 
          <FiArrowUpRight className='text-green-700 text-4xl font-bold border-2 '/>
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Smoothie Bar"/> 
          <FiArrowUpRight className='text-green-700 text-4xl font-bold border-2 '/>
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Personal Trainer"/> 
          <FiArrowUpRight className='text-green-700 text-4xl font-bold border-2 '/>
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Group Fitness Classes"/> 
          <FiArrowUpRight className='text-green-700 text-4xl font-bold border-2 '/>
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Refreshment"/> 
          <IoClose className='text-red-700 text-4xl font-bold border-2 '/>
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Sauna or Steam Room"/> 
          <IoClose className='text-red-700 text-4xl font-bold border-2 '/>
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Childcare Services"/> 
          <IoClose className='text-red-700 text-4xl font-bold border-2 '/>
          </div>
         
        </article>
      </div>      
}




{ planName === "Ultimate Uplift" && <div className="container mx-auto px-6">
     <h2 className='text-center text-4xl text-white font-bold py-2'>Plan Detail</h2>
        <article className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-col-4
         gap-5 pt-20 '>
          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Water Stations"/> 
          <FiArrowUpRight className='text-green-500 text-4xl font-bold border-2 '/>
          </div>
          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Locker Rooms"/> 
          <FiArrowUpRight className='text-green-500 text-4xl font-bold border-2 '/>
          </div>
          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Special Events"/> 
          <FiArrowUpRight className='text-green-500 text-4xl font-bold border-2 '/>
          </div>
          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Wifi Service"/> 
          <FiArrowUpRight className='text-green-700 text-4xl font-bold border-2 '/>
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Cardio Class"/> 
          <FiArrowUpRight className='text-green-700 text-4xl font-bold border-2 '/>
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Café or Lounge"/> 
          <FiArrowUpRight className='text-green-700 text-4xl font-bold border-2 '/>
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Smoothie Bar"/> 
          <FiArrowUpRight className='text-green-700 text-4xl font-bold border-2 '/>
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Personal Trainer"/> 
          <FiArrowUpRight className='text-green-700 text-4xl font-bold border-2 '/>
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Group Fitness Classes"/> 
          <FiArrowUpRight className='text-green-700 text-4xl font-bold border-2 '/>
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Refreshment"/> 
          <FiArrowUpRight className='text-green-700 text-4xl font-bold border-2 '/>
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Sauna or Steam Room"/> 
          <FiArrowUpRight className='text-green-700 text-4xl font-bold border-2 '/>
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Childcare Services"/> 
          <FiArrowUpRight className='text-green-700 text-4xl font-bold border-2 '/>
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Equipment Rentals"/> 
          <FiArrowUpRight className='text-green-700 text-4xl font-bold border-2 '/>
          </div>         
         
        </article>
      </div>      
}


    </section>
  )
}

export default PlanSelection;
