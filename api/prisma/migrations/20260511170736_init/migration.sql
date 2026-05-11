-- CreateTable
CREATE TABLE "customer" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "balance" BIGINT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);
