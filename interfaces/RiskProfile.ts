import { z } from "zod";

const RiskProfileSchema = z.object({
  auto: z.string(),
  disability: z.string(),
  home: z.string(),
  life: z.string(),
});

export type RiskProfile = z.infer<typeof RiskProfileSchema>;
