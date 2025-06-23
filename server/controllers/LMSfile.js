import Razorpay from "razorpay";
import crypto from "crypto";
import Course from "../models/Course.js";
import User from "../models/User.js";
import { Purchase } from "../models/Purchase.js";

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Step 1: Create Razorpay Order
export const createRazorpayOrder = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.auth.userId;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    const finalPrice = Math.round(
      course.coursePrice - (course.coursePrice * course.discount) / 100
    ) * 100; // Razorpay uses paise

    const order = await razorpay.orders.create({
      amount: finalPrice,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.json({ success: true, order });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Step 2: Verify Razorpay Payment and Enroll
export const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId , amount } = req.body;
    const userId = req.auth.userId;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    // Save purchase
    await Purchase.create({
      courseId,
      userId,
      paymentId: razorpay_payment_id,
      amount: amount / 100,
      status: "completed",
    });

    await User.findByIdAndUpdate(userId, {
      $addToSet: { enrolledCourses: courseId },
    });

        // ✅ Update course's enrolled students
    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { enrolledStudents: userId },
    });
    
    res.json({ success: true, message: "Payment verified. Course enrolled." });
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
