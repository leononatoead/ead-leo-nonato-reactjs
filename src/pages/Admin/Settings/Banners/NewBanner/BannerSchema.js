import { z } from "zod";

export const BannerSchema = z.object({
  order: z.number(),
  imageURL: z.string().url("Digite uma URL válida."),
  title: z
    .string()
    .min(3, "Digite um título válido.")
    .max(40, "O Título precisa ter no máximo 40 caracteres"),
  subtitle: z
    .string()
    .min(3, "Digite um título válido.")
    .max(15, "O Título precisa ter no máximo 15 caracteres"),
  url: z.string().url("Digite uma URL válida."),
});
