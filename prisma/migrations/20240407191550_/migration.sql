-- CreateTable
CREATE TABLE "PdfData" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "generated" BOOLEAN NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PdfData_pkey" PRIMARY KEY ("id")
);
