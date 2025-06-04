import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/fetchData';
import { Heading, Loader, User } from '../../components';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import { userImg } from "../../images";

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

            console.log("Raw response:", res.data); // Debug log

            // Handle direct array response
            if (Array.isArray(res.data)) {
                setClients(res.data);
            } else {
                console.log("Unexpected response format:", res.data);
                setClients([]);
            }
        } catch (err) {
            console.error("Error fetching clients:", err);
            toast.error("Failed to fetch client workouts");
            setClients([]);
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
            <Heading name="My Clients" />
            <div className="container mx-auto px-6 py-10">
                {clients.length === 0 ? (
                    <p className='text-center text-lg text-white'>You currently have no clients.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {clients.map((client, i) => (
                            <User
                                key={i}
                                userImg={userImg}
                                name={client.name}
                                email={client.email}
                                contact={client.contact || "N/A"}
                                city={client.city || "N/A"}
                                role={0}
                                i={i}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TrainerClients;