-- CreateTable
CREATE TABLE "SavedProvider" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedProvider_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SavedProvider_userId_idx" ON "SavedProvider"("userId");

-- CreateIndex
CREATE INDEX "SavedProvider_providerId_idx" ON "SavedProvider"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedProvider_userId_providerId_key" ON "SavedProvider"("userId", "providerId");

-- AddForeignKey
ALTER TABLE "SavedProvider" ADD CONSTRAINT "SavedProvider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedProvider" ADD CONSTRAINT "SavedProvider_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
