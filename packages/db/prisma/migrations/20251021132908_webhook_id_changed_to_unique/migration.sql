/*
  Warnings:

  - A unique constraint covering the columns `[webhook_Id]` on the table `Workflow` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Workflow_webhook_Id_key" ON "Workflow"("webhook_Id");
