import { Request, Response } from "express";
import Category from "../models/Category";
import Menu from "../models/Menu";
import cloudinary from "cloudinary";

export const createMenu = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category } = req.body;

    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const image = req.file as Express.Multer.File;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataUri = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.v2.uploader.upload(dataUri);

    const menu = new Menu({
      name,
      description,
      price,
      category,
      imageUrl: uploadResponse.url,
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
