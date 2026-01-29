import express, { type Application } from "express";
import cors from "cors";
import routers from "./routes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app: Application = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  }),
);

// better auth route
app.all("/api/auth/*splat", toNodeHandler(auth));

// routes
app.use("/api/v1", routers);

app.get("/", (req, res) => {
  res.send({ message: "hello world" });
});

export default app;
