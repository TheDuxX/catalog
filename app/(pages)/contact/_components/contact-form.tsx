"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { Button } from "@/app/_components/ui/button";
import toast from "react-hot-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z
    .string({ required_error: "Nome é um campo obrigatório" })
    .min(2)
    .max(50),
  email: z.string({ required_error: "E-mail é um campo obrigatório" }).email(),
  phone: z
    .string({ required_error: "Telefone é um campo obrigatório" })
    .min(9)
    .max(15),
  message: z
    .string({ required_error: "Mensagem é um campo obrigatório" })
    .min(10)
    .max(500),
});

const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao enviar contato");
    } catch (error) {
      console.error(error);
    } finally {
      toast.success("Contato enviado com sucesso");
      setLoading(false);
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

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-0">
                <FormLabel>Nome *</FormLabel>
                <FormControl>
                  <Input placeholder="Digite aqui seu nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-0">
                <FormLabel>E-mail *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Digite aqui seu e-mail"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-0">
                <FormLabel>Telefone *</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(formatPhone(e.target.value))
                    }
                    placeholder="(99) 99999-9999"
                    className="input-class"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-0">
                <FormLabel>Mensagem *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Digite aqui sua mensagem"
                    {...field}
                  ></Textarea>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="w-full flex gap-2">
            {loading ? (
              <Button type="submit" variant="secondary" className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              </Button>
            ) : (
              <Button type="submit" variant="secondary" className="w-full">
                Enviar
              </Button>
            )}

            <Button type="button" variant="outline" className="w-full" onClick={() => form.reset()}>
              Limpar
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ContactForm;
