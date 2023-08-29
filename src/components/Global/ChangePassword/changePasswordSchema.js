import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(
        8,
        'A nova senha é obrigatória e precisa de no mínimo 8 caracteres.',
      ),
    // .regex(/(?=.*?[A-Z])/, 'É necessário ao menos uma letra maiúscula.')
    // .regex(/(?=.*?[a-z])/, 'É necessário ao menos uma letra minúscula.')
    // .regex(/(?=.*?[0-9])/, 'É necessário pelo menos um número.'),
    confirmNewPassword: z
      .string()
      .min(1, 'A confirmação da nova senha é obrigatória.'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As novas senhas precisam ser iguais.',
    path: ['confirmNewPassword'],
  });
