import express from "express";
import { medicineRouter } from "../modules/medicine/medicine.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/medicines",
    route: medicineRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
