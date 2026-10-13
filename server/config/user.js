// config/user.js me mongoose.connect ke sath ensure karein:
import mongoose from "mongoose";

const connectToMongo = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

export default connectToMongo;