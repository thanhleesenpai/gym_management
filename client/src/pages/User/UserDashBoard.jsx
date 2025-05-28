// import React,{useEffect,useState} from 'react';
// import { Link } from 'react-router-dom';
// import axios from "axios";
// import { Heading, Loader } from '../../components';
// import {toast} from "react-hot-toast";
// import {useAuth} from "../../context/auth";
// const UserDashBoard = () => {
// const {auth} = useAuth();


//   // const [userCount, setUserCount] = useState(null);
//   // const [planCount, setPlanCount] = useState(null);
//   // const [subscriberCount, setSubscriberCount] = useState(null);

//   // const getUsers = async () => {
//   //   try {
//   //     const res = await axios.get("http://localhost:5000/api/v1/auth/total-user");
//   //     if (res.data && res.data.success) {
//   //       console.log(res.data.total);
//   //       setUserCount(res.data.total);
//   //     }
//   //   }
//   //   catch (err) {
//   //     console.log(err);
//   //     toast.error("something went wong in getting users");
//   //   }
//   // }

//   // const getPlans = async () => {
//   //   try {
//   //     const res = await axios.get("http://localhost:5000/api/v1/plan/total-plan");
//   //     if (res.data && res.data.success) {
//   //       console.log(res.data.total);
//   //       setPlanCount(res.data.total);
//   //     }
//   //   }
//   //   catch (err) {
//   //     console.log(err);
//   //     toast.error("something went wong in getting plans");
//   //   }
//   // }


//   // const getSubscriptions = async () => {
//   //   try {
//   //     const res = await axios.get("http://localhost:5000/api/v1/subscription/total-subscription");
//   //     if (res.data && res.data.success) {
//   //       console.log(res.data.total);
//   //       setSubscriberCount(res.data.total);
//   //     }
//   //   }
//   //   catch (err) {
//   //     console.log(err);
//   //     toast.error("something went wong in getting subscription");
//   //   }
//   // }


//   // useEffect(() => {
//   //   getUsers();
//   //   getPlans();
//   //   getSubscriptions();
//   // }, []);

//   return (
//     <section className='pt-10 bg-gray-900'>
//       <Heading name="User Dashboard"/>
//       <div className="container mx-auto px-6 py-20">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
//           <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to={`/dashboard/user/plan-detail`}>
//             <h2 className='text-white font-bold text-3xl'>Plan Detail</h2>
//           </Link>
//           <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to={`/dashboard/user/favourite-exercises`}>
//             <h2 className='text-white font-bold text-3xl'>Favourite Exercises</h2>
//           </Link>
//           <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to={`/dashboard/user/profile`}>
//             <h2 className='text-white font-bold text-3xl'>Profile</h2>
//           </Link>
//           {/* <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to={`/dashboard/user/feedbacks/${auth.user._id}`}>
//             <h2 className='text-white font-bold text-3xl'>Feedbacks</h2>
//           </Link> */}

//           <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to="/dashboard/user/feedbacks">
//             <h2 className='text-white font-bold text-3xl'>Feedbacks</h2>
//           </Link>


         
//         </div>
//       </div>
//     </section>
//   )
// }
// export default UserDashBoard;









































































// // import React,{useEffect,useState} from 'react';
// // import { Link } from 'react-router-dom';
// // import axios from "axios";
// // import { Heading } from '../../components';
// // import {toast} from "react-hot-toast";

// // const UserDashBoard = () => {
// //   const [userName, setUserName] = useState("");
// //   const [planName, setPlanName] = useState("");
// //   const [planAmount, setPlanAmount] = useState("");
// //   const [planType, setPlanType] = useState("");

// //   const getUserSubscription = async () => {
  
// //     try {
// //       const res = await axios.get("http://localhost:5000/api/v1/auth/get-user-plan");
// //       if (res.data && res.data.success) {
// //         console.log(res.data.subscription);
// //         console.log(res.data);
// //         // setUserName(res.data)
// //       }
// //     }
// //     catch (err) {
// //       console.log(err);
// //       toast.error("something went wong in getting subscription");
// //     }
  

 
// //   }

// //   useEffect(() => {
// //     getUserSubscription();
// //   },[])


// //   return (
// //     <section className='pt-10'>
// //     <Heading name="Admin Dashboard"/>
// //     <div className="container mx-auto px-6 py-20">
// //       {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
// //         <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to={`/dashboard/admin/user-list`}>
// //           <h2 className='text-white font-bold text-3xl'>Users:{userCount}</h2>
// //         </Link>
// //         <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to={`/dashboard/admin/subscriber-list`}>
// //           <h2 className='text-white font-bold text-3xl'>Subscribers:{subscriberCount}</h2>
// //         </Link>
// //         <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to={`/dashboard/admin/plans`}>
// //           <h2 className='text-white font-bold text-3xl'>Plans:{planCount}</h2>
// //         </Link>
// //       </div> */}
// //     </div>
// //   </section>
// //   )
// // }

// // export default UserDashBoard;


import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heading } from '../../components';
import { useAuth } from "../../context/auth";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const UserDashBoard = () => {
  const { auth } = useAuth();

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Set animation duration
  }, []);

  return (
    <section className='pt-10 bg-gray-900'>
      <Heading name="User Dashboard" />
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          <Link 
            className='p-5 border border-white hover:bg-blue-600 transition-all' 
            to={`/dashboard/user/plan-detail`}
            data-aos="fade-up"
          >
            <h2 className='text-white font-bold text-3xl'>Plan Detail</h2>
          </Link>
          
          <Link 
            className='p-5 border border-white hover:bg-blue-600 transition-all' 
            to={`/dashboard/user/favourite-exercises`}
            data-aos="fade-up"
          >
            <h2 className='text-white font-bold text-3xl'>Favourite Exercises</h2>
          </Link>
          
          <Link 
            className='p-5 border border-white hover:bg-blue-600 transition-all' 
            to={`/dashboard/user/profile`}
            data-aos="fade-up"
          >
            <h2 className='text-white font-bold text-3xl'>Profile</h2>
          </Link>

          <Link 
            className='p-5 border border-white hover:bg-blue-600 transition-all' 
            to="/dashboard/user/feedbacks"
            data-aos="fade-up"
          >
            <h2 className='text-white font-bold text-3xl'>Feedbacks</h2>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default UserDashBoard;
