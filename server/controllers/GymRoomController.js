import GymRoom from "../models/GymRoom.js";

export const addGymRoom = async (req, res) => {
  try {
    const gymRoom = await GymRoom.create(req.body);
    res.status(201).json({ success: true, message: "Gym room added successfully", gymRoom });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding gym room", error });
  }
};

export const updateGymRoom = async (req, res) => {
  try {
    const gymRoom = await GymRoom.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, message: "Gym room updated successfully", gymRoom });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating gym room", error });
  }
};

export const deleteGymRoom = async (req, res) => {
  try {
    await GymRoom.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Gym room deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting gym room", error });
  }
};

export const getGymRooms = async (req, res) => {
  try {
    const gymRooms = await GymRoom.find();
    res.status(200).json({ success: true, gymRooms });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching gym rooms", error });
  }
};
