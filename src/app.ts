import express, { type Application } from "express";
import cors from "cors";

const app: Application = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send({ message: "hello world" });
});

export default app;
