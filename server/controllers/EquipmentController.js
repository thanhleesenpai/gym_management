import Equipment from "../models/Equipment.js";

export const addEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.create(req.body);
    res.status(201).json({ success: true, message: "Equipment added successfully", equipment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding equipment", error });
  }
};

export const updateEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, message: "Equipment updated successfully", equipment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating equipment", error });
  }
};

export const deleteEquipment = async (req, res) => {
  try {
    await Equipment.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Equipment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting equipment", error });
  }
};

export const getEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.status(200).json({ success: true, equipment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching equipment", error });
  }
};
