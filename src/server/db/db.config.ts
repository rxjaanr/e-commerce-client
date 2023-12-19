import mongoose from "mongoose";

const URI: string | undefined = process.env.MONGODB_URI;

const connectMongoDB = async () => {
  try {
    mongoose
      .connect(URI as string)
      .then(() => console.log("Success Connected To DB"));
  } catch (error) {
    throw error;
  }
};

export default connectMongoDB;
