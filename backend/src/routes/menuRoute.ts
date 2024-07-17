import express from "express";
import { createMenu, getMenu } from "../controller/menuController";
import protectedRoutes from "./../middleware/auth";
import { menuValidator } from "../validators/menuValidation";
import multer from "multer";
const menuRoutes = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
});

menuRoutes
  .route("/")
  .post(protectedRoutes, upload.single("imageFile"), menuValidator, createMenu)
  .get(protectedRoutes, getMenu);

export default menuRoutes;
