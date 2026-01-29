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
export const medicineService = {
  createMedicine,
};
