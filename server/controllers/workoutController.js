import { User } from "../models/User.js";

// Thêm lịch tập cho 1 ngày
export const addWorkout = async (req, res) => {
    const { userId } = req.params;
    const { date, exercises } = req.body;

    try {
        const user = await User.findById(userId);

        // Nếu đã có ngày đó, ghi đè
        const existing = user.workoutSchedule.find(w => w.date === date);
        if (existing) {
            existing.exercises = exercises;
        } else {
            user.workoutSchedule.push({ date, exercises });
        }

        await user.save();
        res.json({ message: "Workout added/updated", schedule: user.workoutSchedule });
    } catch (error) {
        res.status(500).json({ message: "Error saving workout", error });
    }
};

// Lấy toàn bộ lịch tập
export const getAllWorkouts = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        res.json(user.workoutSchedule);
    } catch (error) {
        res.status(500).json({ message: "Error fetching workouts", error });
    }
};

// Lấy lịch tập theo ngày
export const getWorkoutByDate = async (req, res) => {
    const { userId, date } = req.params;

    try {
        const user = await User.findById(userId);
        const schedule = user.workoutSchedule.find(w => w.date === date);
        res.json(schedule || {});
    } catch (error) {
        res.status(500).json({ message: "Error fetching workout by date", error });
    }
};

// Câp nhật lịch tập theo ngày
export const updateWorkoutByDate = async (req, res) => {
    const { userId, date } = req.params;
    const { exercises } = req.body;

    try {
        const user = await User.findById(userId);
        const schedule = user.workoutSchedule.find(w => w.date === date);

        if (!schedule) {
            return res.status(404).json({ message: "Workout for this date not found" });
        }

        schedule.exercises = exercises;
        await user.save();

        res.json({ message: "Workout updated", schedule });
    } catch (error) {
        res.status(500).json({ message: "Error updating workout", error });
    }
};

// Xóa lịch tập theo ngày
export const deleteWorkoutByDate = async (req, res) => {
    const { userId, date } = req.params;

    try {
        const user = await User.findById(userId);

        user.workoutSchedule = user.workoutSchedule.filter(w => w.date !== date);
        await user.save();

        res.json({ message: "Workout deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting workout", error });
    }
};