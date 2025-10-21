/*
  Warnings:

  - You are about to drop the column `header` on the `Webhook` table. All the data in the column will be lost.
  - You are about to drop the column `method` on the `Webhook` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Webhook` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Webhook` table. All the data in the column will be lost.
  - You are about to drop the column `secret` on the `Webhook` table. All the data in the column will be lost.
  - You are about to drop the column `workflow_id` on the `Webhook` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Webhook` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Webhook" DROP CONSTRAINT "Webhook_workflow_id_fkey";

-- DropIndex
DROP INDEX "public"."Webhook_workflow_id_key";

-- AlterTable
ALTER TABLE "Webhook" DROP COLUMN "header",
DROP COLUMN "method",
DROP COLUMN "name",
DROP COLUMN "path",
DROP COLUMN "secret",
DROP COLUMN "workflow_id";

-- AlterTable
ALTER TABLE "Workflow" ADD COLUMN     "webhook_Id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Webhook_id_key" ON "Webhook"("id");

-- AddForeignKey
ALTER TABLE "Workflow" ADD CONSTRAINT "Workflow_webhook_Id_fkey" FOREIGN KEY ("webhook_Id") REFERENCES "Webhook"("id") ON DELETE SET NULL ON UPDATE CASCADE;
