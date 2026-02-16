import { UserRole } from "../../constants/user";
import { prisma } from "../../lib/prisma";
import { IUser } from "../../types";

const createReview = async (payload: any, medicineId: string, user: IUser) => {
  const { role, id: customerId } = user;
  if (user.role !== UserRole.CUSTOMER) {
    throw new Error("Only Customers Can Review");
  }

  const existingReview = await prisma.review.findUnique({
    where: {
      customerId_medicineId: {
        medicineId,
        customerId,
      },
    },
  });

  if (existingReview) {
    throw new Error("You can review once per Medicine!");
  }

  // check order success
  const deliveredOrder = await prisma.order.findFirst({
    where: {
      customerId,
      status: "DELIVERED",
      items: {
        some: {
          medicineId,
        },
      },
    },
  });

  if (!deliveredOrder) {
    throw new Error("Your medicine status is not DELIVERED!");
  }

  const review = await prisma.review.create({
    data: {
      customerId,
      medicineId,
      rating: payload.rating,
      comment: payload.comment || null,
    },
    include: {
      customer: {
        select: {
          name: true,
          image: true,
        },
      },
      medicine: {
        select: {
          name: true,
        },
      },
    },
  });

  return review;
};

export const getMedicineReviews = async (medicineId: string) => {
  const result = await prisma.review.findMany({
    where: {
      medicineId,
    },
  });

  return result;
};

export const getOwnReviews = async (customerId: string) => {
  const result = await prisma.review.findMany({
    where: {
      customerId,
    },
    include: {
      medicine: {
        select: {
          name: true,
          image: true,
          price: true,
        },
      },
    },
  });
  return result;
};

export const updateOwnReview = async (
  payload: any,
  reviewId: string,
  customerId: string,
) => {
  const existingReview = await prisma.review.findFirst({
    where: {
      id: reviewId,
    },
  });

  if (!existingReview) {
    throw new Error("Review not found");
  }

  if (existingReview.customerId !== customerId) {
    throw new Error("You are not the author of this review");
  }

  const result = await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: payload,
  });

  return result;
};

export const deleteOwnReview = async (reviewId: string, customerId: string) => {
  const existingReview = await prisma.review.findFirst({
    where: {
      id: reviewId,
    },
  });

  if (!existingReview) {
    throw new Error("Review not found");
  }

  if (existingReview.customerId !== customerId) {
    throw new Error("You are not the author of this review");
  }

  const result = await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });

  return result;
};

export const reviewService = {
  createReview,
  getMedicineReviews,
  getOwnReviews,
  updateOwnReview,
  deleteOwnReview,
};
