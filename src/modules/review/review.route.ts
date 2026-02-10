import express, { Router } from "express";
import { UserRole } from "../../constants/user.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { reviewController } from "./review.controller.js";

const router = express.Router();

// get routes
router.get(
  "/",
  authMiddleware(UserRole.CUSTOMER),
  reviewController.getOwnReviews,
);
router.get("/medicine/:id", reviewController.getMedicineReviews);
// post routes
router.post(
  "/:id",
  authMiddleware(UserRole.CUSTOMER),
  reviewController.createReview,
);

// update routes
router.put(
  "/:id",
  authMiddleware(UserRole.CUSTOMER),
  reviewController.updateOwnReview,
);

// delete routes
router.delete(
  "/:id",
  authMiddleware(UserRole.CUSTOMER),
  reviewController.deleteOwnReview,
);

export const reviewRouter: Router = router;
