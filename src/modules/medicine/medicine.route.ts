import express, { Router } from "express";
import { medicineController } from "./medicine.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { UserRole } from "../../constants/user.js";

const router = express.Router();

// get routes
router.get("/categories", medicineController.getCategories);
router.get("/medicines", medicineController.getMedicines);
router.get("/medicines/:id", medicineController.getSingleMedicine);

export const medicineRouter: Router = router;
