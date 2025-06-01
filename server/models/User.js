import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: true,
    },

    contact: {
        type: String,
        required: true
    },

    role: {
        type: Number,
        default: 1
    },

    // ID người huấn luyện viên (ref đến collection khác nếu có)
    trainerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Giả sử huấn luyện viên cũng là user, nếu khác thì sửa tên collection phù hợp
        default: null
    },

    // Danh sách bài tập theo ngày
    workoutSchedule: [
        {
            date: {
                type: Date,
                required: true
            },
            exercises: [
                {
                    name: String,
                    reps: Number,
                    sets: Number,
                    duration: String
                }
            ]
        }
    ]

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// export default User;
export { User };

