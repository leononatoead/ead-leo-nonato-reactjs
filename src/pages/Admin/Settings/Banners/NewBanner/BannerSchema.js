import { z } from 'zod';

export const BannerSchema = z.object({
  order: z.number().min(1, 'Digite uma posição válida.'),
  imageURL: z
    .string()
    .min(10, 'Digite uma URL válida.')
    .url('Digite uma URL válida.'),
  title: z
    .string()
    .min(10, 'Digite um título válido.')
    .max(40, 'O Título precisa ter no máximo 40 caracteres'),
  subtitle: z
    .string()
    .min(10, 'Digite um título válido.')
    .max(15, 'O Título precisa ter no máximo 15 caracteres'),
  url: z
    .string()
    .min(10, 'Digite uma URL válida.')
    .url('Digite uma URL válida.'),
});
