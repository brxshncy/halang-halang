import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { usernameOrEmail, password } = req.body;

  console.log(req.body);
  try {
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Incorrect Password",
      });
    }

    if (user && passwordMatch) {
      res.status(200).json({
        user,
        token: generateToken(user._id),
      });
    } else {
      res.status(403);
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, name, password } = req.body;

    if (!username || !email || !name || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const userNameExists = await User.findOne({
      username,
    });

    const emailExists = await User.findOne({
      email,
    });

    if (userNameExists) {
      res.status(403).json({
        message: "Username already taken",
      });
    }

    if (emailExists) {
      res.status(403).json({
        message: "Email already taken",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      name,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({
      user,
      message: "Register successful!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};
