"use server";

import { createClient } from "@/app/_utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      console.error(error.message);
    }
    return { success: true };
  } catch (error) {
    console.error("Erro ao efetuar login", error);
    return { success: false };
  } finally {
    revalidatePath("/", "layout");
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    const { error } = await supabase.auth.signUp(data);

    if (error) {
      redirect("/error");
    }
    return { success: true };
  } catch (error) {
    console.error("Erro ao efetuar cadastro", error);
    return { success: false };
  } finally {
    revalidatePath("/", "layout");
  }
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Erro ao fazer logout:", error.message);
    redirect("/error");
  }

  redirect("/login");
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(
      formData.get("email") as string
    );

    if (error) {
      console.error(error.message);
    }
    return { success: true };
  } catch (error) {
    console.error("Erro ao enviar e-mail de redefinição:", error);
    return { success: false };
  }
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient();

  const data = {
    password: formData.get("password") as string,
  };

  try {
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      console.error(error.message);
    }
    alert("Senha atualizada com sucesso!");
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar senha:", error);
    return { success: false };
  } finally {
    redirect("/login");
  }
}
