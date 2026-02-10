import express, { Router } from "express";
import { orderController } from "./order.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { UserRole } from "../../constants/user.js";

const router = express.Router();

// get routes
router.get(
  "/",
  authMiddleware(UserRole.CUSTOMER),
  orderController.getOwnOrders,
);
router.get(
  "/:id",
  authMiddleware(UserRole.CUSTOMER),
  orderController.getOrderDetails,
);
// post routes
router.post(
  "/:id",
  authMiddleware(UserRole.CUSTOMER),
  orderController.createOrder,
);

export const orderRouter: Router = router;
