import { z } from "zod";
import { ResponseSchema } from "./ResponseTypes";

export const DailyGoalsSchema = z.object({
  id: z.string(),
  userId: z.string(),
  kcal: z.number(),
  protein: z.number(),
  fat: z.number(),
  carbs: z.number(),
  date: z.string(),
});

export const ResponseDailyGoalsSchema = ResponseSchema.and(
  z
    .object({
      data: DailyGoalsSchema.optional(),
    })
    .optional()
);

export type DailyGoalsType = z.infer<typeof DailyGoalsSchema>;

export type BodyDailyGoalsType = Record<
  keyof Omit<DailyGoalsType, "id" | "userId" | "date">,
  string
>;
