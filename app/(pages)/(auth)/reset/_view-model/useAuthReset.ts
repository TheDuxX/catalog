"use client";
import { useState } from "react";
import { resetPassword } from "../../login/actions";

export function useauthResetViewModel() {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
  };

  const validateEmail = async () => {
    const form = new FormData();
    form.append("email", formData.email);
    await resetPassword(form);
  }

  return { formData, errors, handleChange, validateEmail };
}
