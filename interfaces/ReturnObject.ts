import { z } from "zod";

const ReturnObjectSchema = z.object({
  auto: z.number(),
  disability: z.number(),
  home: z.number(),
  life: z.number(),
});

export type ReturnObject = z.infer<typeof ReturnObjectSchema>;
