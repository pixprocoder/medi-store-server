import express, { Router } from "express";
import { adminController } from "./admin.controller";
import authMiddleware from "../../middlewares/authMiddleware";
import { UserRole } from "../../constants/user";

const router = express.Router();

// get routes
router.get(
  "/users",
  authMiddleware(UserRole.ADMIN),
  adminController.getAllUser,
);

// update routes
router.patch(
  "/users/:id",
  authMiddleware(UserRole.ADMIN),
  adminController.updateUserStatus,
);

export const adminRouter: Router = router;
