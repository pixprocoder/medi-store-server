import express, { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware";
import { UserRole } from "../../constants/user";
import { sellerController } from "./seller.controller";

const router = express.Router();

router.get(
  "/orders",
  authMiddleware(UserRole.SELLER),
  sellerController.getOrders,
);
// patch
router.patch(
  "/orders/:id",
  authMiddleware(UserRole.SELLER),
  sellerController.updateOrderStatus,
);

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
// delete
router.delete(
  "/medicines/:id",
  authMiddleware(UserRole.SELLER),
  sellerController.deleteOwnMedicine,
);

export const sellerRouter: Router = router;
