import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, { message: "A senha deve ter no mínimo 8 caracteres" })
  .regex(/[A-Z]/, {
    message: "A senha deve conter ao menos uma letra maiúscula",
  })
  .regex(/[a-z]/, {
    message: "A senha deve conter ao menos uma letra minúscula",
  })
  .regex(/\d/, { message: "A senha deve conter ao menos um número" })
  .regex(/[^A-Za-z0-9]/, {
    message: "A senha deve conter ao menos um caractere especial (ex: !, @, #)",
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const signupSchema = z
  .object({
    username: z.string().min(1, { message: "O nome é obrigatório" }),
    avatar: z
      .instanceof(File)
      .refine((file) => file.size > 0, "Avatar obrigatório")
      .optional(),
    email: z.string().email({ message: "E-mail inválido" }),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
