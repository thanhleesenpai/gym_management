import express from "express";
import { addGymRoom, updateGymRoom, deleteGymRoom, getGymRooms } from "../controllers/GymRoomController.js";

const router = express.Router();

router.post("/add", addGymRoom);
router.put("/update/:id", updateGymRoom);
router.delete("/delete/:id", deleteGymRoom);
router.get("/all", getGymRooms);

export default router;
