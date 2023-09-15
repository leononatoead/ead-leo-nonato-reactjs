import { z } from 'zod';

export const PostSchema = z.object({
  category: z.string().min(2, 'Digite uma categoria válida.'),
  title: z.string().min(1, 'Digite um título válido.'),
});
