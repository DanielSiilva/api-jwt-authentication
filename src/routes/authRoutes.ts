import { Router, Request, Response } from "express";

const routes = Router();

routes.get("/teste", (req: Request, res: Response) => {
  res.status(200).send("Hello word");
});

export default routes;
