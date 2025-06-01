import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/fetchData';
import { Heading, Loader } from '../../components';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/auth';

const TrainerClients = () => {
    const { auth } = useAuth();
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);

    const getClientsWorkouts = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${BASE_URL}/api/v1/user/trainer/${auth?.user?._id}/clients/workouts`,
                {
                    headers: {
                        Authorization: auth?.token,
                    },
                }
            );
            if (res.data?.success) {
                setClients(res.data.clients); // dữ liệu backend phải là { clients: [...] }
            }
        } catch (err) {
            toast.error("Failed to fetch client workouts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (auth?.user?._id) getClientsWorkouts();
    }, [auth]);

    if (loading) return <Loader />;

    return (
        <section className='pt-10 bg-gray-900'>
            <Heading name="My Clients & Their Workouts" />
            <div className='container mx-auto px-6 py-10 space-y-5'>
                {clients.length === 0 ? (
                    <p className='text-center text-lg text-white'>You currently have no clients.</p>
                ) : (
                    clients.map((client, idx) => (
                        <div key={idx} className='p-5 border border-white rounded'>
                            <h2 className='text-xl font-bold'>{client.name}</h2>
                            <p>Email: {client.email}</p>
                            <p>Contact: {client.contact}</p>
                            <div className='mt-3'>
                                <h3 className='text-lg underline'>Workouts:</h3>
                                {client.workouts && client.workouts.length > 0 ? (
                                    <ul className='list-disc ml-5'>
                                        {client.workouts.map((w, i) => (
                                            <li key={i}>
                                                <strong>{w.name}</strong> - {w.day} - {w.sets} sets x {w.reps} reps
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No workouts assigned.</p>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default TrainerClients;