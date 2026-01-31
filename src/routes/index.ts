import express from "express";
import { medicineRouter } from "../modules/medicine/medicine.route";
import { sellerRouter } from "../modules/seller/seller.route";
import { orderRouter } from "../modules/order/order.route";
import { reviewRouter } from "../modules/review/review.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: medicineRouter,
  },
  {
    path: "/seller",
    route: sellerRouter,
  },
  {
    path: "/orders",
    route: orderRouter,
  },
  {
    path: "/reviews",
    route: reviewRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
