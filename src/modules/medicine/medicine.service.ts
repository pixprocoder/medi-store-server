import { prisma } from "../../lib/prisma";

const getCategories = async () => {
  const result = await prisma.category.findMany();
  return result;
};

const getMedicines = async () => {
  const result = await prisma.medicine.findMany({
    include: {
      category: true,
    },
  });
  return result;
};

const getSingleMedicine = async (id: string) => {
  const result = await prisma.medicine.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      reviews: true,
    },
  });
  return result;
};

export const medicineService = {
  getCategories,
  getMedicines,
  getSingleMedicine,
};
