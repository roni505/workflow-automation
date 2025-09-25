/*
  Warnings:

  - Added the required column `connections` to the `Workflow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `Workflow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isArchived` to the `Workflow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nodes` to the `Workflow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_Id` to the `Workflow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "password" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."Workflow" ADD COLUMN     "connections" JSONB NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL,
ADD COLUMN     "nodes" JSONB NOT NULL,
ADD COLUMN     "user_Id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Workflow" ADD CONSTRAINT "Workflow_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
