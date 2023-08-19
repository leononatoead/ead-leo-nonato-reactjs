import { z } from 'zod';

export const AddVideoSchema = z.object({
  title: z.string().min(2, 'Digite um nome válido.')
});
