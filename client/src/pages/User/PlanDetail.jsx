// import React,{useEffect,useState} from 'react';
// import { Link } from 'react-router-dom';
// import axios from "axios";
// import { Heading, Subscription } from '../../components';
// import {toast} from "react-hot-toast";
// import { userImg } from '../../images';


// const formatDate = (timestamp) => {
//   const date = new Date(timestamp);
//   const day = date.getDate();
//   const month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
//   const year = date.getFullYear();
//   return { day, month, year };
// };

// const PlanDetail = () => {
//   const [userName, setUserName] = useState("");
//   const [planName, setPlanName] = useState("");
//   const [planAmount, setPlanAmount] = useState("");
//   const [planType, setPlanType] = useState("");
//   const [createdAt, setCreatedAt] = useState(null);
//   const [dateComponents, setDateComponents] = useState({ day: null, month: null, year: null });
//   // const [updatedAt, setUpdatedAt] = useState(null);

//   const getUserSubscription = async () => {
  
//     try {
//       const res = await axios.get("http://localhost:5000/api/v1/auth/get-user-plan");
//       if (res.data && res.data.success) {
//         console.log(res.data.subscription);
//         console.log(res.data);
//         setUserName(res.data.subscription.userName);
//         setPlanName(res.data.subscription.plan.planName);
//         setPlanAmount(res.data.subscription.planAmount);
//         setPlanType(res.data.subscription.planType);
//         setCreatedAt(res.data.subscription.createdAt);
//         console.log(res.data.subscription.createdAt);
//         // setUpdatedAt(res.data.subscription.updatedAt);
//       }
//     }
//     catch (err) {
//       console.log(err);
//       toast.error("something went wrong in getting subscription");
//     }
  
//   }


//   useEffect(() => {
//     const components = formatDate(createdAt);
//     setDateComponents(components);
//     getUserSubscription();
//   },[createdAt])



//   return (
//     <section className='pt-10'>
//     <Heading name="Current User Plan"/>
//     <div className="container mx-auto px-6 py-20">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
//       <Subscription userImg={userImg} userName={userName} planName={planName} planAmount={planAmount} planType={planType} day={dateComponents.day} month={dateComponents.month} year={dateComponents.year}/>
//       </div>
//     </div>
//   </section>
//   )
// }

// export default PlanDetail;









// ================================================




import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Heading, Subscription,Loader } from '../../components';
import {toast} from "react-hot-toast";
import { userImg } from '../../images';
import { BASE_URL } from '../../utils/fetchData';




const PlanDetail = () => {
  const [allUserSubscription, setAllUserSubscription] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllUserSubscription = async () => {
  
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/auth/get-all-user-plan`);
      if (res.data && res.data.success) {
        console.log(res.data.subscription);
        console.log(res.data);
        setAllUserSubscription(res.data.subscription);
      }
      setLoading(false);
    }
    catch (err) {
      console.log(err);
      toast.error("something went wrong in getting all subscription");
      setLoading(false);
    }
  
  }



  useEffect(() => {
    
    getAllUserSubscription();
  },[])


  if(allUserSubscription.length === 0){
    return <h1 className=' text-3xl sm:text-5xl text-white flex justify-center items-center h-screen'>No Plan Choosen</h1>
  }

  if(loading){
    return <Loader/>
  }

  return (
    <section className='pt-10 bg-gray-900'>
    <Heading name="Current User Plan"/>
    <div className="container mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        {allUserSubscription.map((u,i) =>(
          <Subscription userImg={userImg} userName={u.userName} planName={u.plan.planName} planAmount={u.planAmount} planType={u.planType} i={i} key={i} createdAt={u.createdAt} planid={u.plan._id}/>
        ))}
      </div>



    </div>
  </section>
  )
}

export default PlanDetail;


