import { z } from 'zod';

export const PostSchema = z.object({
  category: z.string().min(2, 'Digite uma categoria válida.'),
  thumb: z
    .string()
    .min(1, 'Digite uma URL válida.')
    .url('Digite uma URL válida'),
  title: z.string().min(1, 'Digite um título válido.'),
  author: z.string().min(1, 'Digite um nome válido.'),
});
