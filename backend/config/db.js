import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

/**
 * The function `connectDB` connects to a MongoDB database using the Mongoose library in JavaScript.
 */
export const connectDB = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URI)
      console.log(`MongoDB connected... ${conn.connection.host}`);
   } catch (error) {
      console.error(`Error connecting to MongoDB: ${error.message}`);
      process.exit(1); // 1 means failure
   };
};