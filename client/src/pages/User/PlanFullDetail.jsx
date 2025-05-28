import React,{useState,useEffect} from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { Input, ButtonOutline,Loader } from "../../components";
import { useAuth } from '../../context/auth';
// import { TiTick } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { BASE_URL } from '../../utils/fetchData';
const PlanFullDetail = () => {
const {planid} = useParams();
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
const [loading, setLoading] = useState(false);
// console.log(plans);
   //  handle get Plans
   const getSinglePlan = async () => {
    try {
      // const res = await axios.get(`http://localhost:5000/api/v1/plan/get-plan/${planid}`);
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/plan/get-plan/${planid}`);
      if (res.data && res.data.success) {
        // setplans(res.data.plan);
        // console.log(res.data);
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
    }
    catch (err) {
      console.log(err);
      toast.error("something went wong in getting plan");
      setLoading(false);
    }
  }

  useEffect(() => {
    getSinglePlan();
  }, [planid]);


  if(loading){
    return <Loader/>
  }

  return (
    <section className='py-20 flex flex-col justify-center items-center gap-2 bg-gray-900'>
      <h2 className='text-white text-2xl sm:text-3xl text-center'>You Have Choosen {planName} Plan </h2>
      <p className='text-white text-2xl sm:text-3xl text-center'>The Features Of The Pack Is Shown Below:</p>
      <div className="container mx-auto px-6 py-4">
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-col-4
         gap-5 pt-20 '>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Water Stations"/> 
         {waterStations === "Available"  ? <TiTick className='text-green-500 text-4xl font-bold border-2 '/> : <IoClose className='text-red-600 text-4xl font-bold border-2' /> } 
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Locker Rooms"/> 
          {lockerRooms === "Available"  ? <TiTick className='text-green-500 text-4xl font-bold border-2 '/> : <IoClose className='text-red-600 text-4xl font-bold border-2' /> } 
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Special Events"/> 
          {specialEvents === "Available"  ? <TiTick className='text-green-500 text-4xl font-bold border-2 '/> : <IoClose className='text-red-600 text-4xl font-bold border-2' /> } 
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Wifi Service"/> 
          {wifiService === "Available"  ? <TiTick className='text-green-500 text-4xl font-bold border-2 '/> : <IoClose className='text-red-600 text-4xl font-bold border-2' /> } 
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Cardio Class"/> 
          {cardioClass === "Available"  ? <TiTick className='text-green-500 text-4xl font-bold border-2 '/> : <IoClose className='text-red-600 text-4xl font-bold border-2' /> } 
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Café or Lounge"/> 
          {cafeOrLounge === "Available"  ? <TiTick className='text-green-500 text-4xl font-bold border-2 '/> : <IoClose className='text-red-600 text-4xl font-bold border-2' /> } 
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Personal Trainer"/> 
          {personalTrainer === "Available"  ? <TiTick className='text-green-500 text-4xl font-bold border-2 '/> : <IoClose className='text-red-600 text-4xl font-bold border-2' /> } 
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Group Fitness Classes"/> 
          {groupFitnessClasses === "Available"  ? <TiTick className='text-green-500 text-4xl font-bold border-2 '/> : <IoClose className='text-red-600 text-4xl font-bold border-2' /> } 
          </div>

          <div className='flex gap-5 justify-center items-center'>
          <ButtonOutline text="Refreshment"/> 
          {refreshment === "Available"  ? <TiTick className='text-green-500 text-4xl font-bold border-2 '/> : <IoClose className='text-red-600 text-4xl font-bold border-2' /> } 
          </div>
        </div>
      </div>
        <Link to={`/dashboard/user`} className='bg-blue-500 text-white font-medium text-lg rounded-sm hover:opacity-90 transition-all px-6 py-2'>Go Back</Link>

    </section>
  )
}

export default PlanFullDetail;