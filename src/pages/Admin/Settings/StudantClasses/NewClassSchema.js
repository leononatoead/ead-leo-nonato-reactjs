import { z } from "zod";

export const NewClassSchema = z.object({
  title: z.string().min(3, "Digite um nome válido"),
});
