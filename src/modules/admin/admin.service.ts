import { UserRole } from "../../constants/user";
import { prisma } from "../../lib/prisma";
import { IUser } from "../../types";

const getAllUser = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  return result;
};

const updateUserStatus = async (
  payload: any,
  adminUser: IUser,
  targetUserId: string,
) => {
  const targetUser = await prisma.user.findUnique({
    where: { id: targetUserId },
  });

  if (!targetUser) {
    throw new Error("User not found");
  }

  if (targetUser.role === UserRole.ADMIN) {
    throw new Error("Cannot ban admin users");
  }

  if (targetUser.role === UserRole.CUSTOMER) {
    const ongoingOrders = await prisma.order.count({
      where: {
        customerId: targetUserId,
        status: { in: ["PLACED", "PROCESSING", "SHIPPED"] },
      },
    });

    if (ongoingOrders > 0) {
      throw new Error("Cannot ban customer with ongoing orders");
    }
  }

  if (targetUser.role === UserRole.SELLER) {
    const ongoingOrders = await prisma.order.count({
      where: {
        sellerId: targetUserId,
        status: { in: ["PLACED", "PROCESSING", "SHIPPED"] },
      },
    });

    if (ongoingOrders > 0) {
      throw new Error("Cannot ban seller with orders to fulfill");
    }
  }

  const result = await prisma.user.update({
    where: { id: targetUserId },
    data: { status: payload.status },
  });

  return result;
};

export const adminService = {
  getAllUser,
  updateUserStatus,
};
