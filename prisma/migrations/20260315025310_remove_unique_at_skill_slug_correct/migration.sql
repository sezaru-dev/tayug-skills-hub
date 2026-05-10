/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `SkillCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Skill_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "SkillCategory_slug_key" ON "SkillCategory"("slug");
