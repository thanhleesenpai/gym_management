import React, { useState, useEffect } from 'react';
import { Heading, FeedbackComponent, Loader } from '../../components';
import axios from 'axios';
import {toast} from "react-hot-toast";
import {userImg} from "../../images";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/fetchData';
const FeedbackList = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedbackId, setFeedbackId] = useState(null); // Initialize subId as null
  const getAllFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/feedback/getall-feedback`);
      if (res.data && res.data.success) {
        console.log(res.data.feedbacks);
        setFeedbacks(res.data.feedbacks);
      }
      setLoading(false);
    }
    catch (err) {
      console.log(err);
      toast.error("something went wong in getting all feedbacks");
      setLoading(false);
    }
  }


  const handleDelete = async (id) => {
    try {
      let answer = window.prompt("Are you sure you want to delete feedback?");
      if (!answer) return;
      // const { data } = await axios.delete(`http://localhost:5000/api/v1/feedback/delete-feedback/${id}`);
      const { data } = await axios.delete(`${BASE_URL}/api/v1/feedback/delete-feedback/${id}`);
      if (data?.success) {
   
        console.log(data);
        toast.success(data.message);
        navigate("/dashboard/admin");
      } else {
        console.error(data?.message);
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  useEffect(() => {
    getAllFeedbacks();
  }, []);


  if(loading){
    return <Loader/>
  }


  return (
    <section className='pt-10 bg-gray-900'>
      <Heading name="Feedback List" />
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {feedbacks.map((f, i) => (
            <FeedbackComponent userImg={userImg} rating={f.rating} comment={f.message} name={f.user.name} date={f.date} i={i} key={i} feedbackId={f._id} handleDelete={() => handleDelete(f._id)} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeedbackList;