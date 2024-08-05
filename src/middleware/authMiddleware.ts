import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/generateTokens";

const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ error: "Not authorized" });
  }

  try {
    const decoded = verifyAccessToken(token);
    req.userId = (decoded as any).id;
    next();
  } catch (error) {
    return res.status(401).send({ error: "Not authorized" });
  }
};

export default authMiddleware;
