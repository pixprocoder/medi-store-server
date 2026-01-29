import express from "express";
import { postRouters } from "../modules/post/post.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/posts",
    route: postRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
