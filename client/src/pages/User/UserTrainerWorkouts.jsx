import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/fetchData';
import { Heading, Loader } from '../../components';
import { useAuth } from '../../context/auth';
import { toast } from 'react-hot-toast';

const UserTrainerWorkouts = () => {
    const { auth } = useAuth();
    const [loading, setLoading] = useState(false);
    const [workouts, setWorkouts] = useState({});

    const fetchWorkouts = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${BASE_URL}/api/v1/user/${auth.user._id}/workouts`,
                {
                    headers: {
                        Authorization: auth.token,
                    },
                }
            );
            console.log("userID:", auth.user._id); // Debug log
            console.log("Fetched workouts:", res.data); // Debug log
            setWorkouts(res.data || {});
        } catch (err) {
            toast.error("Failed to fetch workouts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (auth?.user?._id) fetchWorkouts();
    }, [auth]);

    if (loading) return <Loader />;

    return (
        <section className='pt-10 bg-blue-300 min-h-screen'>
            <Heading name="My Trainer Workouts" />
            <div className="container mx-auto px-6 py-10">
                {Object.keys(workouts).length === 0 ? (
                    <p className='text-center text-lg text-white'>No workouts assigned by your trainer.</p>
                ) : (
                    Object.entries(workouts).map(([day, dayWorkouts]) => (
                        <div key={day} className="mb-6">
                            <h4 className="text-white text-lg mb-3">{day}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {dayWorkouts.map((workout) => (
                                    <div key={workout.exerciseId} className="bg-gray-700 p-4 rounded">
                                        <h4 className="text-white font-bold">{workout.name}</h4>
                                        <p className="text-gray-300">Sets: {workout.sets}</p>
                                        <p className="text-gray-300">Reps: {workout.reps}</p>
                                        {workout.duration && (
                                            <p className="text-gray-300">Duration: {workout.duration}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default UserTrainerWorkouts;
