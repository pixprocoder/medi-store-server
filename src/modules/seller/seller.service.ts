import { prisma } from "../../lib/prisma";

const createMedicine = async (data: any, userId: string) => {
  const result = await prisma.medicine.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      manufacturer: data.manufacturer,
      image: data.image,
      expiryDate: data.expiryDate,
      batchNumber: data.batchNumber,
      prescriptionRequired: data.prescriptionRequired,
      activeIngredients: data.activeIngredients,
      status: data.status,
      sellerId: userId,
      categoryId: data.categoryId,
    },
    include: {
      category: true,
      seller: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return result;
};

// update
const updateOwnMedicine = async (
  data: any,
  medicineId: string,
  sellerId: string,
) => {
  const medicineData = await prisma.medicine.findUniqueOrThrow({
    where: {
      id: medicineId,
    },
    select: {
      id: true,
      sellerId: true,
    },
  });

  if (medicineData.sellerId !== sellerId) {
    throw new Error("Your are not owner of this medicine");
  }

  const result = await prisma.medicine.update({
    where: {
      id: medicineData.id,
    },
    data,
  });
  return result;
};

// delete
const deleteOwnMedicine = async (medicineId: string, sellerId: string) => {
  const medicineData = await prisma.medicine.findUniqueOrThrow({
    where: {
      id: medicineId,
    },
    select: {
      id: true,
      sellerId: true,
    },
  });

  if (medicineData.sellerId !== sellerId) {
    throw new Error("Your are not owner of this medicine");
  }

  const result = await prisma.medicine.delete({
    where: {
      id: medicineData.id,
    },
  });
  return result;
};

// get
const getOrders = async () => {
  const result = await prisma.order.findMany();
  return result;
};

// update
const updateOrderStatus = async (data: any, orderId: string) => {
  const result = await prisma.order.update({
    where: {
      id: orderId,
    },
    data,
  });
  return result;
};

export const sellerService = {
  getOrders,
  createMedicine,
  updateOwnMedicine,
  deleteOwnMedicine,
  updateOrderStatus,
};
