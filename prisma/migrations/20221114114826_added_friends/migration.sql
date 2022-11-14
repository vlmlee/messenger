/*
  Warnings:

  - You are about to drop the column `friends` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,createdAt,name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "friends";

-- CreateTable
CREATE TABLE "_ChannelToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChannelToUser_AB_unique" ON "_ChannelToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ChannelToUser_B_index" ON "_ChannelToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_createdAt_name_key" ON "User"("id", "createdAt", "name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_createdAt_name_fkey" FOREIGN KEY ("id", "createdAt", "name") REFERENCES "User"("id", "createdAt", "name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelToUser" ADD CONSTRAINT "_ChannelToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelToUser" ADD CONSTRAINT "_ChannelToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
