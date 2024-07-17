import mongoose, { Document } from "mongoose";

interface MenuDocument extends Document {
  name: string;
  price: string;
  description?: string;
  category: string;
  image?: string; // Optional image field
}
const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null, // Default value is null
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: {
      type: String,
      default: null, // Default value is null if no image is provided
    },
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model<MenuDocument>("Menu", menuSchema);

export default Menu;
