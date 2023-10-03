import { z } from 'zod';

export const SectionSchema = z.object({
  order: z.number().min(1, 'Digite uma ordem válida.'),
  sectionName: z.string().min(2, 'Digite um nome válido.'),
});
