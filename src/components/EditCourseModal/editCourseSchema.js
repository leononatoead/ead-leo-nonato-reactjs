import { z } from 'zod';

export const EditCourseSchema = z.object({
  name: z.string().min(2, 'Digite um nome válido.'),
  description: z
    .string()
    .min(1, 'A descrição precisa ter pelo menos x caracteres.'),
  isFree: z.boolean(),
  needAuth: z.boolean(),
  author: z.string().min(2, 'Digite um nome válido.')
});
