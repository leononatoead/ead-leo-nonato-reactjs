import { z } from 'zod';

export const CommentSchema = z.object({
  comment: z.string().min(3, 'Digite uma mensagem válida.'),
});
