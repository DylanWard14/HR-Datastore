-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffMemberOnSkills" (
    "staffMemberId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,

    CONSTRAINT "StaffMemberOnSkills_pkey" PRIMARY KEY ("staffMemberId","skillId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- AddForeignKey
ALTER TABLE "StaffMemberOnSkills" ADD CONSTRAINT "StaffMemberOnSkills_staffMemberId_fkey" FOREIGN KEY ("staffMemberId") REFERENCES "StaffMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffMemberOnSkills" ADD CONSTRAINT "StaffMemberOnSkills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
