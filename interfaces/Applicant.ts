import * as z from "zod";

const MARTIAL_STATUS_VALUES = ["single", "married"] as const;

const OWNERSHIP_STATUS_VALUES = ["owned", "mortgaged", "none"] as const;

export const ApplicantSchema = z.object({
  personal: z.object({
    age: z.number().gte(18).lte(85),
    income: z.number().nonnegative(),
    marital_status: z.enum(MARTIAL_STATUS_VALUES),
  }),
  house: z.object({
      ownership_status: z.enum(OWNERSHIP_STATUS_VALUES),
      dependents: z.number().nonnegative(),
  }),
  questions: z.object({
    question1: z.string(),
    question2: z.string(),
    question3: z.string() 
  }),
  vehicle: z.object({
      year: z.number().lte(new Date().getFullYear() + 1),
  }),
});

export type Applicant = z.infer<typeof ApplicantSchema>;
