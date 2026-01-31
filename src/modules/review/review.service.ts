import { prisma } from "../../lib/prisma";

const createReview = async (
  payload: any,
  medicineId: string,
  customerId: string,
) => {
  const existingReview = await prisma.review.findUnique({
    where: {
      customerId_medicineId: {
        medicineId,
        customerId,
      },
    },
  });

  if (existingReview) {
    throw new Error("You have already reviewed this medicine");
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
    throw new Error("You can only review medicines from delivered orders");
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

export const reviewService = {
  createReview,
};
