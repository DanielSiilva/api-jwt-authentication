import { Router } from "express";
import { register } from "../controller/authController";

const routes = Router();

routes.post("/register", register);

export default routes;
