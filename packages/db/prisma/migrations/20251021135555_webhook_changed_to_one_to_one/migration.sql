/*
  Warnings:

  - You are about to drop the column `webhook_Id` on the `Workflow` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[workflow_id]` on the table `Webhook` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Workflow" DROP CONSTRAINT "Workflow_webhook_Id_fkey";

-- DropIndex
DROP INDEX "public"."Workflow_webhook_Id_key";

-- AlterTable
ALTER TABLE "Webhook" ADD COLUMN     "workflow_id" TEXT;

-- AlterTable
ALTER TABLE "Workflow" DROP COLUMN "webhook_Id";

-- CreateIndex
CREATE UNIQUE INDEX "Webhook_workflow_id_key" ON "Webhook"("workflow_id");

-- AddForeignKey
ALTER TABLE "Webhook" ADD CONSTRAINT "Webhook_workflow_id_fkey" FOREIGN KEY ("workflow_id") REFERENCES "Workflow"("id") ON DELETE SET NULL ON UPDATE CASCADE;
