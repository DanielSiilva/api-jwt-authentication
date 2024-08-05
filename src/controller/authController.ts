import { Request, Response } from "express";
import User from "../models/userModel";
import RefreshToken from "../models/refreshTokenModel";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/generateTokens";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user: any = new User({ email, password });
    await user.save();

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await new RefreshToken({ token: refreshToken, userId: user._id }).save();

    res.status(201).send({
      message: "User registered successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, "-password");
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) {
    return res.status(401).send({ error: "Refresh token is required" });
  }

  try {
    const decoded = verifyRefreshToken(token);
    const storedToken = await RefreshToken.findOne({ token });
    if (!storedToken) {
      return res.status(401).send({ error: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken((decoded as any).id);
    res.send({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).send({ error: "Invalid refresh token" });
  }
};
