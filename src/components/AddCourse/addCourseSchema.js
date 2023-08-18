import { z } from 'zod';

export const AddCourseSchema = z.object({
  firstName: z.string().min(2, 'Digite um nome válido.'),
  lastName: z.string().min(2, 'Digite um sobrenome válido.')
});
