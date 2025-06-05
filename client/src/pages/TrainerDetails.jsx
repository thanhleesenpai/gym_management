import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/fetchData';
import { userImg } from '../images';
import { trainerImg1 } from '../images';

const TrainerDetails = () => {
    const { trainerId } = useParams();
    const [trainer, setTrainer] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        const fetchTrainer = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${BASE_URL}/api/v1/user/users/${trainerId}`, {
                    headers: { Authorization: localStorage.getItem("token") }
                });
                setTrainer(res.data);
                setLoading(false);
            } catch (err) {
                setTrainer(null);
                setLoading(false);
            }
        };
        if (trainerId) fetchTrainer();
    }, [trainerId]);

    if (loading) {
        return (
            <section className='py-20 bg-gray-800'>
                <h2 className='text-center text-4xl text-white font-bold mb-8 animate-fade-in'>Trainer Detail</h2>
                <div className="flex justify-center items-center h-40">
                    <span className="text-white text-xl">Loading...</span>
                </div>
            </section>
        );
    }

    if (!trainer) {
        return (
            <section className='py-20 bg-gray-800'>
                <h2 className='text-center text-4xl text-white font-bold mb-8 animate-fade-in'>Trainer Detail</h2>
                <div className="flex justify-center items-center h-40">
                    <span className="text-white text-xl">Trainer not found.</span>
                </div>
                <Link to="/" className='text-white text-lg mx-auto flex justify-center items-center text-center bg-blue-500 hover:bg-blue-600 transition-colors duration-300 max-w-[150px] w-full px-4 py-2 rounded-md'>
                    Go Back
                </Link>
            </section>
        );
    }

    return (
        <section className='py-20 bg-gray-800'>
            <h2 className='text-center text-4xl text-white font-bold mb-8 animate-fade-in'>Trainer Detail</h2>
            <div className="container mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex justify-center items-center">
                        <img
                            src={trainer.imgUrl || trainerImg1}
                            alt={trainer.name}
                            className='w-full max-w-[80%] rounded-lg shadow-lg transition-transform transform hover:scale-105'
                        />
                    </div>
                    <div className='flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg'>
                        <p className='text-2xl text-gray-800 font-semibold'>Name: {trainer.name}</p>
                        <p className='text-lg text-gray-600'>Email: {trainer.email}</p>
                        <p className='text-lg text-gray-600'>Contact: {trainer.contact || "N/A"}</p>
                        <p className='text-lg text-gray-600'>City: {trainer.city || "N/A"}</p>
                        <p className='text-lg text-gray-600'>Role: {trainer.role === 2 ? "Trainer" : trainer.role === 1 ? "Admin" : "User"}</p>
                        {/* Thêm các trường khác nếu cần */}
                    </div>
                </div>
            </div>
            <Link to="/" className='text-white text-lg mx-auto flex justify-center items-center text-center bg-blue-500 hover:bg-blue-600 transition-colors duration-300 max-w-[150px] w-full px-4 py-2 rounded-md'>
                Go Back
            </Link>
        </section>
    );
};

export default TrainerDetails;
