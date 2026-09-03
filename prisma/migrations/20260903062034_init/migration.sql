-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "channelsOwn" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "channelsParticipatingIn" INTEGER[] DEFAULT ARRAY[]::INTEGER[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "fromUser" INTEGER NOT NULL,
    "toUser" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "participants" INTEGER[] DEFAULT ARRAY[]::INTEGER[],

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);
