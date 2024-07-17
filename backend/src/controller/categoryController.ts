import { Request, Response } from "express";
import Category from "../models/Category";
import { uploadImageToCloudinary } from "../utils/uploadImage";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const imageUrl = await uploadImageToCloudinary(
      req.file as Express.Multer.File
    );

    const category = new Category({
      name,
      imageUrl,
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
