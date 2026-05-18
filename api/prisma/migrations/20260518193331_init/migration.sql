/*
  Warnings:

  - A unique constraint covering the columns `[name,id]` on the table `customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[balance,id]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "customer_balance_id_idx";

-- DropIndex
DROP INDEX "customer_name_id_idx";

-- CreateIndex
CREATE UNIQUE INDEX "customer_name_id_key" ON "customer"("name", "id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_balance_id_key" ON "customer"("balance", "id");
