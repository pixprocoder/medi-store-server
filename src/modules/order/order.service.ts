import { prisma } from "../../lib/prisma";

const createOrder = async (payload: any, customerId: string) => {
  const { items, shippingAddress } = payload;

  const medicineIds = items.map((item: any) => item.medicineId);
  const medicines = await prisma.medicine.findMany({
    where: {
      id: { in: medicineIds },
      status: "APPROVED",
      stock: { gt: 0 },
    },
  });

  // Validate stock for each item
  items.forEach((item: any) => {
    const medicine = medicines.find((m) => m.id === item.medicineId);
    if (!medicine) throw new Error(`Medicine ${item.medicineId} not found`);
    if (medicine.stock < item.quantity)
      throw new Error(`Insufficient stock for ${medicine.name}`);
  });

  // Group items by seller
  const groupedBySeller: Record<string, any[]> = {};
  items.forEach((item: any) => {
    const medicine = medicines.find((m) => m.id === item.medicineId);
    if (!medicine) {
      return;
    }
    const sellerId = medicine.sellerId;

    if (!groupedBySeller[sellerId]) {
      groupedBySeller[sellerId] = [];
    }

    groupedBySeller[sellerId].push({
      medicineId: item.medicineId,
      quantity: item.quantity,
      price: medicine.price,
    });
  });

  // Create orders for each seller
  const orders: any = [];

  for (const [sellerId, sellerItems] of Object.entries(groupedBySeller)) {
    const totalAmount = sellerItems.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0,
    );

    const order = await prisma.order.create({
      data: {
        orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        customerId,
        sellerId: sellerId,
        totalAmount: totalAmount,
        shippingAddress: shippingAddress,
        paymentMethod: "COD",
        paymentStatus: "PENDING",
        items: {
          create: sellerItems.map((item) => ({
            medicineId: item.medicineId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
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
        seller: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Update medicine stock
    for (const item of sellerItems) {
      await prisma.medicine.update({
        where: { id: item.medicineId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    orders.push(order);
  }

  return orders;
};

const getOrders = async () => {
  const result = await prisma.order.findMany();
  return result;
};

const getOrderDetails = async (id: string) => {
  const result = await prisma.order.findFirstOrThrow({
    where: {
      id,
    },
  });
  return result;
};

export const orderService = {
  createOrder,
  getOrders,
  getOrderDetails,
};
