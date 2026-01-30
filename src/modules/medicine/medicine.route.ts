import express, { Router } from "express";
import { medicineController } from "./medicine.controller";
import authMiddleware from "../../middlewares/authMiddleware";
import { UserRole } from "../../constants/user";

const router = express.Router();

// get routes
router.get("/categories", medicineController.getCategories);
router.get("/medicines", medicineController.getMedicines);
router.get("/medicines/:id", medicineController.getSingleMedicine);

export const medicineRouter: Router = router;
