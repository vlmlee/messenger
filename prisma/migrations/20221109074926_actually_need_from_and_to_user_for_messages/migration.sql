-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "fromUser" INTEGER;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_fromUser_fkey" FOREIGN KEY ("fromUser") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
