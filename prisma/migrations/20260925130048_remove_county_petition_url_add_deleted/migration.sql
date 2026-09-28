/*
  Warnings:

  - You are about to drop the column `petition_url` on the `counties` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "counties" DROP COLUMN "petition_url",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
