import mongoose, { Document } from "mongoose";

interface OrderDocument extends Document {
  menu: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

const orderSchema = new mongoose.Schema<OrderDocument>({
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
