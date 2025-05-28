import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth'; 
import { useParams } from 'react-router-dom';
import { Heading, Loader } from '../../components';
import { BASE_URL } from '../../utils/fetchData';

const Feedbacks = () => {
  const { auth } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [editedMessage, setEditedMessage] = useState('');
  const [editedRating, setEditedRating] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllUserFeedbacks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/v1/auth/get-all-user-feedback`);

        if (res.data && res.data.success) {
          setFeedbacks(res.data.newFeedback);
          console.log(res.data.newFeedback);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Something went wrong in getting all feedback");
        setLoading(false);
      }
    };
    getAllUserFeedbacks();
  }, []);

  const handleEditFeedback = (feedback) => {
    setEditingFeedback(feedback);
    setEditedMessage(feedback.message);
    setEditedRating(feedback.rating);
  };

  const handleUpdateFeedback = async (feedbackId) => {
    try {
   
      const response = await axios.put(`${BASE_URL}/api/v1/feedback/update-feedback/${feedbackId}`, {
        message: editedMessage,
        rating: editedRating,
      });
      setEditingFeedback(null);
      updateFeedbackList(response.data.updatedFeedback);
    } catch (err) {
      console.error('Error updating feedback:', err);
      setError('Error updating feedback. Please try again.');
    }
  };


  const handleDeleteFeedback = async (feedbackId) => {
    try {
      await axios.delete(`${BASE_URL}/api/v1/feedback/delete-feedback/${feedbackId}`);
      setFeedbacks(prevFeedbacks => prevFeedbacks.filter(f => f._id !== feedbackId));
    } catch (err) {
      console.error('Error deleting feedback:', err);
      setError('Error deleting feedback. Please try again.');
    }
  };


  const updateFeedbackList = (updatedFeedback) => {
    setFeedbacks(prevFeedbacks =>
      prevFeedbacks.map(f => (f._id === updatedFeedback._id ? updatedFeedback : f))
    );
  };


  if (!auth.user) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Please log in to view your feedback.
      </div>
    );
  }

  if (loading) {
    return (
      <Loader />
    );
  }



  return (
    <section className='bg-gray-900'>

    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* <h2 className="text-3xl font-bold mb-4 text-white">Your Feedback</h2> */}
      <Heading name="Your Feedback" />
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {feedbacks.length === 0 ? (
        <div className='flex justify-center items-center h-screen'>
          <p className="text-white text-center text-4xl">No feedback submitted yet.</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-700 border-2 px-6 my-20 ">
          {feedbacks.map(feedback => (
            <li key={feedback._id} className="py-4">
              {editingFeedback && editingFeedback._id === feedback._id ? (
                <div className="space-y-4">
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-800 text-white"
                    rows="4"
                    value={editedMessage}
                    onChange={(e) => setEditedMessage(e.target.value)}
                    required
                  />
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-800 text-white"
                    value={editedRating}
                    onChange={(e) => setEditedRating(e.target.value)}
                    required
                  >
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => handleUpdateFeedback(feedback._id)}
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setEditingFeedback(null)}
                      className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-white text-xl md:text-2xl">Name : <b>{feedback.user.name}</b> </p>
                  <p className="text-white text-xl md:text-2xl">Message : {feedback.message}</p>
                  <p className="text-white text-xl md:text-2xl">Rating : <b> {feedback.rating}</b></p>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => handleEditFeedback(feedback)}
                      className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteFeedback(feedback._id)}
                      className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
    </section>

  );
};

export default Feedbacks;





