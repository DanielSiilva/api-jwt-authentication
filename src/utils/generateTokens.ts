import jwt from "jsonwebtoken";
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

dotenv.config();

const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../../", process.env.JWT_PRIVATE_KEY_PATH!)
);
const publicKey = fs.readFileSync(
  path.resolve(__dirname, "../../", process.env.JWT_PUBLIC_KEY_PATH!)
);
const refreshPrivateKey = fs.readFileSync(
  path.resolve(__dirname, "../../", process.env.REFRESH_TOKEN_PRIVATE_KEY_PATH!)
);
const refreshPublicKey = fs.readFileSync(
  path.resolve(__dirname, "../../", process.env.REFRESH_TOKEN_PUBLIC_KEY_PATH!)
);

const generateAccessToken = (userId: string) => {
  return jwt.sign({ id: userId }, privateKey, {
    algorithm: "RS256",
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, refreshPrivateKey, {
    algorithm: "RS256",
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
  });
};

const verifyAccessToken = (token: string) => {
  return jwt.verify(token, publicKey, { algorithms: ["RS256"] });
};

const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshPublicKey, { algorithms: ["RS256"] });
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
