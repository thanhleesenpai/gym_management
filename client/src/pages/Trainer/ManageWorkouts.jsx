import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/fetchData';
import { Heading, Loader } from '../../components';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/auth';

const ManageWorkouts = () => {
    const { auth } = useAuth();
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [workouts, setWorkouts] = useState({});
    const [loading, setLoading] = useState(false);
    const [newWorkout, setNewWorkout] = useState({
        name: '',
        sets: '',
        reps: '',
        duration: '',
        day: 'Monday'
    });

    // Fetch clients
    const getClients = async () => {
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
            if (Array.isArray(res.data)) {
                setClients(res.data);
            }
        } catch (err) {
            console.error("Error:", err);
            toast.error("Failed to fetch clients");
        } finally {
            setLoading(false);
        }
    };

    // Fetch client's workouts
    const getWorkouts = async (clientId) => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${BASE_URL}/api/v1/user/${clientId}/workouts`,
                {
                    headers: {
                        Authorization: auth?.token,
                    },
                }
            );
            console.log("Client ID:", clientId); // Debug log
            console.log("Workouts:", res.data);
            setWorkouts(res.data || {});
        } catch (err) {
            toast.error("Failed to fetch workouts");
        } finally {
            setLoading(false);
        }
    };

    // Add new workout
    const handleAddWorkout = async (e) => {
        e.preventDefault();
        if (!selectedClient) {
            toast.error("Please select a client first");
            return;
        }
        console.log("Adding workout:", newWorkout);

        try {
            const res = await axios.post(
                `${BASE_URL}/api/v1/user/${selectedClient._id}/workout`,
                newWorkout,
                {
                    headers: {
                        Authorization: auth?.token,
                    },
                }
            );
            if (res.data.success) {
                toast.success("Workout added successfully");
                getWorkouts(selectedClient._id);
                setNewWorkout({ name: '', sets: '', reps: '', day: 'Monday' });
            }
        } catch (err) {
            toast.error("Failed to add workout");
        }
    };

    // Delete workout
    const handleDeleteWorkout = async (day, workoutId) => {
        try {
            await axios.delete(
                `${BASE_URL}/api/v1/user/${selectedClient._id}/workouts/${day}/${workoutId}`,
                {
                    headers: {
                        Authorization: auth?.token,
                    },
                }
            );
            toast.success("Workout deleted successfully");
            getWorkouts(selectedClient._id);
        } catch (err) {
            toast.error("Failed to delete workout");
        }
    };

    useEffect(() => {
        getClients();
    }, []);

    useEffect(() => {
        if (selectedClient) {
            getWorkouts(selectedClient._id);
        }
    }, [selectedClient]);

    if (loading) return <Loader />;

    return (
        <section className='pt-10 bg-blue-300 min-h-screen'>
            <Heading name="Manage Workouts" />
            <div className="container mx-auto px-6 py-10">
                {/* Client Selection */}
                <div className="mb-8">
                    <select
                        className="w-full p-2 rounded bg-gray-800 text-white"
                        value={selectedClient?._id || ""}
                        onChange={(e) => {
                            const selectedId = e.target.value;
                            const client = clients.find(c => c._id === selectedId);
                            setSelectedClient(client || null);
                        }}
                    >
                        <option value="">Select a client</option>
                        {clients.map(client => (
                            <option key={client._id} value={client._id}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedClient && (
                    <>
                        {/* Add New Workout Form */}
                        <form onSubmit={handleAddWorkout} className="mb-8 bg-gray-800 p-4 rounded">
                            <h3 className="text-white text-xl mb-4">Add New Workout</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <input
                                    type="text"
                                    placeholder="Exercise name"
                                    value={newWorkout.name}
                                    onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                                    className="p-2 rounded"
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Sets"
                                    value={newWorkout.sets}
                                    onChange={(e) => setNewWorkout({ ...newWorkout, sets: e.target.value })}
                                    className="p-2 rounded"
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Reps"
                                    value={newWorkout.reps}
                                    onChange={(e) => setNewWorkout({ ...newWorkout, reps: e.target.value })}
                                    className="p-2 rounded"
                                    required
                                />
                                <select
                                    value={newWorkout.day}
                                    onChange={(e) => setNewWorkout({ ...newWorkout, day: e.target.value })}
                                    className="p-2 rounded"
                                    required
                                >
                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                                Add Workout
                            </button>
                        </form>

                        {/* Current Workouts */}
                        <div className="bg-gray-800 p-4 rounded">
                            <h3 className="text-white text-xl mb-4">Current Workouts</h3>
                            {Object.entries(workouts).map(([day, dayWorkouts]) => (
                                <div key={day} className="mb-6">
                                    <h4 className="text-white text-lg mb-3">{day}</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {dayWorkouts.map((workout) => (
                                            <div key={workout.exerciseId} className="bg-gray-700 p-4 rounded">
                                                <h4 className="text-white font-bold">{workout.name}</h4>
                                                <p className="text-gray-300">Sets: {workout.sets}</p>
                                                <p className="text-gray-300">Reps: {workout.reps}</p>
                                                <button
                                                    onClick={() => handleDeleteWorkout(day, workout.exerciseId)}
                                                    className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default ManageWorkouts;
