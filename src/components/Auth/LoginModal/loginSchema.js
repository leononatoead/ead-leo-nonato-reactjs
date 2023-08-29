import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, 'O E-mail é obrigatório.')
    .email('Digite um e-mail válido.'),
  password: z
    .string()
    .min(6, 'A senha é obrigatória e precisa de no mínimo 8 caracteres.'),
});

export const ResetSchema = z.object({
  email: z
    .string()
    .min(1, 'O E-mail é obrigatório.')
    .email('Digite um e-mail válido.'),
});
