-- CreateIndex
CREATE INDEX "Friend_id_idx" ON "Friend"("id");

-- CreateIndex
CREATE INDEX "Message_id_createdAt_idx" ON "Message"("id", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "User_id_createdAt_idx" ON "User"("id", "createdAt" DESC);
