import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Input} from "../../components";
import { BASE_URL } from '../../utils/fetchData';

const UpdatePlan = () => {
  const navigate = useNavigate();
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

  const getSinglePlan = async () => {
    try {
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

        console.log(res.data.plan);
      }
    }
    catch (err) {
      console.log(err);
      toast.error("something went wong in getting plans");
    }
  }




  useEffect(() =>{
    getSinglePlan();
  },[planid]);


  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(  planName, monthlyPlanAmount, yearlyPlanAmount, waterStations, wifiService, cardioClass, refreshment, groupFitnessClasses, personalTrainer, specialEvents, lockerRooms, cafeOrLounge);

    try {
 
      const res = await axios.put(`${BASE_URL}/api/v1/plan/update-plan/${planid}`, {
        planName, monthlyPlanAmount, yearlyPlanAmount, waterStations, wifiService, cardioClass, refreshment, groupFitnessClasses, personalTrainer, specialEvents, lockerRooms, cafeOrLounge
      });

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
  

  const handleDelete = async () => {
    try {
      let answer = window.prompt("are you sure you want to delete this product ?");
      if(!answer) return;
      const {data} = await axios.delete(`http://localhost:5000/api/v1/plan/delete-plan/${planid}`);
      if (data?.success) {
      toast.success(`selected product is deleted`);
      navigate("/dashboard/admin/plans");
      console.log(data);
     }
     else{
      toast.error(data?.message);
     }
      
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in deleting product")
    }
   }
  
  return (
    <section className='py-80 bg-gray-900'>
      <div className='container mx-auto px-6'>
        <form className='flex w-full h-screen justify-center items-center flex-col gap-5' onSubmit={handleUpdate}>
          <h2 className='text-center text-4xl text-white font-bold'>Update Plan</h2>

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
            placeholder="MonthlyPlan Amount"
            name="monthlyplanamount"
            value={monthlyPlanAmount}
            onChange={(e) => setMonthlyPlanAmount(e.target.value)}
            // pattern="[A-Za-z ]+"
            // minLength="7"
            // maxLength="30"
          />

          <Input
            type="text"
            placeholder="YearlyPlan Amount"
            name="yearlyplanamount"
            value={yearlyPlanAmount}
            onChange={(e) => setYearlyPlanAmount(e.target.value)}
            // pattern="[A-Za-z ]+"
            // minLength="6"
            // maxLength="30"
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


          <button type='submit' className='btn px-5 py-2 font-normal outline-none border border-white rounded-sm text-xl text-white hover:text-black hover:bg-white transition-all ease-in w-full max-w-[750px]'>Update</button>

          <button type='button' className='btn px-5 py-2 font-normal outline-none border border-white rounded-sm text-xl text-white hover:text-black hover:bg-white transition-all ease-in w-full max-w-[750px]' onClick={handleDelete}>Delete</button>
        </form>
      </div>

    </section>
  )
}

export default UpdatePlan;
