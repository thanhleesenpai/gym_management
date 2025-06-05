import { User } from "../models/User.js";

// Lấy tất cả người dùng
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("name email role _id");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
}

// Lấy ngươi dùng theo ID
export const getUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
}