-- DropIndex
DROP INDEX "ProviderSkills_skillId_idx";

-- CreateIndex
CREATE INDEX "ProviderSkills_skillId_userId_idx" ON "ProviderSkills"("skillId", "userId");

-- CreateIndex
CREATE INDEX "Skill_slug_idx" ON "Skill"("slug");

-- CreateIndex
CREATE INDEX "Skill_categoryId_idx" ON "Skill"("categoryId");
