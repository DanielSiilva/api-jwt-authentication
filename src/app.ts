import express from "express";
import routes from "./routes/authRoutes";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { error } from "console";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT;
app.use(routes);

const server = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI!)
      .then(() => console.log("Database connect"))
      .catch((error) =>
        console.log("error connecting to database connects", error)
      );

    app.listen(PORT, () => {
      console.log(`server running on port: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error when starting the server", error);
  }
};

server();
