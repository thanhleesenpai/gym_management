import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Input } from "../../components";
import { BASE_URL } from '../../utils/fetchData';

const CreatePlan = () => {
  const navigate = useNavigate();
  const [planName, setPlanName] = useState("");
  const [monthlyPlanAmount, setMonthlyPlanAmount] = useState("");
  const [yearlyPlanAmount, setYearlyPlanAmount] = useState("");
  const [waterStations, setWaterStations] = useState("Not Available");
  const [wifiService, setWifiService] = useState("Not Available");
  const [cardioClass, setCardioClass] = useState("Not Available");
  const [refreshment, setRefreshment] = useState("Not Available");
  const [groupFitnessClasses, setGroupFitnessClasses] = useState("Not Available");
  const [personalTrainer, setPersonalTrainer] = useState("Not Available");
  const [specialEvents, setSpecialEvents] = useState("Not Available");
  const [lockerRooms, setLockerRooms] = useState("Not Available");
  const [cafeOrLounge, setCafeOrLounge] = useState("Not Available");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);




  console.log(planName, monthlyPlanAmount, yearlyPlanAmount, waterStations, wifiService, cardioClass, refreshment, groupFitnessClasses, personalTrainer, specialEvents, lockerRooms, cafeOrLounge);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(planName, monthlyPlanAmount, yearlyPlanAmount, waterStations, wifiService, cardioClass, refreshment, groupFitnessClasses, personalTrainer, specialEvents, lockerRooms, cafeOrLounge);

    try {
    
      const res = await axios.post(`${BASE_URL}/api/v1/plan/create-plan`, {
        planName, monthlyPlanAmount, yearlyPlanAmount, waterStations ,lockerRooms, wifiService, cardioClass, refreshment, groupFitnessClasses, personalTrainer, specialEvents, cafeOrLounge
      });
      console.log(res);
      if (res.data && res.data.success) {
        toast.success(res.data.message);
        navigate("/dashboard/admin/plans");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log("something went wrong..");
      toast.error("something went wrong");
    }
  }

  return (
    <section className='py-60 bg-gray-900'>
      <div className='container mx-auto px-6'>
        <form className='flex w-full h-screen justify-center items-center flex-col gap-5' onSubmit={onSubmit}>
          <h2 className='text-center text-4xl text-white font-bold'>Create Plan</h2>

          <Input
            type="text"
            placeholder="Plan Name"
            name="planname"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            pattern="[A-Za-z ]+"
          />

   

<Input
  type="text"
  placeholder="Monthly Amount"
  name="monthlyAmount"
  value={monthlyPlanAmount}
  onChange={(e) => {
    const inputText = e.target.value;
    const containsNonNumeric = /\D/.test(inputText); // Check if input contains non-numeric characters
    if (!containsNonNumeric || inputText === "") {
      // If input contains only numeric characters or is empty, update monthlyAmount state
      setMonthlyPlanAmount(inputText);
    } else {
      // If input contains non-numeric characters, display an error toast message
      toast.error("Only numeric value is allowed for monthly amount");
      // You can also perform any other action here, such as resetting the input field
    }
  }}
/>



<Input
  type="text"
  placeholder="Yearly Amount"
  name="yearlyAmount"
  value={yearlyPlanAmount}
  onChange={(e) => {
    const inputText = e.target.value;
    const containsNonNumeric = /\D/.test(inputText); // Check if input contains non-numeric characters
    if (!containsNonNumeric || inputText === "") {
      // If input contains only numeric characters or is empty, update yearlyAmount state
      setYearlyPlanAmount(inputText);
    } else {
      // If input contains non-numeric characters, display an error toast message
      toast.error("Only numeric value is allowed for yearly amount");
      // You can also perform any other action here, such as resetting the input field
    }
  }}
/>



          <div className="flex flex-col w-full sm:max-w-[750px]">
            <label htmlFor="waterStation" className="text-white text-sm font-bold mb-1">Water Stations</label>
            <select
              id="waterStation"
              value={waterStations}
              onChange={(e) => setWaterStations(e.target.value)}
              className="w-full px-4 py-3 rounded-md border-none outline-none bg-white placeholder:text-gray-600 placeholder:font-bold font-medium text-black"
            >
              <option value="">Choose availability</option>
              <option value="Available" defaultValue={waterStations === "Available"}>Available</option>
              <option value="Not Available" defaultValue={waterStations === "Not Available"} >Not Available</option>
            </select>
          </div>


          <div className="flex flex-col w-full sm:max-w-[750px]">
            <label htmlFor="wifiService" className="text-white text-sm font-bold mb-1">wifi Service</label>
            <select
              id="wifiService"
              value={wifiService}
              onChange={(e) => setWifiService(e.target.value)}
              className="w-full px-4 py-3 rounded-md border-none outline-none bg-white placeholder:text-gray-600 placeholder:font-bold font-medium text-black"
            >
               <option value="">Choose availability</option>
              <option value="Available" defaultValue={wifiService === "Available"}>Available</option>
              <option value="Not Available" defaultValue={wifiService === "Not Available"} >Not Available</option>
            </select>
          </div>

          <div className="flex flex-col w-full sm:max-w-[750px]">
            <label htmlFor="cardioClass" className="text-white text-sm font-bold mb-1">cardio Class</label>
            <select
              id="cardioClass"
              value={cardioClass}
              onChange={(e) => setCardioClass(e.target.value)}
              className="w-full px-4 py-3 rounded-md border-none outline-none bg-white placeholder:text-gray-600 placeholder:font-bold font-medium text-black"
            >
                <option value="">Choose availability</option>
              <option value="Available" defaultValue={cardioClass === "Available"}>Available</option>
              <option value="Not Available" defaultValue={cardioClass === "Not Available"} >Not Available</option>
            </select>
          </div>


          <div className="flex flex-col w-full sm:max-w-[750px]">
            <label htmlFor="refreshment" className="text-white text-sm font-bold mb-1">refreshment</label>
            <select
              id="refreshment"
              value={refreshment}
              onChange={(e) => setRefreshment(e.target.value)}
              className="w-full px-4 py-3 rounded-md border-none outline-none bg-white placeholder:text-gray-600 placeholder:font-bold font-medium text-black"
            >
               <option value="">Choose availability</option>
              <option value="Available" defaultValue={refreshment === "Available"}>Available</option>
              <option value="Not Available" defaultValue={refreshment === "Not Available"} >Not Available</option>
            </select>
          </div>


          <div className="flex flex-col w-full sm:max-w-[750px]">
            <label htmlFor="groupFitnessClasses" className="text-white text-sm font-bold mb-1">groupFitnessClasses</label>
            <select
              id="groupFitnessClasses"
              value={groupFitnessClasses}
              onChange={(e) => setGroupFitnessClasses(e.target.value)}
              className="w-full px-4 py-3 rounded-md border-none outline-none bg-white placeholder:text-gray-600 placeholder:font-bold font-medium text-black"
            >
              <option value="">Choose availability</option>
              <option value="Available" defaultValue={groupFitnessClasses === "Available"}>Available</option>
              <option value="Not Available" defaultValue={groupFitnessClasses === "Not Available"} >Not Available</option>
            </select>
          </div>



          <div className="flex flex-col w-full sm:max-w-[750px]">
            <label htmlFor="personalTrainer" className="text-white text-sm font-bold mb-1">personal Trainer</label>
            <select
              id="personalTrainer"
              value={personalTrainer}
              onChange={(e) => setPersonalTrainer(e.target.value)}
              className="w-full px-4 py-3 rounded-md border-none outline-none bg-white placeholder:text-gray-600 placeholder:font-bold font-medium text-black"
            >
                <option value="">Choose availability</option>
              <option value="Available" defaultValue={personalTrainer === "Available"}>Available</option>
              <option value="Not Available" defaultValue={personalTrainer === "Not Available"} >Not Available</option>
            </select>
          </div>



          <div className="flex flex-col w-full sm:max-w-[750px]">
            <label htmlFor="specialEvents" className="text-white text-sm font-bold mb-1">special Events</label>
            <select
              id="specialEvents"
              value={specialEvents}
              onChange={(e) => setSpecialEvents(e.target.value)}
              className="w-full px-4 py-3 rounded-md border-none outline-none bg-white placeholder:text-gray-600 placeholder:font-bold font-medium text-black"
            >
                <option value="">Choose availability</option>
              <option value="Available" defaultValue={specialEvents === "Available"}>Available</option>
              <option value="Not Available" defaultValue={specialEvents === "Not Available"} >Not Available</option>
            </select>
          </div>



          <div className="flex flex-col w-full sm:max-w-[750px]">
            <label htmlFor="lockerRooms" className="text-white text-sm font-bold mb-1">locker Rooms</label>
            <select
              id="lockerRooms"
              value={lockerRooms}
              onChange={(e) => setLockerRooms(e.target.value)}
              className="w-full px-4 py-3 rounded-md border-none outline-none bg-white placeholder:text-gray-600 placeholder:font-bold font-medium text-black"
            >
             <option value="">Choose availability</option>
              <option value="Available" defaultValue={lockerRooms === "Available"}>Available</option>
              <option value="Not Available" defaultValue={lockerRooms === "Not Available"} >Not Available</option>
            </select>
          </div>



          <div className="flex flex-col w-full sm:max-w-[750px]">
            <label htmlFor="cafeOrLounge" className="text-white text-sm font-bold mb-1">cafeOrLounge</label>
            <select
              id="cafeOrLounge"
              value={cafeOrLounge}
              onChange={(e) => setCafeOrLounge(e.target.value)}
              className="w-full px-4 py-3 rounded-md border-none outline-none bg-white placeholder:text-gray-600 placeholder:font-bold font-medium text-black"
            >
            <option value="">Choose availability</option>
              <option value="Available" defaultValue={cafeOrLounge === "Available"}>Available</option>
              <option value="Not Available" defaultValue={cafeOrLounge === "Not Available"} >Not Available</option>
            </select>
          </div>


          <button type='submit' className='btn px-5 py-2 font-normal outline-none border border-white rounded-sm text-xl text-white hover:text-black hover:bg-white transition-all ease-in w-full max-w-[750px]'>Submit</button>
        </form>
      </div>

    </section>
  )
}

export default CreatePlan;
