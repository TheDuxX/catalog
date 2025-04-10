import { useState } from "react";

import { login, signup } from "../actions";
import {
  loginSchema,
  passwordSchema,
  signupSchema,
} from "../_models/authSchema";

export function useAuthViewModel() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
  };

  const validateAndLogin = async () => {
    const result = loginSchema.safeParse(formData);
    if (!result.success) return formatErrors(result.error);
    const form = new FormData();
    form.append("email", formData.email);
    form.append("password", formData.password);
    await login(form);
  };

  const validateAndSignup = async () => {
    const result = signupSchema
      .refine((data) => passwordSchema.safeParse(data.password).success, {
        message: "Invalid password",
        path: ["password"],
      })
      .safeParse(formData);
    if (!result.success) return formatErrors(result.error);
    const form = new FormData();
    form.append("email", formData.email);
    form.append("password", formData.password);
    await signup(form);
  };

  const formatErrors = (error: any) => {
    const fieldErrors: Record<string, string> = {};
    error.errors.forEach((err: any) => {
      if (err.path[0]) fieldErrors[err.path[0]] = err.message;
    });
    setErrors(fieldErrors);
  };

  return {
    formData,
    errors,
    handleChange,
    validateAndLogin,
    validateAndSignup,
  };
}
