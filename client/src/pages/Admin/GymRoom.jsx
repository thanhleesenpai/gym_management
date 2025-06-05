import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heading, Loader } from '../../components';
import { BASE_URL } from '../../utils/fetchData';
import toast from 'react-hot-toast';

const GymRoom = () => {
  const [gymRooms, setGymRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    roomCode: '',
    name: '',
    type: '',
    quantity: '',
    operationalStatus: true,
  });

  const fetchGymRooms = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/gym-room/all`);
      if (res.data && res.data.success) {
        setGymRooms(res.data.gymRooms);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch gym rooms");
      setLoading(false);
    }
  };

  const handleAddGymRoom = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/gym-room/add`, formData);
      if (res.data && res.data.success) {
        toast.success("Gym room added successfully");
        fetchGymRooms();
        setFormData({ roomCode: '', name: '', type: '', quantity: '', operationalStatus: true });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add gym room");
    }
  };

  const handleDeleteGymRoom = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/v1/gym-room/delete/${id}`);
      if (res.data && res.data.success) {
        toast.success("Gym room deleted successfully");
        fetchGymRooms();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete gym room");
    }
  };

  useEffect(() => {
    fetchGymRooms();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="pt-10 bg-gray-900">
      <Heading name="Gym Room Management" />
      <div className="container mx-auto px-6 py-10">
        <form className="mb-10" onSubmit={handleAddGymRoom}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Room Code"
              value={formData.roomCode}
              onChange={(e) => setFormData({ ...formData, roomCode: e.target.value })}
              className="w-full px-4 py-2 rounded-md"
              required
            />
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-md"
              required
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 rounded-md"
              required
            >
              <option value="">Select Type</option>
              <option value="gym">Gym</option>
              <option value="yoga">Yoga</option>
              <option value="fitness">Fitness</option>
              <option value="other">Other</option>
            </select>
            <input
              type="number"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full px-4 py-2 rounded-md"
              required
            />
            <select
              value={formData.operationalStatus}
              onChange={(e) => setFormData({ ...formData, operationalStatus: e.target.value === 'true' })}
              className="w-full px-4 py-2 rounded-md"
            >
              <option value="true">Operational</option>
              <option value="false">Not Operational</option>
            </select>
          </div>
          <button type="submit" className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-md">
            Add Gym Room
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gymRooms.map((room) => (
            <div key={room._id} className="p-5 bg-white rounded-md shadow-md">
              <h3 className="text-xl font-bold">{room.name}</h3>
              <p>Room Code: {room.roomCode}</p>
              <p>Type: {room.type}</p>
              <p>Quantity: {room.quantity}</p>
              <p>Status: {room.operationalStatus ? 'Operational' : 'Not Operational'}</p>
              <button
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md"
                onClick={() => handleDeleteGymRoom(room._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GymRoom;
