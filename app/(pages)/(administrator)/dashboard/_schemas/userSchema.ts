import { z } from "zod";

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(3, "O nome de usuário deve ter no mínimo 3 caracteres")
    .max(20, "O nome de usuário deve ter no máximo 20 caracteres"),
  avatar: z.string().url("Avatar inválido").optional().or(z.literal("")),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
});

export type UpdateUserData = z.infer<typeof updateUserSchema>;
