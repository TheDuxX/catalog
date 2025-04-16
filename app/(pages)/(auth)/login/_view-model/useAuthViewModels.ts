"use client";
import { useState } from "react";

import { login, signup, updatePassword } from "../actions";
import {
  loginSchema,
  passwordSchema,
  resetPasswordSchema,
  signupSchema,
} from "../_models/authSchema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { set } from "zod";

export function useAuthViewModel() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
  };

  const validateAndLogin = async () => {
    const result = loginSchema.safeParse(formData);
    if (!result.success) return formatErrors(result.error);

    try {
      setIsLoading(true);
      const form = new FormData();
      form.append("email", formData.email);
      form.append("password", formData.password);

      const response = await login(form);
      if (response?.success) {
        setIsLoading(false);
        router.push("/dashboard");
        toast.success("Login efetuado com sucesso!");
      } else {
        toast.error("Erro ao efetuar login!");
      }
    } catch (error) {
      console.error("Erro ao efetuar login", error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateAndSignup = async () => {
    const result = signupSchema
      .refine((data) => passwordSchema.safeParse(data.password).success, {
        message: "Invalid password",
        path: ["password"],
      })
      .safeParse(formData);
    if (!result.success) return formatErrors(result.error);
    try {
      setIsLoading(true);
      const form = new FormData();
      form.append("email", formData.email);
      form.append("password", formData.password);

      const response = await signup(form);
      if (response?.success) {
        router.push("/dashboard");
        toast.success("Cadastro efetuado com sucesso!");
      } else {
        toast.error("Erro ao efetuar cadastro!");
      }
    } catch (error) {
      console.error("Erro ao efetuar cadastro", error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateAndUpdatePassword = async () => {
    const result = resetPasswordSchema.safeParse({
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });

    if (!result.success) {
      console.warn("Erros de validação:", result.error.flatten());
      return formatErrors(result.error);
    }

    try {
      const form = new FormData();
      form.append("email", formData.email);
      form.append("password", formData.password);
      const response = await updatePassword(form);

      if (response?.success) {
        router.push("/login");
        toast.success("Senha atualizada com sucesso!");
      } else {
        toast.error("Erro ao atualizar senha!");
      }
    } catch (error) {
      console.error("Erro ao atualizar a senha:", error);
    }
  };

  const formatErrors = (error: any) => {
    const fieldErrors: Record<string, string> = {};
    error.errors.forEach((err: any) => {
      if (err.path[0]) fieldErrors[err.path[0]] = err.message;
    });
    setErrors(fieldErrors);
  };

  const redirect = (path: string) => router.push(path);

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    validateAndLogin,
    validateAndSignup,
    validateAndUpdatePassword,
    redirect,
  };
}
