-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodProduct" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kcal" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "carbs" DOUBLE PRECISION NOT NULL,
    "code" TEXT,

    CONSTRAINT "FoodProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectedProduct" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "foodProductId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
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

-- AddForeignKey
ALTER TABLE "FoodProduct" ADD CONSTRAINT "FoodProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelectedProduct" ADD CONSTRAINT "SelectedProduct_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelectedProduct" ADD CONSTRAINT "SelectedProduct_foodProductId_fkey" FOREIGN KEY ("foodProductId") REFERENCES "FoodProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
