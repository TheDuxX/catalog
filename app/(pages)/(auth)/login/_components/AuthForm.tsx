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
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function AuthForm() {
  const {
    formData,
    isLoading,
    errors,
    handleChange,
    validateAndLogin,
    validateAndSignup,
    redirect,
  } = useAuthViewModel();

  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-100">
        <TabsTrigger value="login">Entrar</TabsTrigger>
        <TabsTrigger value="signup">Cadastrar</TabsTrigger>
      </TabsList>

      <TabsContent value="login">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validateAndLogin();
          }}
          className="flex flex-col gap-2"
        >
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
            <motion.p
              className="text-sm text-red-500"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {errors.password}
            </motion.p>
          )}
          <span
            onClick={() => redirect("reset")}
            className="text-sm text-muted-foreground cursor-pointer hover:underline"
          >
            Esqueceu a sua senha?
          </span>
          <Button type="submit">Entrar</Button>
        </form>
      </TabsContent>

      <TabsContent value="signup">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validateAndSignup();
          }}
          className="flex flex-col gap-2"
        >
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {errors.email && (
            <motion.p
              className="text-sm text-red-500"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {errors.email}
            </motion.p>
          )}
          <Input
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Senha"
          />
          {errors.password && (
            <motion.p
              className="text-sm text-red-500"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {errors.password}
            </motion.p>
          )}
          <Input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirmar senha"
          />
          {errors.confirmPassword && (
            <motion.p
              className="text-sm text-red-500"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {errors.confirmPassword}
            </motion.p>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : "Entrar"}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}
