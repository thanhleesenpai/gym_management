
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Input, ButtonOutline, Loader } from '../components';
import { useAuth } from '../context/auth';
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { BASE_URL } from '../utils/fetchData';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const PlanDetails = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const { planid } = useParams();
  const [planName, setPlanName] = useState("");
  const [monthlyPlanAmount, setMonthlyPlanAmount] = useState("");
  const [yearlyPlanAmount, setYearlyPlanAmount] = useState("");
  const [waterStations, setWaterStations] = useState("");
  const [wifiService, setWifiService] = useState("");
  const [cardioClass, setCardioClass] = useState("");
  const [refreshment, setRefreshment] = useState("");
  const [groupFitnessClasses, setGroupFitnessClasses] = useState("");
  const [personalTrainer, setPersonalTrainer] = useState("");
  const [specialEvents, setSpecialEvents] = useState("");
  const [lockerRooms, setLockerRooms] = useState("");
  const [cafeOrLounge, setCafeOrLounge] = useState("");

  const getSinglePlan = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/plan/get-plan/${planid}`);
      if (res.data && res.data.success) {
        setPlanName(res.data.plan.planName);
        setMonthlyPlanAmount(res.data.plan.monthlyPlanAmount);
        setYearlyPlanAmount(res.data.plan.yearlyPlanAmount);
        setWaterStations(res.data.plan.waterStations);
        setWifiService(res.data.plan.wifiService);
        setCardioClass(res.data.plan.cardioClass);
        setRefreshment(res.data.plan.refreshment);
        setGroupFitnessClasses(res.data.plan.groupFitnessClasses);
        setPersonalTrainer(res.data.plan.personalTrainer);
        setSpecialEvents(res.data.plan.specialEvents);
        setLockerRooms(res.data.plan.lockerRooms);
        setCafeOrLounge(res.data.plan.cafeOrLounge);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting plan");
      setLoading(false);
    }
  };

  useEffect(() => {
    getSinglePlan();
    AOS.init({ duration: 1000 }); // Initialize AOS
  }, [planid]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className='py-20 flex flex-col justify-center items-center bg-gray-900'>
      <h2 className='text-white text-3xl sm:text-4xl font-bold text-center mb-6' data-aos="fade-up">
        What You Will Get In This Pack?
      </h2>
      <div className="container mx-auto px-6 py-4">
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-10'>
          {[
            { label: "Water Stations", value: waterStations },
            { label: "Locker Rooms", value: lockerRooms },
            { label: "Special Events", value: specialEvents },
            { label: "Wifi Service", value: wifiService },
            { label: "Cardio Class", value: cardioClass },
            { label: "Café or Lounge", value: cafeOrLounge },
            { label: "Personal Trainer", value: personalTrainer },
            { label: "Group Fitness Classes", value: groupFitnessClasses },
            { label: "Refreshment", value: refreshment },
          ].map((item, index) => (
            <div 
              key={index} 
              className='flex items-center justify-center gap-3 p-4 bg-gray-800 rounded-lg shadow-lg' 
              data-aos="zoom-in" // Add AOS attribute here
            >
              <ButtonOutline text={item.label} />
              {item.value === "Available" ? (
                <TiTick className='text-green-500 text-4xl' />
              ) : (
                <IoClose className='text-red-600 text-4xl' />
              )}
            </div>
          ))}
        </div>
      </div>
      <Link
        to={auth.user ? `/plan-subscribe/${planid}` : "/login"}
        className='mt-8 bg-blue-500 text-white font-medium text-lg rounded-md hover:opacity-90 transition-all px-8 py-3 shadow-lg'
        data-aos="fade-up" // Add AOS attribute here
      >
        Buy Now
      </Link>
    </section>
  );
}

export default PlanDetails;
