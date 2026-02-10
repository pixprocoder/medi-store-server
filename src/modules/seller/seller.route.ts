import express, { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { UserRole } from "../../constants/user.js";
import { sellerController } from "./seller.controller.js";

const router = express.Router();

router.get(
  "/orders",
  authMiddleware(UserRole.SELLER),
  sellerController.getOwnOrders,
);
// patch

// post routes
router.post(
  "/medicines/create",
  authMiddleware(UserRole.SELLER),
  sellerController.createMedicine,
);

// update
router.put(
  "/medicines/:id",
  authMiddleware(UserRole.SELLER),
  sellerController.updateOwnMedicine,
);

router.patch(
  "/orders/:id",
  authMiddleware(UserRole.SELLER),
  sellerController.updateOrderStatus,
);
// delete
router.delete(
  "/medicines/:id",
  authMiddleware(UserRole.SELLER),
  sellerController.deleteOwnMedicine,
);

export const sellerRouter: Router = router;
