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
  console.log("Entrou no controle register", req.body);
  const { email, password } = req.body;

  try {
    //TODO: implemtar se o user ja existe no banco
    const user = new User({ email, password });
    await user.save();

    res.status(201).send({ message: "User registered successfully" });
  } catch (error: any) {
    res.status(400).send(error);
  }
};
