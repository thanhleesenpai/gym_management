import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heading } from '../../components';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TrainerDashBoard = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <section className='pt-10 bg-white'>
            <div className="flex justify-center mt-4">
        <div className="text-blue-600 text-5xl font-semibold border-b-4 border-blue-600 pb-2">
            Trainer DashBoard
       </div>
      </div>
            <div className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
                    <Link
                        className='bg-blue-600 p-5 border border-white hover:bg-green-600 transition-all'
                        to="/dashboard/trainer/clients"
                        data-aos="fade-up"
                    >
                        <h2 className='text-white font-bold text-2xl'>My Clients</h2>
                    </Link>

                    <Link
                        className='bg-blue-600 p-5 border border-white hover:bg-green-600 transition-all'
                        to="/dashboard/trainer/workouts"
                        data-aos="fade-up"
                    >
                        <h2 className='text-white font-bold text-2xl'>Manage Workouts</h2>
                    </Link>

                    <Link
                        className='bg-blue-600 p-5 border border-white hover:bg-green-600 transition-all'
                        to="/dashboard/trainer/profile"
                        data-aos="fade-up"
                    >
                        <h2 className='text-white font-bold text-2xl'>Profile</h2>
                    </Link>

                    <Link
                        className='bg-blue-600 p-5 border border-white hover:bg-green-600 transition-all'
                        to="/dashboard/trainer/feedbacks"
                        data-aos="fade-up"
                    >
                        <h2 className='text-white font-bold text-2xl'>My Feedbacks</h2>
                    </Link>

                    <Link
                        className='bg-blue-600 p-5 border border-white hover:bg-green-600 transition-all'
                        to="/dashboard/trainer/received-feedbacks"
                        data-aos="fade-up"
                    >
                        <h2 className='text-white font-bold text-2xl'>Received Feedbacks</h2>
                    </Link>


                </div>
            </div>
        </section>
    );
};

export default TrainerDashBoard;
