import express from "express";
import routes from "./routes/authRoutes";
const app = express();
app.use(express.json());

const PORT = 5001;

app.use(routes);

const server = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Servidor rodando em: http://localhost:${PORT}`);
    });
  } catch (error) {}
};

server();
