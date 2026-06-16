/*
  Warnings:

  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "InterestPeriod" AS ENUM ('DAILY', 'MONTHLY', 'ANNUALLY');

-- CreateEnum
CREATE TYPE "ContractStatus" AS ENUM ('ACTIVE', 'FINISHED', 'CANCELED', 'DEFAULTED');

-- CreateEnum
CREATE TYPE "InstallmentFrequency" AS ENUM ('DAILY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY', 'ANNUALLY');

-- CreateEnum
CREATE TYPE "InstallmentStatus" AS ENUM ('PENDING', 'PARTIAL', 'PAID', 'OVERDUE');

-- DropTable
DROP TABLE "customer";

-- CreateTable
CREATE TABLE "person" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "balance" TEXT NOT NULL DEFAULT '0',
    "phoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contract" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "personId" UUID NOT NULL,
    "totalAmount" TEXT NOT NULL,
    "installmentCount" INTEGER NOT NULL,
    "installmentFrequency" "InstallmentFrequency" NOT NULL,
    "interestRate" DECIMAL(6,2) NOT NULL,
    "interestPeriod" "InterestPeriod" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "skipSaturday" BOOLEAN NOT NULL DEFAULT false,
    "skipSunday" BOOLEAN NOT NULL DEFAULT false,
    "status" "ContractStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "installment" (
    "id" UUID NOT NULL,
    "contractId" UUID NOT NULL,
    "installmentNumber" INTEGER NOT NULL,
    "originalAmount" TEXT NOT NULL,
    "remainingAmount" TEXT NOT NULL,
    "accruedInterest" TEXT NOT NULL DEFAULT '0',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3),
    "status" "InstallmentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "installment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "person_name_idx" ON "person"("name");

-- CreateIndex
CREATE INDEX "person_balance_idx" ON "person"("balance");

-- CreateIndex
CREATE INDEX "person_createdAt_idx" ON "person"("createdAt");

-- CreateIndex
CREATE INDEX "contract_personId_idx" ON "contract"("personId");

-- CreateIndex
CREATE INDEX "contract_startDate_idx" ON "contract"("startDate");

-- CreateIndex
CREATE INDEX "contract_status_idx" ON "contract"("status");

-- CreateIndex
CREATE INDEX "installment_contractId_idx" ON "installment"("contractId");

-- CreateIndex
CREATE INDEX "installment_dueDate_idx" ON "installment"("dueDate");

-- CreateIndex
CREATE INDEX "installment_status_idx" ON "installment"("status");

-- CreateIndex
CREATE UNIQUE INDEX "installment_contractId_installmentNumber_key" ON "installment"("contractId", "installmentNumber");

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "installment" ADD CONSTRAINT "installment_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
