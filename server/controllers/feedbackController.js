import Feedback from '../models/Feedback.js';
import { User } from '../models/User.js';

const getAllFeedbacks = async (req, res) => {
  try {
    // Lấy cả thông tin người gửi và người nhận
    const feedbacks = await Feedback.find()
      .populate('user', 'name email')
      .populate('receiver', 'name email role');
    return res.status(200).json({
      success: true,
      message: "All feedbacks accessed successfully",
      feedbacks
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', success: false });
  }
};




const createFeedback = async (req, res) => {
  try {
    const userId = req.user._id;
    const { message, rating, receiver } = req.body;

    // Nếu không có receiver, mặc định là admin
    let receiverId = receiver;
    if (!receiverId) {
      const admin = await User.findOne({ role: 3 });
      receiverId = admin ? admin._id : null;
    }

    // Cho phép gửi nhiều feedback, không kiểm tra trùng user như cũ

    const newFeedback = new Feedback({
      user: userId,
      receiver: receiverId,
      message,
      rating,
    });

    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', success: false });
  }
};



const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.user._id).populate('user');

    if (!feedback) {
      return res.json({ message: 'Feedback not found', success: false });
    }
    return res.status(200).json({
      success: true,
      message: "feedback accessed successfully",
      feedback
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', success: false });
  }
};

const updateFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, rating } = req.body;
    // Cập nhật feedback
    let updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { message, rating },
      { new: true }
    );
    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback not found', success: false });
    }
    // Populate lại user và receiver
    updatedFeedback = await Feedback.findById(updatedFeedback._id)
      .populate('user', 'name email')
      .populate('receiver', 'name email role');

    return res.status(200).json({
      success: true,
      message: "feedback updated successfully",
      updatedFeedback
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', success: false });
  }
};

const deleteFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFeedback = await Feedback.findByIdAndDelete(id);

    if (!deletedFeedback) {
      return res.status(404).json({ message: 'Feedback not found', success: false });
    }

    return res.status(200).json({ message: 'Feedback deleted successfully', success: true, });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


const feedbackCountController = async (req, res) => {
  try {
    const total = await Feedback.find({}).estimatedDocumentCount();
    return res.status(200).json({
      success: true,
      total
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false, error, message: "Error in total Feedback Count",
    })
  }
}

// Lấy tất cả feedback gửi tới user hiện tại (dùng cho cả admin, trainer, user)
const getFeedbacksForUser = async (req, res) => {
  try {
    const userId = req.user._id;
    // Lấy feedback có receiver là user hiện tại
    const feedbacks = await Feedback.find({ receiver: userId })
      .populate('user', 'name email')
      .populate('receiver', 'name email role');
    return res.status(200).json({
      success: true,
      message: "Feedbacks for user accessed successfully",
      feedbacks
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', success: false });
  }
};

export {
  getAllFeedbacks,
  createFeedback,
  deleteFeedbackById,
  updateFeedbackById,
  getFeedbackById,
  feedbackCountController,
  getFeedbacksForUser // export hàm mới
};