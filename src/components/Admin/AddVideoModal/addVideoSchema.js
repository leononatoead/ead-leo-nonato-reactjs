import { z } from 'zod';

export const AddVideoSchema = z.object({
  title: z.string().min(2, 'Digite um nome válido.'),
  description: z.string().min(2, 'Digite uma descrição válida.'),
  section: z.string().min(2, 'Digite uma seção válida.'),
});
