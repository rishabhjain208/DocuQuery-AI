-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_pdfId_fkey";

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "pdfId" DROP NOT NULL;
