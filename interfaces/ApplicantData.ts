import * as z from "zod";

const MARTIAL_STATUS_VALUES = ["single", "married"] as const;

const OWNERSHIP_STATUS_VALUES = ["owned", "mortgaged"] as const;

export const ApplicantDataSchema = z.object({
  body: z.object({
    age: z.number().gte(18),
    dependents: z.number().nonnegative(),
    house: z.nullable(
      z.object({
        ownership_status: z.enum(OWNERSHIP_STATUS_VALUES),
      })
    ),
    income: z.number().nonnegative(),
    marital_status: z.enum(MARTIAL_STATUS_VALUES),
    risk_questions: z.array(z.boolean()),
    vehicle: z.nullable(
      z.object({
        year: z.number(),
      })
    ),
  }),
});

export type ApplicantData = z.infer<typeof ApplicantDataSchema>;
