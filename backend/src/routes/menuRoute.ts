import express from "express";
import { createMenu, getMenu } from "../controller/menuController";
import protectedRoutes from "./../middleware/auth";
import { menuValidator } from "../validators/menuValidation";
import { upload } from "../utils/multer";

const menuRoutes = express.Router();

menuRoutes
  .route("/")
  .post(protectedRoutes, upload.single("imageFile"), menuValidator, createMenu)
  .get(protectedRoutes, getMenu);

export default menuRoutes;
