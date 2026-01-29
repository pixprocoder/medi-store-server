import express, { Router } from "express";
import { PostController } from "./post.controller";
const router = express.Router();

router.get("/", PostController.getPosts);

export const postRouters: Router = router;
