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
    const categories = await Category.find({});

    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    const { name } = req.body;

    if (!category) {
      return res.status(404).json({
        message: "Category not found!",
      });
    }

    if (req.file) {
      const imageUrl = await uploadImageToCloudinary(
        req.file as Express.Multer.File
      );
      category.imageUrl = imageUrl;
    }
    category.name = name;
    await category.save();
    res.status(203).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error when updating category",
      error,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found!",
      });
    }

    res.status(200).json({ message: "Category deleted!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
