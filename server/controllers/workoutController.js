import { User } from "../models/User.js";
import mongoose from "mongoose";

// Add workout for specific day
export const addWorkout = async (req, res) => {
    const { userId } = req.params;
    const { name, sets, reps, duration, day } = req.body;
    console.log("Request body:", req.body);
    console.log("User ID:", userId);

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate day
        const validDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        if (!validDays.includes(day)) {
            return res.status(400).json({ message: "Invalid day value" });
        }

        // Initialize workoutSchedule if it doesn't exist
        if (!user.workoutSchedule) {
            user.workoutSchedule = {
                Monday: [], Tuesday: [], Wednesday: [],
                Thursday: [], Friday: [], Saturday: [], Sunday: []
            };
        }

        // Initialize the day array if it doesn't exist
        if (!user.workoutSchedule[day]) {
            user.workoutSchedule[day] = [];
        }

        // Validate required fields
        if (!name || sets === undefined || reps === undefined) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Create new workout object with exerciseId
        const newWorkout = {
            exerciseId: new mongoose.Types.ObjectId().toString(),
            name,
            sets: Number(sets),
            reps: Number(reps),
            duration: duration || ""
        };

        user.workoutSchedule[day].push(newWorkout);

        await user.save();

        res.json({
            success: true,
            message: "Workout added successfully",
            workouts: user.workoutSchedule[day]
        });
    } catch (error) {
        console.error("Error in addWorkout:", error);
        res.status(500).json({
            message: "Error saving workout",
            error: error.message,
            stack: error.stack
        });
    }
};

// Get all workouts for a user
export const getAllWorkouts = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user.workoutSchedule);
    } catch (error) {
        res.status(500).json({ message: "Error fetching workouts", error });
    }
};

// Get workouts for specific day
export const getWorkoutsByDay = async (req, res) => {
    const { userId, day } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user.workoutSchedule[day] || []);
    } catch (error) {
        res.status(500).json({ message: "Error fetching workouts", error });
    }
};

// Update workout by ID for a specific day
export const updateWorkout = async (req, res) => {
    const { userId, day, workoutId } = req.params;
    const { name, sets, reps, duration } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const workoutIndex = user.workoutSchedule[day]?.findIndex(
            w => w.exerciseId === workoutId
        );

        if (workoutIndex === -1) {
            return res.status(404).json({ message: "Workout not found" });
        }

        user.workoutSchedule[day][workoutIndex] = {
            ...user.workoutSchedule[day][workoutIndex],
            name,
            sets,
            reps,
            duration
        };

        await user.save();
        res.json({
            success: true,
            message: "Workout updated",
            workout: user.workoutSchedule[day][workoutIndex]
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating workout", error });
    }
};

// Delete workout by ID for a specific day
export const deleteWorkout = async (req, res) => {
    const { userId, day, workoutId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.workoutSchedule[day]) {
            return res.status(404).json({ message: "No workouts found for this day" });
        }

        user.workoutSchedule[day] = user.workoutSchedule[day].filter(
            w => w.exerciseId !== workoutId
        );

        await user.save();
        res.json({
            success: true,
            message: "Workout deleted",
            workouts: user.workoutSchedule[day]
        });
    } catch (error) {
        res.status(500).json({ message: "Error deleting workout", error });
    }
};