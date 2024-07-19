import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDb } from "./config/db.config";
import authRoutes from "./routes/authRoute";
import { errorHandler } from "./middleware/error";
import menuRoutes from "./routes/menuRoute";
import { enableCloudinary } from "./config/cloudinary.config";
import categoryRoutes from "./routes/categoryRoute";
import orderRoutes from "./routes/orderRoute";

const app = express();
const PORT = process.env.PORT;

connectDb();
enableCloudinary();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/order", orderRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
