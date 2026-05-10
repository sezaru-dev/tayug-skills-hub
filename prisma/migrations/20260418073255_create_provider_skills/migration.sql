-- CreateTable
CREATE TABLE "ProviderSkills" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    CONSTRAINT "ProviderSkills_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProviderSkills_userId_skillId_key" ON "ProviderSkills"("userId", "skillId");

-- AddForeignKey
ALTER TABLE "ProviderSkills" ADD CONSTRAINT "ProviderSkills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderSkills" ADD CONSTRAINT "ProviderSkills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
