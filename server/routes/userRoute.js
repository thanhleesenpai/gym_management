import express from "express";
import { isAdmin, requireSignIn, isTrainer } from "../Middlewares/authMiddleware.js";
import {
    assignTrainer,
    getTrainer,
    getClientsWorkouts,

} from "../controllers/trainerController.js";

import {
    addWorkout,
    getAllWorkouts,
    getWorkoutByDate,
    deleteWorkoutByDate,
    updateWorkoutByDate

} from "../controllers/workoutController.js";

const router = express.Router();

// Trainer
router.post("/:userId/trainer", requireSignIn, assignTrainer);
router.get("/:userId/trainer", requireSignIn, getTrainer);

// Workout Schedule
router.post("/:userId/workout", requireSignIn, isTrainer, addWorkout);
router.get("/:userId/workout", requireSignIn, getAllWorkouts);
router.get("/:userId/workout/:date", requireSignIn, getWorkoutByDate);

router.put("/:userId/workout/:date", requireSignIn, isTrainer, updateWorkoutByDate);
router.delete("/:userId/workout/:date", requireSignIn, isTrainer, deleteWorkoutByDate);
router.get("/trainer/:trainerId/clients/workouts", requireSignIn, isTrainer, getClientsWorkouts);

export default router;