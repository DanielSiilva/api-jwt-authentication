import express from "express";

const app = express();
app.use(express.json());

const PORT = 5001;

const server = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {}
};

server();
