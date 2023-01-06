import { z } from "zod";

export const ValuesResBackendErrorsSchema = z.union([
  z.object({
    errors: z.array(z.string()),
  }),
  z.array(z.never()),
]);

export const ResponseSchema = z
  .object({
    status: z.number(),
    code: z.number().optional(),
    message: z.string().optional(),
    errors: z
      .object({
        children: z.record(z.string(), ValuesResBackendErrorsSchema),
      })
      .optional(),
  })
  .optional();

export type ResponseType = z.infer<typeof ResponseSchema>;

export type ValuesResBackendErrorsType = z.infer<
  typeof ValuesResBackendErrorsSchema
>;
