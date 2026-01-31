import express, { Router } from "express";
import { UserRole } from "../../constants/user";
import authMiddleware from "../../middlewares/authMiddleware";
import { reviewController } from "./review.controller";

const router = express.Router();

// get routes

// post routes
router.post(
  "/:id",
  authMiddleware(UserRole.CUSTOMER),
  reviewController.createReview,
);

export const reviewRouter: Router = router;
