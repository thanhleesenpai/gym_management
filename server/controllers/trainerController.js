import { User } from "../models/User.js";

// Gán trainer
export const assignTrainer = async (req, res) => {
    const { userId } = req.params;
    const { trainerId } = req.body;

    try {
        const user = await User.findByIdAndUpdate(userId, { trainerId }, { new: true });
        res.json({ message: "Trainer assigned", user });
    } catch (error) {
        res.status(500).json({ message: "Error assigning trainer", error });
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
        const clients = await User.find({ trainerId });

        const data = clients.map(client => ({
            clientId: client._id,
            name: client.name,
            email: client.email,
            schedule: client.workoutSchedule
        }));

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching client workouts", error });
    }
};