import express from 'express';
import { requireSignIn } from '../Middlewares/authMiddleware.js';
import {
  getAllFeedbacks,
  createFeedback,
  getFeedbackById,
  updateFeedbackById,
  deleteFeedbackById,
  feedbackCountController,
  getFeedbacksForUser // import hàm mới
} from "../controllers/feedbackController.js";

const router = express.Router();

// POST - Create Feedback
router.post('/create-feedback', requireSignIn, createFeedback);

// GET - Get all Feedbacks
router.get('/getall-feedback', getAllFeedbacks);

// GET - Get Feedback by ID
router.get('/getsingle-feedback/:id', requireSignIn, getFeedbackById);

// PUT - Update Feedback by ID
router.put('/update-feedback/:id', requireSignIn, updateFeedbackById);

// DELETE - Delete Feedback by ID
router.delete('/delete-feedback/:id', requireSignIn, deleteFeedbackById);

// GET - Get Feedbacks sent to current user (for user/trainer/admin)
router.get('/received-feedbacks', requireSignIn, getFeedbacksForUser);

router.get("/total-feedback", feedbackCountController);


export default router;
