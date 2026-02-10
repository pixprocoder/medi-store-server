import { prisma } from "../../lib/prisma.js";

const getCategories = async () => {
  const result = await prisma.category.findMany();
  return result;
};

const getMedicines = async () => {
  const result = await prisma.medicine.findMany();
  return result;
};

const getSingleMedicine = async (id: string) => {
  const result = await prisma.medicine.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
};

export const medicineService = {
  getCategories,
  getMedicines,
  getSingleMedicine,
};
