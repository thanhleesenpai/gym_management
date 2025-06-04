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

    // Danh sách bài tập theo thứ trong tuần
    workoutSchedule: {
        Monday: [{
            exerciseId: String,
            name: String,
            sets: Number,
            reps: Number,
            duration: String
        }],
        Tuesday: [{
            exerciseId: String,
            name: String,
            sets: Number,
            reps: Number,
            duration: String
        }],
        Wednesday: [{
            exerciseId: String,
            name: String,
            sets: Number,
            reps: Number,
            duration: String
        }],
        Thursday: [{
            exerciseId: String,
            name: String,
            sets: Number,
            reps: Number,
            duration: String
        }],
        Friday: [{
            exerciseId: String,
            name: String,
            sets: Number,
            reps: Number,
            duration: String
        }],
        Saturday: [{
            exerciseId: String,
            name: String,
            sets: Number,
            reps: Number,
            duration: String
        }],
        Sunday: [{
            exerciseId: String,
            name: String,
            sets: Number,
            reps: Number,
            duration: String
        }]
    },

    imgUrl: {
        type: String,
        default: "https://hoseiki.vn/wp-content/uploads/2025/03/avatar-mac-dinh-5.jpg"
    }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// export default User;
export { User };

