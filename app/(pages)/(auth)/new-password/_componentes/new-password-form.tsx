"use client";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import Image from "next/image";
import { useAuthViewModel } from "../../login/_view-model/useAuthViewModels";
import { AnimatePresence, motion } from "framer-motion";

const NewPasswordForm = () => {
  const { validateAndUpdatePassword, handleChange, errors } =
    useAuthViewModel();

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
          <div className="relative flex items-center justify-center w-full h-12 mb-4">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
          <h2 className="font-bold text-lg text-primary">
            Defina sua nova senha
          </h2>
          <form
            className="flex flex-col gap-2"
            action={validateAndUpdatePassword}
          >
            <div className="flex flex-col gap-1">
              <Input
                name="password"
                placeholder="Senha"
                type="password"
                onChange={handleChange}
                aria-invalid={!!errors.password}
                className={errors.password ? "border-red-500" : ""}
              />

              <AnimatePresence mode="wait">
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
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-1">
              <Input
                name="confirmPassword"
                placeholder="Confirmar senha"
                type="password"
                onChange={handleChange}
                aria-invalid={!!errors.confirmPassword}
                className={errors.confirmPassword ? "border-red-500" : ""}
              />

              <AnimatePresence mode="wait">
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
              </AnimatePresence>
            </div>

            <Button type="submit" variant="secondary" className="font-semibold">
              Salvar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewPasswordForm;
