import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
  equipmentCode: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  acquisitionDate: {
    type: Date,
    required: true,
  },
  warranty: {
    type: String,
  },
  origin: {
    type: String,
  },
  usageStatus: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Equipment = mongoose.model("Equipment", equipmentSchema);

export default Equipment;
