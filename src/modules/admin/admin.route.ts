import express, { Router } from "express";
import { UserRole } from "../../constants/user";
import authMiddleware from "../../middlewares/authMiddleware";
import { adminController } from "./admin.controller";

const router = express.Router();

// get routes
router.get(
  "/users",
  authMiddleware(UserRole.ADMIN),
  adminController.getAllUser,
);
router.get(
  "/medicines",
  authMiddleware(UserRole.ADMIN),
  adminController.getMedicines,
);
router.get(
  "/orders",
  authMiddleware(UserRole.ADMIN),
  adminController.getAllOrders,
);
router.get(
  "/orders/:id",
  authMiddleware(UserRole.ADMIN),
  adminController.getOrderById,
);

// update routes
router.patch(
  "/users/:id",
  authMiddleware(UserRole.ADMIN),
  adminController.updateUserStatus,
);
router.patch(
  "/categories/:id",
  authMiddleware(UserRole.ADMIN),
  adminController.updateCategory,
);

// post routes
router.post(
  "/categories",
  authMiddleware(UserRole.ADMIN),
  adminController.createCategory,
);

// delete routes
router.delete(
  "/categories/:id",
  authMiddleware(UserRole.ADMIN),
  adminController.deleteCategory,
);

export const adminRouter: Router = router;
