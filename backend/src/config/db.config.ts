import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const mongDbUri = process.env.MONGO_URI;

    if (!mongDbUri) {
      throw new Error("MONGO DB URI is not set.");
    }
    const conn = await mongoose.connect(mongDbUri);

    console.log(`MongoDB connected ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
