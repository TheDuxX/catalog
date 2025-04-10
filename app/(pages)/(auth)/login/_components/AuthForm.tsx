"use client";

import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { useAuthViewModel } from "../_view-model/useAuthViewModels";

export function AuthForm() {
  const {
    formData,
    errors,
    handleChange,
    validateAndLogin,
    validateAndSignup,
  } = useAuthViewModel();

  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-100">
        <TabsTrigger value="login">Entrar</TabsTrigger>
        <TabsTrigger value="signup">Cadastrar</TabsTrigger>
      </TabsList>

      <TabsContent value="login">
        <form action={validateAndLogin} className="flex flex-col gap-2">
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}

          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Senha"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
          <span className="text-sm text-muted-foreground">Esqueceu a sua senha?</span>
          <Button type="submit">Entrar</Button>
        </form>
      </TabsContent>

      <TabsContent value="signup">
        <form action={validateAndSignup} className="flex flex-col gap-2">
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <Input
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Senha"
          />
          <Input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirmar senha"
          />
          {Object.values(errors).map((e, i) => (
            <p key={i} className="text-sm text-red-500">
              {e}
            </p>
          ))}
          <Button type="submit">Cadastrar</Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}
