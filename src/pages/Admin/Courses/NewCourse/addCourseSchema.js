import { z } from 'zod';

export const AddCourseSchema = z.object({
  name: z.string().min(2, 'Digite um nome válido.'),
  description: z
    .string()
    .min(1, 'A descrição precisa ter pelo menos x caracteres.'),
  price: z.number().optional(),
  paymentRef: z.string().optional(),
  paymentURL: z.string().optional(),
  formRef: z.string().optional(),
  author: z.string().min(2, 'Digite um nome válido.'),
});
