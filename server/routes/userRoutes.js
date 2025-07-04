import express from 'express'
import {
  addUserRating,
  getUserCourseProgress,
  getUserData,
  purchaseCourse,
  updateUserCourseProgress,
  userEnrolledCourses,
} from '../controllers/userController.js'
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from '../controllers/LMSfile.js'
import { isAuthenticated } from '../middlewares/authMiddleware.js'

const userRouter = express.Router()

// Get user Data
userRouter.get('/data', getUserData)
userRouter.post('/purchase', purchaseCourse)
userRouter.get('/enrolled-courses', userEnrolledCourses)
userRouter.post('/update-course-progress', updateUserCourseProgress)
userRouter.post('/get-course-progress', getUserCourseProgress)
userRouter.post('/add-rating', addUserRating)
userRouter.post('/create-razorpay-order', isAuthenticated, createRazorpayOrder)
userRouter.post(
  '/verify-razorpay-payment',
  isAuthenticated,
  verifyRazorpayPayment
)
export default userRouter
