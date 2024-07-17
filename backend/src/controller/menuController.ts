import { Request, Response } from "express";
import Category from "../models/Category";
import Menu from "../models/Menu";
import cloudinary from "cloudinary";
import { uploadImageToCloudinary } from "../utils/uploadImage";

export const createMenu = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category } = req.body;

    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const imageUrl = await uploadImageToCloudinary(
      req.file as Express.Multer.File
    );

    const menu = new Menu({
      name,
      description,
      price,
      category,
      imageUrl,
    });

    await menu.save();
    res.status(201).json(menu);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

export const getMenu = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      message: "test",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};
