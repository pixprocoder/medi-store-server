import { UserRole } from "../../constants/user";
import { prisma } from "../../lib/prisma";
import { IUser } from "../../types/index";

// user management
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
// medicine management
const getMedicines = async () => {
  const result = await prisma.medicine.findMany();
  return result;
};
const getAllOrders = async () => {
  const result = await prisma.order.findMany({
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      seller: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      items: {
        include: {
          medicine: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });
  return result;
};
const getOrderById = async (orderId: string) => {
  const result = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      seller: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      items: {
        include: {
          medicine: {
            select: {
              name: true,
              image: true,
              price: true,
              manufacturer: true,
            },
          },
        },
      },
    },
  });

  if (!result) {
    throw new Error("Order not found");
  }

  return result;
};

// category management
const createCategory = async (payload: { name: string; slug: string }) => {
  const existing = await prisma.category.findUnique({
    where: { slug: payload.slug },
  });

  if (existing) {
    throw new Error("Category with this slug already exists");
  }

  const result = await prisma.category.create({
    data: {
      name: payload.name,
      slug: payload.slug,
    },
  });

  return result;
};
const updateCategory = async (
  payload: { name?: string; slug?: string },
  id: string,
) => {
  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  if (payload.slug && payload.slug !== category.slug) {
    const existing = await prisma.category.findUnique({
      where: { slug: payload.slug },
    });
    if (existing) {
      throw new Error("Slug already in use");
    }
  }

  const updated = await prisma.category.update({
    where: { id },
    data: payload,
  });

  return updated;
};
const deleteCategory = async (id: string) => {
  const medicineCount = await prisma.medicine.count({
    where: { categoryId: id },
  });

  if (medicineCount > 0) {
    throw new Error(`Cannot delete category with ${medicineCount} medicines`);
  }

  const result = await prisma.category.delete({
    where: { id },
  });

  return result;
};
export const adminService = {
  getAllUser,
  updateUserStatus,
  getMedicines,
  getAllOrders,
  getOrderById,
  createCategory,
  updateCategory,
  deleteCategory,
};
