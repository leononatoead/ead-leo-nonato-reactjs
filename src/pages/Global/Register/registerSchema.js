import { z } from 'zod';

export const RegisterSchema = z
  .object({
    name: z.string().min(2, 'Digite um nome válido.'),
    cpf: z
      .string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato de CPF inválido'),
    email: z
      .string()
      .min(1, 'O E-mail é obrigatório.')
      .email('Digite um e-mail válido.'),
    password: z
      .string()
      .min(8, 'A senha é obrigatória e precisa de no mínimo 8 caracteres.'),
    // .regex(/(?=.*?[A-Z])/, 'É necessário ao menos uma letra maiúscula.')
    // .regex(/(?=.*?[a-z])/, 'É necessário ao menos uma letra minúscula.')
    // .regex(/(?=.*?[0-9])/, 'É necessário pelo menos um número.'),
    confirmPassword: z.string().min(1, 'A confirmação de senha é obrigatória.'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas precisam ser iguais.',
    path: ['confirmPassword'],
  });
