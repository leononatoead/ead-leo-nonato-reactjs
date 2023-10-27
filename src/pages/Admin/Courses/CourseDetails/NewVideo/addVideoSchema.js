import { z } from "zod";

export const AddVideoSchema = z.object({
  section: z.string().min(1, "Selecione uma seção válida."),
  order: z.number(),
  title: z.string().min(2, "Digite um nome válido."),
  description: z.string().min(2, "Digite uma descrição válida."),
  videoPath: z.string().optional(),
});
