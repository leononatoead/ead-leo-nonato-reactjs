import { z } from "zod";

export const NotificationSchema = z.object({
  imageURL: z.string().optional(),
  title: z.string().min(3, "Digite um título válido"),
  subtitle: z.string().optional(),
  text: z.string().min(3, "Digite um texto válido"),
  url: z.string().optional(),
});
