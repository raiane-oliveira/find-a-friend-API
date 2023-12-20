/*
  Warnings:

  - You are about to drop the column `independent` on the `pets` table. All the data in the column will be lost.
  - Added the required column `city` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `cep` on the `organizations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `whatsapp` on the `organizations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `independent_level` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `environment` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Level" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "images" ADD COLUMN     "alt" TEXT;

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
DROP COLUMN "cep",
ADD COLUMN     "cep" INTEGER NOT NULL,
DROP COLUMN "whatsapp",
ADD COLUMN     "whatsapp" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "independent",
ADD COLUMN     "independent_level" "Level" NOT NULL,
DROP COLUMN "environment",
ADD COLUMN     "environment" "Level" NOT NULL;
