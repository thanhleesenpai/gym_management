import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/auth';
import { toast } from "react-hot-toast";
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/fetchData';

const Feedback = () => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(1);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [receiver, setReceiver] = useState(""); // id người nhận
  const [receiverType, setReceiverType] = useState("admin"); // admin/trainer/student
  const [trainers, setTrainers] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const { auth } = useAuth();

  // Lấy danh sách trainer cho user
  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/user/trainers`, {
        headers: { Authorization: auth?.token }
      });
      setTrainers(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch trainers");
    } finally {
      setLoading(false);
    }
  };

  // Lấy danh sách học viên cho trainer
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/user/trainer/${auth?.user?._id}/clients/workouts`, {
        headers: { Authorization: auth?.token }
      });
      setStudents(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!auth?.user) return;
    if (auth.user.role === 2) {
      // Trainer
      fetchStudents();
    } else {
      // User
      fetchTrainers();
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.user) {
      return alert('Please log in to submit feedback.');
    }

    console.log(receiverType);

    try {
      await axios.post(`${BASE_URL}/api/v1/feedback/create-feedback`, {
        message,
        rating,
        receiver: receiverType === "admin" ? "" : receiver // Nếu admin thì backend sẽ tự lấy admin
      });
      setFeedbackSubmitted(true);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        console.error(err);
        setError('Error submitting feedback. Please try again.');
      }
    }
  };

  if (feedbackSubmitted) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="bg-white p-8 rounded-lg shadow-md text-center flex flex-col gap-5">
          <h2 className="text-2xl font-bold mb-4">Thank you for your feedback!</h2>
          <p>Your feedback has been submitted successfully.</p>
          <Link className='bg-blue-500 text-white px-4 py-2 ' to="/">Go Back</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-blue-300">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Submit Feedback</h2>
        {error && (
          <div className="mb-4 text-red-500">
            {error}
          </div>
        )}

        {/* Chọn người nhận */}
        {auth.user && auth.user.role === 2 ? (
          // Trainer: chỉ gửi cho admin hoặc học viên
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Send feedback to:</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={receiverType}
                onChange={e => setReceiverType(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="student">Student</option>
              </select>
            </div>
            {receiverType === "student" && (
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Select Student</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={receiver}
                  onChange={e => setReceiver(e.target.value)}
                  required
                >
                  <option value="">-- Select Student --</option>
                  {students.map(s => (
                    <option key={s._id} value={s._id}>{s.name} ({s.email})</option>
                  ))}
                </select>
              </div>
            )}
          </>
        ) : (
          // User: gửi cho admin hoặc trainer
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Send feedback to:</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={receiverType}
                onChange={e => setReceiverType(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="trainer">Trainer</option>
              </select>
            </div>
            {receiverType === "trainer" && (
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Select Trainer</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={receiver}
                  onChange={e => setReceiver(e.target.value)}
                  required
                >
                  <option value="">-- Select Trainer --</option>
                  {trainers.map(t => (
                    <option key={t._id} value={t._id}>{t.name} ({t.email})</option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}

        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
          <textarea
            id="message"
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">Rating</label>
          <select
            id="rating"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Feedback;
