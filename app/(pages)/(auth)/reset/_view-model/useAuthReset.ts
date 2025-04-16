"use client";
import { useState } from "react";
import { resetPassword } from "../../login/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useauthResetViewModel() {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
  };

  const validateEmail = async () => {
    const form = new FormData();
    form.append("email", formData.email);
    const response = await resetPassword(form);

    if (response?.success) {
      router.push("/login");
      toast.success("E-mail de redefinição enviado!");
    }
  };

  return { formData, errors, handleChange, validateEmail };
}
