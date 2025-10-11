/*
  Warnings:

  - Changed the type of `platform` on the `Credentials` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Credentials" DROP COLUMN "platform",
ADD COLUMN     "platform" TEXT NOT NULL;

-- DropEnum
DROP TYPE "public"."PlatformType";
