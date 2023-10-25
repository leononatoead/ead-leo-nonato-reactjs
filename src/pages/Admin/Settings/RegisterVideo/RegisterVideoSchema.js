import { z } from "zod";

export const RegisterVideoSchema = z.object({
  url: z.string().min(10, "Envie um URL ou IFrame Válido"),
});
