import express from "express";
import { addEquipment, updateEquipment, deleteEquipment, getEquipment } from "../controllers/EquipmentController.js";

const router = express.Router();

router.post("/add", addEquipment);
router.put("/update/:id", updateEquipment);
router.delete("/delete/:id", deleteEquipment);
router.get("/all", getEquipment);

export default router;
