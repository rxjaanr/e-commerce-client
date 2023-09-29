import mongoose from "mongoose";

export default function connectMongoDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI IS NOT DEFINED!");
  }
  try {
    mongoose.connect(uri);
  } catch (err) {
    console.log(err);
  }
}
