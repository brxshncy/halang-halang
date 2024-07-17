import express from "express";
import protectedRoutes from "../middleware/auth";
import {
  createCategory,
  getCategories,
} from "../controller/categoryController";
import { categoryValidator } from "../validators/categoryValidation";

const categoryRoutes = express.Router();

categoryRoutes
  .route("/")
  .post(protectedRoutes, categoryValidator, createCategory)
  .get(protectedRoutes, getCategories);

export default categoryRoutes;
