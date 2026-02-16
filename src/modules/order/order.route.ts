import express, { Router } from "express";
import { orderController } from "./order.controller";
import authMiddleware from "../../middlewares/authMiddleware";
import { UserRole } from "../../constants/user";

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
  "/",
  authMiddleware(UserRole.CUSTOMER),
  orderController.createOrder,
);

export const orderRouter: Router = router;
