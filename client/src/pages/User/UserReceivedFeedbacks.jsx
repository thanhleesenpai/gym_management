import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { Heading, Loader } from '../../components';
import { BASE_URL } from '../../utils/fetchData';

const UserReceivedFeedbacks = () => {
    const { auth } = useAuth();
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getReceivedFeedbacks = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${BASE_URL}/api/v1/feedback/received-feedbacks`, {
                    headers: { Authorization: auth?.token }
                });
                if (res.data && res.data.success) {
                    setFeedbacks(res.data.feedbacks);
                }
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        if (auth?.user) getReceivedFeedbacks();
    }, [auth]);

    if (!auth.user) {
        return (
            <div className="flex justify-center items-center h-screen text-white">
                Please log in to view your feedback.
            </div>
        );
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <section className='bg-gray-900'>
            <div className="max-w-4xl mx-auto py-8 px-4">
                <Heading name="Feedbacks For You" />
                {feedbacks.length === 0 ? (
                    <div className='flex justify-center items-center h-screen'>
                        <p className="text-white text-center text-4xl">No feedback received yet.</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-700 border-2 px-6 my-20 ">
                        {feedbacks.map(feedback => (
                            <li key={feedback._id} className="py-4">
                                <div className="space-y-4">
                                    <p className="text-white text-xl md:text-2xl">
                                        Sender : <b>{feedback.user && feedback.user.name ? feedback.user.name : feedback.user}</b>
                                    </p>
                                    <p className="text-white text-xl md:text-2xl">Message : {feedback.message}</p>
                                    <p className="text-white text-xl md:text-2xl">Rating : <b> {feedback.rating}</b></p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
};

export default UserReceivedFeedbacks;
