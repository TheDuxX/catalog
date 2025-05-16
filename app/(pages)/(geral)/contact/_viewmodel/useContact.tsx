import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { getContacts } from "../_service/contact-service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useContact = () => {
  const formSchema = z.object({
    name: z
      .string({ required_error: "Nome é um campo obrigatório" })
      .min(2)
      .max(50),
    email: z
      .string({ required_error: "E-mail é um campo obrigatório" })
      .email(),
    phone: z
      .string({ required_error: "Telefone é um campo obrigatório" })
      .min(9)
      .max(15),
    message: z
      .string({ required_error: "Mensagem é um campo obrigatório" })
      .min(10)
      .max(500),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const {
    data: contacts,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });

  //mutations
  const newContact = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataRes = await res.json();
      return dataRes;
    },
  });
  const deleteContact = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch("/api/contacts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const dataRes = await res.json();
      return dataRes;
    },
  });

  async function handleDeleteContact(id: string) {
    try {
      deleteContact.mutate(id);
    } catch (error) {
      console.error("Erro ao deletar contato", error);
    } finally {
      toast.success("Contato deletado com sucesso");
      refetch();
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      newContact.mutate(values);
    } catch (error) {
      console.error("Erro ao enviar contato", error);
    } finally {
      toast.success("Contato enviado com sucesso");
      form.reset();
    }
  }

  const formatPhone = (value: string) => {
    value = value.replace(/\D/g, "");

    if (value.length > 10) {
      return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(
        7,
        11
      )}`;
    } else if (value.length > 6) {
      return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else if (value.length > 2) {
      return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else {
      return value;
    }
  };

  function formatDate(date: Date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortedContacts = contacts?.slice().sort((a: any, b: any) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return {
    form,
    onSubmit,
    formatPhone,
    formatDate,
    formSchema,
    contacts,
    isLoading,
    isError,
    error,
    refetch,
    newContact,
    sortedContacts,
    handleDeleteContact,
  };
};
