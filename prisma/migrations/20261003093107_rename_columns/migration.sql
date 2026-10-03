/*
  Warnings:

  - You are about to drop the column `label_x` on the `counties` table. All the data in the column will be lost.
  - You are about to drop the column `label_y` on the `counties` table. All the data in the column will be lost.
  - Added the required column `code_x` to the `counties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code_y` to the `counties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "counties" DROP COLUMN "label_x",
DROP COLUMN "label_y",
ADD COLUMN     "code_x" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "code_y" DOUBLE PRECISION NOT NULL;
