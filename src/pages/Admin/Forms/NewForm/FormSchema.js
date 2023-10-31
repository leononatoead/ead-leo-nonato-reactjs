import { z } from "zod";

export const FormSchema = z.object({
  field: z.string().min(2, "Digite um campo válido."),
  id: z.string().min(2, "Digite um id válido."),
  type: z.string().min(1, "Selecione um tipo de input."),
  placeholder: z.string().min(2, "Digite um placeholder válido."),
});
