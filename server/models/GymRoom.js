import mongoose from "mongoose";

const gymRoomSchema = new mongoose.Schema({
  roomCode: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["gym", "yoga", "fitness", "other"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  operationalStatus: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const GymRoom = mongoose.model("GymRoom", gymRoomSchema);

export default GymRoom;
