import { z } from 'zod';

export const AssetsSchema = z.object({
  assetName: z.string().min(2, 'Digite um nome válido.'),
  assetPath: z.string().min(2, 'Digite uma URL válida.').url().optional(),
});

export const AdvertisementSchema = z.object({
  advertisementName: z.string().min(2, 'Digite um nome válido.'),
  advertisementTime: z.string().min(2, 'Digite um tempo válido.'),
  advertisementPath: z.string().min(2, 'Digite uma URL válida.').url(),
});

export const QuizSchema = z.object({
  question: z.string().min(2, 'Digite uma pergunta válida.'),
  firstAnswer: z.string().min(2, 'Digite uma resposta válida.'),
  secondAnswer: z.string().min(2, 'Digite uma resposta válida.'),
  thirdAnswer: z.string().min(2, 'Digite uma resposta válida.'),
  fourthAnswer: z.string().min(2, 'Digite uma resposta válida.'),
  rightAnswer: z.number().min(1, 'Selecione a resposta correta.'),
});
