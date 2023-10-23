import { PrismaClient } from '@prisma/client';
import { userSeed } from './seed/user';
import { foodProductSeed } from './seed/foodProduct';
import { mealSeed } from './seed/meal';
import { dailyGoalsSeed } from './seed/dailyGoals';

const prisma = new PrismaClient();

async function main() {
    for (let user of userSeed) {
        await prisma.user.create({
            data: {
                ...user,
            },
        });
    }

    for (let meal of mealSeed) {
        await prisma.meal.create({
            data: {
                ...meal,
            },
        });
    }

    for (let foodProduct of foodProductSeed) {
        await prisma.foodProduct.create({
            data: {
                ...foodProduct,
            },
        });
    }

    for (let dailyGoals of dailyGoalsSeed) {
        await prisma.dailyGoals.create({
            data: {
                ...dailyGoals,
            },
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
