import { z } from "zod";

export const SectionSchema = z.object({
  order: z.number(),
  sectionName: z.string().min(2, "Digite um nome válido."),
});
