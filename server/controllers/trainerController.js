import { User } from "../models/User.js";

// Lấy tất cả trainer
export const getAllTrainers = async (req, res) => {
    try {
        const trainers = await User.find({ role: 2 }).select("name email _id");
        console.log(trainers);
        res.json(trainers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching trainers", error });
    }
};

// Gán trainer
export const assignTrainer = async (req, res) => {
    const { userId } = req.params;
    const { trainerId } = req.body;

    try {
        // Check if trainer exists and is actually a trainer (role 2)
        const trainer = await User.findOne({ _id: trainerId, role: 2 });
        if (!trainer) {
            return res.status(404).json({ message: "Trainer not found" });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { trainerId },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            message: "Trainer assigned successfully",
            user
        });
    } catch (error) {
        console.error("Error in assignTrainer:", error);
        res.status(500).json({
            message: "Error assigning trainer",
            error: error.message
        });
    }
};

// Lấy trainer
export const getTrainer = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate("trainerId", "name email");
        res.json({ trainer: user.trainerId });
    } catch (error) {
        res.status(500).json({ message: "Error fetching trainer", error });
    }
};

// Lấy lịch tập của tất cả khách hàng của huấn luyện viên
export const getClientsWorkouts = async (req, res) => {
    const { trainerId } = req.params;

    try {
        const clients = await User.find({ trainerId })
            .select('_id name email contact city workoutSchedule');

        if (!clients || clients.length === 0) {
            return res.status(200).json([]);
        }

        const formattedClients = clients.map(client => ({
            _id: client._id,
            name: client.name,
            email: client.email,
            contact: client.contact,
            city: client.city,
            workoutSchedule: client.workoutSchedule // Thêm dòng này nếu muốn trả về lịch tập
        }));

        res.status(200).json(formattedClients);

    } catch (error) {
        console.error("Error fetching client workouts:", error);
        res.status(500).json({ message: "Error fetching client workouts" });
    }
};