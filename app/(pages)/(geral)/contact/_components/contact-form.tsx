"use client";

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
import { Loader2 } from "lucide-react";
import { useContact } from "../_viewmodel/useContact";

const ContactForm = () => {
  const { form, onSubmit, formatPhone, newContact } = useContact();

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
            {newContact.isIdle ? (
              <Button type="submit" variant="secondary" className="w-full">
                Enviar
              </Button>
            ) : (
              <Button type="submit" variant="secondary" className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </Button>
            )}

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => form.reset()}
            >
              Limpar
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ContactForm;
