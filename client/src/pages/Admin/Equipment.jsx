import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heading, Loader } from '../../components';
import { BASE_URL } from '../../utils/fetchData';
import toast from 'react-hot-toast';

const Equipment = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    equipmentCode: '',
    name: '',
    image: '',
    quantity: '',
    acquisitionDate: '',
    warranty: '',
    origin: '',
    usageStatus: true,
  });

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/equipment/all`);
      if (res.data && res.data.success) {
        setEquipmentList(res.data.equipment);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch equipment");
      setLoading(false);
    }
  };

  const handleAddEquipment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/equipment/add`, formData);
      if (res.data && res.data.success) {
        toast.success("Equipment added successfully");
        fetchEquipment();
        setFormData({
          equipmentCode: '',
          name: '',
          image: '',
          quantity: '',
          acquisitionDate: '',
          warranty: '',
          origin: '',
          usageStatus: true,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add equipment");
    }
  };

  const handleDeleteEquipment = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/v1/equipment/delete/${id}`);
      if (res.data && res.data.success) {
        toast.success("Equipment deleted successfully");
        fetchEquipment();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete equipment");
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="pt-10 bg-gray-900">
      <Heading name="Equipment Management" />
      <div className="container mx-auto px-6 py-10">
        <form className="mb-10" onSubmit={handleAddEquipment}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Equipment Code"
              value={formData.equipmentCode}
              onChange={(e) => setFormData({ ...formData, equipmentCode: e.target.value })}
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
            <input
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 rounded-md"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full px-4 py-2 rounded-md"
              required
            />
            <input
              type="date"
              placeholder="Acquisition Date"
              value={formData.acquisitionDate}
              onChange={(e) => setFormData({ ...formData, acquisitionDate: e.target.value })}
              className="w-full px-4 py-2 rounded-md"
              required
            />
            <input
              type="text"
              placeholder="Warranty"
              value={formData.warranty}
              onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
              className="w-full px-4 py-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Origin"
              value={formData.origin}
              onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              className="w-full px-4 py-2 rounded-md"
            />
            <select
              value={formData.usageStatus}
              onChange={(e) => setFormData({ ...formData, usageStatus: e.target.value === 'true' })}
              className="w-full px-4 py-2 rounded-md"
            >
              <option value="true">In Use</option>
              <option value="false">Not In Use</option>
            </select>
          </div>
          <button type="submit" className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-md">
            Add Equipment
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {equipmentList.map((equipment) => (
            <div key={equipment._id} className="p-5 bg-white rounded-md shadow-md">
              <h3 className="text-xl font-bold">{equipment.name}</h3>
              <img src={equipment.image} alt={equipment.name} className="w-full h-40 object-cover rounded-md mb-3" />
              <p>Equipment Code: {equipment.equipmentCode}</p>
              <p>Quantity: {equipment.quantity}</p>
              <p>Origin: {equipment.origin}</p>
              <p>Status: {equipment.usageStatus ? 'In Use' : 'Not In Use'}</p>
              <button
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md"
                onClick={() => handleDeleteEquipment(equipment._id)}
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

export default Equipment;
