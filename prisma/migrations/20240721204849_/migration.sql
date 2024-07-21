-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userType" TEXT DEFAULT 'STANDARD',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockedUser" (
    "id" TEXT NOT NULL,
    "blocked" BOOLEAN NOT NULL DEFAULT true,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "BlockedUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodProduct" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "kcal" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "carbs" DOUBLE PRECISION NOT NULL,
    "code" TEXT,

    CONSTRAINT "FoodProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFoodProductCount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "foodProductId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "UserFoodProductCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerifiedFoodProduct" (
    "id" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT true,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "foodProductId" TEXT NOT NULL,

    CONSTRAINT "VerifiedFoodProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockedFoodProduct" (
    "id" TEXT NOT NULL,
    "blocked" BOOLEAN NOT NULL DEFAULT true,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "foodProductId" TEXT NOT NULL,

    CONSTRAINT "BlockedFoodProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectedProduct" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "foodProductId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "name" TEXT NOT NULL,
    "kcal" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "carbs" DOUBLE PRECISION NOT NULL,
    "code" TEXT,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SelectedProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyGoals" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kcal" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "carbs" DOUBLE PRECISION NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyGoals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PdfData" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "generated" BOOLEAN NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PdfData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginLog" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "log" TEXT,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BlockedUser_userId_key" ON "BlockedUser"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerifiedFoodProduct_foodProductId_key" ON "VerifiedFoodProduct"("foodProductId");

-- CreateIndex
CREATE UNIQUE INDEX "BlockedFoodProduct_foodProductId_key" ON "BlockedFoodProduct"("foodProductId");

-- AddForeignKey
ALTER TABLE "BlockedUser" ADD CONSTRAINT "BlockedUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodProduct" ADD CONSTRAINT "FoodProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerifiedFoodProduct" ADD CONSTRAINT "VerifiedFoodProduct_foodProductId_fkey" FOREIGN KEY ("foodProductId") REFERENCES "FoodProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockedFoodProduct" ADD CONSTRAINT "BlockedFoodProduct_foodProductId_fkey" FOREIGN KEY ("foodProductId") REFERENCES "FoodProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelectedProduct" ADD CONSTRAINT "SelectedProduct_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
