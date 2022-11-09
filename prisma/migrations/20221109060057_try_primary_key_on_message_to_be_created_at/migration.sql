/*
  Warnings:

  - The primary key for the `Message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Message` table. All the data in the column will be lost.
  - Made the column `createdAt` on table `Message` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Message_id_createdAt_idx";

-- AlterTable
ALTER TABLE "Message" DROP CONSTRAINT "Message_pkey",
DROP COLUMN "id",
ALTER COLUMN "createdAt" SET NOT NULL,
ADD CONSTRAINT "Message_pkey" PRIMARY KEY ("createdAt");
