import express from "express";
import routes from "./routes/authRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT;
app.use(routes);

const server = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`server running on port: http://localhost:${PORT}`);
    });
  } catch (error) {}
};

server();
