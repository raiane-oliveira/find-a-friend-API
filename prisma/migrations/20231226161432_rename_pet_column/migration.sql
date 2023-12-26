/*
  Warnings:

  - You are about to drop the column `independent_level` on the `pets` table. All the data in the column will be lost.
  - Added the required column `independence` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "independent_level",
ADD COLUMN     "independence" "Level" NOT NULL;
