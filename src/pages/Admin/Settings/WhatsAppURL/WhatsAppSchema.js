import { z } from "zod";

export const WhatsAppSchema = z.object({
  url: z.string().url(),
});
