/*
  Warnings:

  - You are about to drop the column `connections` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the column `isArchived` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the column `nodes` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the column `user_Id` on the `Workflow` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Workflow" DROP CONSTRAINT "Workflow_user_Id_fkey";

-- AlterTable
ALTER TABLE "public"."Workflow" DROP COLUMN "connections",
DROP COLUMN "isActive",
DROP COLUMN "isArchived",
DROP COLUMN "nodes",
DROP COLUMN "user_Id";
