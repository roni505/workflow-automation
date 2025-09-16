/*
  Warnings:

  - The primary key for the `Credentials` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Credentials` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Credentials` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Credentials` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Credentials` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - The primary key for the `Webhook` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `title` on the `Webhook` table. All the data in the column will be lost.
  - You are about to drop the `workflow` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Credentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_Id` to the `Credentials` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `platform` on the `Credentials` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `password` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `name` to the `Webhook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Webhook` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `secret` on the `Webhook` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."PlatformType" AS ENUM ('TELEGRAM', 'RESEND');

-- DropForeignKey
ALTER TABLE "public"."Credentials" DROP CONSTRAINT "Credentials_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."workflow" DROP CONSTRAINT "workflow_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Credentials" DROP CONSTRAINT "Credentials_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "user_Id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "platform",
ADD COLUMN     "platform" "public"."PlatformType" NOT NULL,
ADD CONSTRAINT "Credentials_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Credentials_id_seq";

-- AlterTable
ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "createdAt",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "password",
ADD COLUMN     "password" INTEGER NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "public"."Webhook" DROP CONSTRAINT "Webhook_pkey",
DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "secret",
ADD COLUMN     "secret" INTEGER NOT NULL,
ADD CONSTRAINT "Webhook_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Webhook_id_seq";

-- DropTable
DROP TABLE "public"."workflow";

-- DropEnum
DROP TYPE "public"."CredentialTypes";

-- CreateTable
CREATE TABLE "public"."Workflow" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL,
    "nodes" JSONB NOT NULL,
    "connections" JSONB NOT NULL,
    "user_Id" TEXT NOT NULL,

    CONSTRAINT "Workflow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Workflow" ADD CONSTRAINT "Workflow_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Credentials" ADD CONSTRAINT "Credentials_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Webhook" ADD CONSTRAINT "Webhook_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
