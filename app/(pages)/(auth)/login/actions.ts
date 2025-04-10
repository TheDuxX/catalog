"use server";

import { createClient } from "@/app/_utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Erro ao fazer logout:", error.message);
    redirect("/error"); // ou mostrar um toast depois
  }

  redirect("/login"); // redireciona para a tela de login
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(
    formData.get("email") as string);

  if (error) {
    console.error(error.message);
  }

  console.log("E-mail de redefinição enviado!");
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: "new_password",
  });

  if (error) {
    toast.error(error.message);
  }
}
