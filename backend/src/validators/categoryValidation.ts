import { body } from "express-validator";
import { handleValidationErrors } from "./validationHandler";

export const categoryValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  handleValidationErrors,
];
