import express from "express";
import { medicineRouter } from "../modules/medicine/medicine.route.js";
import { sellerRouter } from "../modules/seller/seller.route.js";
import { orderRouter } from "../modules/order/order.route.js";
import { reviewRouter } from "../modules/review/review.route.js";
import { adminRouter } from "../modules/admin/admin.route.js";

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
  {
    path: "/admin",
    route: adminRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
