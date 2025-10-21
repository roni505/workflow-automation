/*
  Warnings:

  - A unique constraint covering the columns `[URL]` on the table `Webhook` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Webhook_URL_key" ON "Webhook"("URL");
