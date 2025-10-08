-- CreateTable
CREATE TABLE "public"."Outbox_Workfloew" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL,
    "nodes" JSONB NOT NULL,
    "connections" JSONB NOT NULL,
    "user_Id" TEXT NOT NULL,

    CONSTRAINT "Outbox_Workfloew_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Outbox_Workfloew" ADD CONSTRAINT "Outbox_Workfloew_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
