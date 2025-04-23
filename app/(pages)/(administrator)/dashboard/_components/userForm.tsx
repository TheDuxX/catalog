"use client";
import { Card, CardContent } from "@/app/_components/ui/card";
import { useUserViewModel } from "../_viewmodels/useUser";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Label } from "@/app/_components/ui/label";
import Image from "next/image";
import { ImagePlus, User2 } from "lucide-react";

const UserForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    user,
    form,
    onSubmit,
    isLoading,
    updateProfile,
    deleteProfile,
    refetchUser: fetchUser,
    redirectToProfile,
  } = useUserViewModel();

  return (
    <Card className="w-full min-w-[30%] shadow-none">
      <CardContent className="p-4  ">
        <Form {...form}>
          <form
            className=" grid grid-cols-3 grid-rows-3 gap-4 items-center justify-center"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)();
            }}
          >
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem className="row-span-3 col-span-1">
                  <FormControl>
                    <div className="relative flex items-center justify-center">
                      <Label
                        htmlFor="avatar-upload"
                        className={`relative w-[100px] h-[100px] rounded-full overflow-hidden shadow group ${
                          isEditing ? "hover:ring-2 hover:ring-primary/50" : ""
                        }`}
                      >
                        {field.value ? (
                          <Image
                            src={field.value}
                            alt="Avatar"
                            fill
                            className="object-cover object-center transition-all"
                          />
                        ) : (
                          <User2 className="w-full h-full p-6 stroke-1 text-gray-400 bg-muted" />
                        )}

                        {isEditing && (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ImagePlus className="text-white w-6 h-6" />
                          </div>
                        )}
                      </Label>

                      <Input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        disabled={!isEditing}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const previewUrl = URL.createObjectURL(file);
                          field.onChange(previewUrl);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full col-span-2">
                  <FormLabel>Nome do usuário</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isEditing} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full col-span-2">
                  <FormLabel>E-mail do usuário</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isEditing} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 col-span-2">
              {isEditing && (
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting || isLoading}
                  className="w-full"
                  variant={"secondary"}
                >
                  {form.formState.isSubmitting ? "Salvando..." : "Salvar"}
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setIsEditing((prev) => !prev)}
              >
                {isEditing ? "Cancelar" : "Editar"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserForm;
