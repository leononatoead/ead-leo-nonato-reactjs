import { z } from 'zod';

export const changeProfileImageSchema = z.object({
  url: z.string().url('Envie uma URL válida.'),
});
