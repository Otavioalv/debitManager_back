/*
  Warnings:

  - You are about to drop the column `balance` on the `person` table. All the data in the column will be lost.
  - Made the column `phoneNumber` on table `person` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "person_balance_idx";

-- AlterTable
ALTER TABLE "person" DROP COLUMN "balance",
ADD COLUMN     "cnh" TEXT,
ADD COLUMN     "cnpj" TEXT,
ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "municipalRegistration" TEXT,
ADD COLUMN     "rg" TEXT,
ADD COLUMN     "secondaryPhoneNumber" TEXT,
ADD COLUMN     "stateRegistration" TEXT,
ALTER COLUMN "phoneNumber" SET NOT NULL,

ADD CONSTRAINT "person_cpf_or_cnpj_check"
CHECK (
    "cpf" IS NOT NULL
    OR
    "cnpj" IS NOT NULL
);

