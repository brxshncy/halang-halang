import mongoose, { Document } from "mongoose";

interface CategoryDocument extends Document {
  name: string;
  imageUrl: string;
}

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model<CategoryDocument>("Category", categorySchema);

export default Category;
