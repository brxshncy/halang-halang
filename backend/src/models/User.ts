import mongoose, { Document } from "mongoose";

interface UserDocument extends Document {
  username: string;
  email: string;
  name: string;
  password: string;
  _id: string;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>("User", userSchema);

export { UserDocument, User };
