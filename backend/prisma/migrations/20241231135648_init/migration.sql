-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "pdfId" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadedPdf" (
    "id" SERIAL NOT NULL,
    "pdfurl" TEXT NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UploadedPdf_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_pdfId_fkey" FOREIGN KEY ("pdfId") REFERENCES "UploadedPdf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
