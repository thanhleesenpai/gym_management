import React, { useState, useEffect } from 'react';
import { Heading, FeedbackComponent, Loader } from '../../components';
import axios from 'axios';
import { toast } from "react-hot-toast";
import { userImg } from "../../images";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/fetchData';
const FeedbackList = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adminId, setAdminId] = useState(null);

  const getAdminId = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/user/users`, {
        headers: { Authorization: localStorage.getItem("token") }
      });
      // Tìm user có role 3 (admin)
      if (Array.isArray(res.data)) {
        const admin = res.data.find(u => u.role === 3);
        if (admin) setAdminId(admin._id);
      } else if (Array.isArray(res.data.users)) {
        const admin = res.data.users.find(u => u.role === 3);
        if (admin) setAdminId(admin._id);
      }
    } catch (err) {
      // Không cần toast ở đây
    }
  }

  const getAllFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/feedback/getall-feedback`);
      if (res.data && res.data.success) {
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
      const confirm = window.confirm("Are you sure you want to delete this feedback?");
      if (!confirm) return;
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
    getAdminId();
    getAllFeedbacks();
  }, []);

  const filteredFeedbacks = feedbacks.filter(f =>
    // Nếu receiver là object và role 3 (admin)
    (f.receiver && typeof f.receiver === "object" && f.receiver.role === 3) ||
    // Nếu receiver là object và _id trùng adminId
    (f.receiver && typeof f.receiver === "object" && adminId && f.receiver._id === adminId) ||
    // Nếu receiver là string và trùng adminId
    (f.receiver && typeof f.receiver === "string" && adminId && f.receiver === adminId) ||
    // Nếu không có receiver (mặc định là admin)
    !f.receiver
  );

  if (loading) {
    return <Loader />
  }


  return (
    <section className='pt-10 bg-blue-300'>
      <Heading name="Feedback List" />
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {filteredFeedbacks.map((f, i) => (
            <FeedbackComponent
              userImg={userImg}
              rating={f.rating}
              comment={f.message}
              name={f.user?.name}
              date={f.date}
              i={i}
              key={i}
              feedbackId={f._id}
              handleDelete={() => handleDelete(f._id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeedbackList;