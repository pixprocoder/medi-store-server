/*
  Warnings:

  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CUSTOMER', 'SELLER', 'ADMIN');

-- CreateEnum
CREATE TYPE "MedicineStatus" AS ENUM ('DRAFT', 'PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PLACED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER';

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicines" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "stock" INTEGER NOT NULL,
    "manufacturer" TEXT,
    "image" TEXT,
    "expiryDate" TIMESTAMP(3),
    "batchNumber" TEXT,
    "prescriptionRequired" BOOLEAN NOT NULL DEFAULT false,
    "activeIngredients" JSONB,
    "status" "MedicineStatus" NOT NULL DEFAULT 'DRAFT',
    "sellerId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medicines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PLACED',
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "shippingAddress" JSONB NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" TEXT,
    "trackingNumber" TEXT,
    "cancelledAt" TIMESTAMP(3),
    "cancelReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "medicineId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "medicineId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "medicines_sellerId_idx" ON "medicines"("sellerId");

-- CreateIndex
CREATE INDEX "medicines_categoryId_idx" ON "medicines"("categoryId");

-- CreateIndex
CREATE INDEX "medicines_status_idx" ON "medicines"("status");

-- CreateIndex
CREATE UNIQUE INDEX "medicines_name_sellerId_key" ON "medicines"("name", "sellerId");

-- CreateIndex
CREATE UNIQUE INDEX "orders_orderNumber_key" ON "orders"("orderNumber");

-- CreateIndex
CREATE INDEX "orders_customerId_idx" ON "orders"("customerId");

-- CreateIndex
CREATE INDEX "orders_sellerId_idx" ON "orders"("sellerId");

-- CreateIndex
CREATE INDEX "orders_status_idx" ON "orders"("status");

-- CreateIndex
CREATE INDEX "order_item_orderId_idx" ON "order_item"("orderId");

-- CreateIndex
CREATE INDEX "order_item_medicineId_idx" ON "order_item"("medicineId");

-- CreateIndex
CREATE INDEX "reviews_customerId_idx" ON "reviews"("customerId");

-- CreateIndex
CREATE INDEX "reviews_medicineId_idx" ON "reviews"("medicineId");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_customerId_medicineId_key" ON "reviews"("customerId", "medicineId");

-- AddForeignKey
ALTER TABLE "medicines" ADD CONSTRAINT "medicines_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicines" ADD CONSTRAINT "medicines_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "medicines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "medicines"("id") ON DELETE CASCADE ON UPDATE CASCADE;
