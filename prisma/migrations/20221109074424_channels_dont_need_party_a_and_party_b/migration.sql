/*
  Warnings:

  - You are about to drop the column `partyAUserId` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `partyBUserId` on the `Channel` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_partyAUserId_fkey";

-- DropForeignKey
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_partyBUserId_fkey";

-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "partyAUserId",
DROP COLUMN "partyBUserId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
