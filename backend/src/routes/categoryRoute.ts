import express from "express";
import protectedRoutes from "../middleware/auth";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controller/categoryController";
import { categoryValidator } from "../validators/categoryValidation";
import { upload } from "../utils/multer";

const categoryRoutes = express.Router();

categoryRoutes
  .route("/")
  .post(
    upload.single("imageFile"),
    categoryValidator,
    protectedRoutes,
    createCategory
  )
  .get(protectedRoutes, getCategories);

categoryRoutes
  .route("/:id")
  .put(
    upload.single("imageFile"),
    categoryValidator,
    protectedRoutes,
    updateCategory
  )
  .delete(protectedRoutes, deleteCategory);
export default categoryRoutes;
