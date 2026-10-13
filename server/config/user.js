import mongoose from "mongoose";

let isConnected = false;

const connectToMongo = async () => {
  if (isConnected) {
    return;
  }

  const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/myDatabase";

  try {
    const db = await mongoose.connect(mongoURI);
    isConnected = db.connections[0].readyState;
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("Connection Error:", err);
  }
};

export default connectToMongo;