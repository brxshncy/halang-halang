import { body } from "express-validator";
import { handleValidationErrors } from "./validationHandler";

export const menuValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("category").notEmpty().withMessage("Category is required"),
  handleValidationErrors,
];
