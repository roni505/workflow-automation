/*
  Warnings:

  - You are about to drop the `Outbox_workflow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Outbox_workflow" DROP CONSTRAINT "Outbox_workflow_user_Id_fkey";

-- AlterTable
ALTER TABLE "Workflow" ADD COLUMN     "webhook_Id" TEXT;

-- DropTable
DROP TABLE "public"."Outbox_workflow";

-- AddForeignKey
ALTER TABLE "Workflow" ADD CONSTRAINT "Workflow_webhook_Id_fkey" FOREIGN KEY ("webhook_Id") REFERENCES "Webhook"("id") ON DELETE SET NULL ON UPDATE CASCADE;
