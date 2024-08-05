import { Router } from "express";
import { register, getUsers } from "../controller/authController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/register", register);
router.get("/users", authMiddleware, getUsers);

export default router;
