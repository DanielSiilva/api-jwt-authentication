import { Request, Response } from "express";
import User from "../models/userModel";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = new User({ email, password });
    await user.save();

    res.status(201).send({ message: "User registered successfully" });
  } catch (error: any) {
    res.status(400).send(error);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, "-password");
    res.send(users);
  } catch (error: any) {
    res.status(500).send(error);
  }
};
