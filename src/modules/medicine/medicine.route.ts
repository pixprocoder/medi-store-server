import express, { Router } from "express";
import { medicineController } from "./medicine.controller";
import authMiddleware from "../../middlewares/authMiddleware";
import { UserRole } from "../../constants/user";

const router = express.Router();

router.post(
  "/create",
  authMiddleware(UserRole.SELLER),
  medicineController.createMedicine,
);

export const medicineRouter: Router = router;
