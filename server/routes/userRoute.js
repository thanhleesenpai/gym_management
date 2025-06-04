import express from "express";
import { isAdmin, requireSignIn, isTrainer } from "../Middlewares/authMiddleware.js";
import {
    assignTrainer,
    getTrainer,
    getClientsWorkouts,
    getAllTrainers,


} from "../controllers/trainerController.js";

import {
    addWorkout,
    getAllWorkouts,
    getWorkoutsByDay,
    updateWorkout,
    deleteWorkout
} from "../controllers/workoutController.js";

import {
    getAllUsers,
    getUserById,

} from "../controllers/userController.js";

const router = express.Router();

// Lấy tất cả người dùng
router.get("/users", requireSignIn, getAllUsers);

// Lấy người dùng theo ID
router.get("/users/:userId", requireSignIn, getUserById);

// Lấy tất cả huấn luyện viên
router.get("/trainers", requireSignIn, getAllTrainers);

// Gán huấn luyện viên cho người dùng
router.post("/:userId/trainer", requireSignIn, assignTrainer);

// Lấy thông tin huấn luyện viên của người dùng
router.get("/:userId/trainer", requireSignIn, getTrainer);

// Thêm lịch tập cho người dùng
router.post("/:userId/workout", requireSignIn, isTrainer, addWorkout);

// Lấy lịch tập của người dùng
router.get("/:userId/workouts", requireSignIn, getAllWorkouts);

// Lấy lịch tập theo ngày
router.get("/:userId/workouts/:day", requireSignIn, getWorkoutsByDay);

// Cập nhật lịch tập theo ngày
router.put("/:userId/workouts/:day/:workoutId", requireSignIn, isTrainer, updateWorkout);

// Xóa lịch tập theo ngày
router.delete("/:userId/workouts/:day/:workoutId", requireSignIn, isTrainer, deleteWorkout);

// Lấy lịch tập của tất cả khách hàng của huấn luyện viên
router.get("/trainer/:trainerId/clients/workouts", requireSignIn, isTrainer, getClientsWorkouts);

export default router;