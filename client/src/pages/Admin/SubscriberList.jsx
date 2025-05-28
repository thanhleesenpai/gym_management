

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heading, Subscription, Loader } from '../../components';
import { userImg } from "../../images";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/fetchData';

const SubscriberList = () => {
  const [subscriber, setSubscriber] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [subId, setSubId] = useState(null); // Initialize subId as null
console.log(subscriber);
  const getAllSubscribers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/subscription/getall-subscription`);
      if (res.data && res.data.success) {
        setSubscriber(res.data.subscriptions);
      }
      setLoading(false); 
    } catch (err) {
      console.log(err);
      setLoading(false); 
    }
  };

  useEffect(() => {
    getAllSubscribers();
  }, []);

  const handleDelete = async (id) => {
    try {
      let answer = window.prompt("Are you sure you want to delete subscriber?");
      if (!answer) return;
         const { data } = await axios.delete(`${BASE_URL}/api/v1/subscription/delete-subscription/${id}`);
      if (data?.success) {
        console.log(data);
        navigate("/dashboard/admin");
      } else {
        console.error(data?.message);
      }
    } catch (error) {
      console.error("Error deleting subscriber:", error);
    }
  };


  if(loading){
    return <Loader/>
  }

  return (
    <section className='pt-10 bg-gray-900'>
      <Heading name="Subscriber List" />
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subscriber.map((s, i) => (
            <Subscription
              key={i}
              userImg={userImg}
              userName={s.userName}
              planName={s.plan.planName} 
              planAmount={s.planAmount}
              planType={s.planType}
              createdAt={s.createdAt} 
              planid={s.planId} 
              subId={s._id} 
              handleDelete={() => handleDelete(s._id)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriberList;
