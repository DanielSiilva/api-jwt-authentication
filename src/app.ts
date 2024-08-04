import express from "express";
import routes from "./routes/authRoutes";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT;

app.use(routes);

const server = async () => {
  const keyscret = process.env.JWT_PRIVATE_KEY_PATH;

  console.log("key", keyscret);

  try {
    app.listen(PORT, () => {
      console.log(`Servidor rodando em: http://localhost:${PORT}`);
    });
  } catch (error) {}
};

server();
