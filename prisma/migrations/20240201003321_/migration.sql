-- AlterTable
ALTER TABLE "DailyGoals" ALTER COLUMN "dateTime" SET DATA TYPE TIMESTAMP(3);

-- CreateTable
CREATE TABLE "UserFoodProductCount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "foodProductId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "UserFoodProductCount_pkey" PRIMARY KEY ("id")
);
