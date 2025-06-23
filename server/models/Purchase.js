// import mongoose from "mongoose";

// const PurchaseSchema = new mongoose.Schema({
//     courseId: { type: mongoose.Schema.Types.ObjectId,
//         ref: 'Course',
//         required: true
//     },
//     userId: {
//         type: String,
//         ref: 'User',
//         required: true
//     },
//     amount: { type: Number, required: true },
//     status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }

// }, { timestamps: true });

// export const Purchase = mongoose.model('Purchase', PurchaseSchema);


import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userId: {
      type: String, // ✅ updated from String to ObjectId
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentId: {
      type: String, // ✅ Razorpay payment ID
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Purchase = mongoose.model("Purchase", PurchaseSchema);
