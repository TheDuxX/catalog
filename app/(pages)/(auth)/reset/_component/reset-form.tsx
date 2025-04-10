"use client";
import { Input } from "@/app/_components/ui/input";
import { useauthResetViewModel } from "../_view-model/useAuthReset";
import { Button } from "@/app/_components/ui/button";

export function ResetPasswordView() {
  const { formData, errors, handleChange, validateEmail } =
    useauthResetViewModel();

  return (
    <form action={validateEmail} className="flex flex-col gap-2">
      <Input
        name="email"
        type="email"
        placeholder="Digite seu e-mail."
        value={formData.email}
        onChange={handleChange}
      />
      <Button type="submit" variant={"secondary"}>
        Enviar
      </Button>
    </form>
  );
}
