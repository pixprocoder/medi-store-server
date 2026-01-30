import express from "express";
import { medicineRouter } from "../modules/medicine/medicine.route";
import { sellerRouter } from "../modules/seller/seller.route";
import { orderRouter } from "../modules/order/order.route";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
