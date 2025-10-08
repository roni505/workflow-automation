/*
  Warnings:

  - You are about to drop the `Outbox_Workfloew` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Outbox_Workfloew" DROP CONSTRAINT "Outbox_Workfloew_user_Id_fkey";

-- DropTable
DROP TABLE "public"."Outbox_Workfloew";

-- CreateTable
CREATE TABLE "public"."Outbox_workflow" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL,
    "nodes" JSONB NOT NULL,
    "connections" JSONB NOT NULL,
    "user_Id" TEXT NOT NULL,

    CONSTRAINT "Outbox_workflow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Outbox_workflow" ADD CONSTRAINT "Outbox_workflow_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
