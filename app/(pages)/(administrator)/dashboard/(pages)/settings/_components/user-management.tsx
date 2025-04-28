"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { useUserManagent } from "../_viewmodels/useUserManagent";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { Loader2, PlusIcon, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Skeleton } from "@/app/_components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { Label } from "@/app/_components/ui/label";

const UserManagement = () => {
  const {
    users,
    formData,
    isLoading,
    errors,
    formatDate,
    handleDeleteUser,
    createUser,
    handleChange,
    isDeleting,
    handleAvatarChange,
  } = useUserManagent();

  if (isLoading) {
    return (
      <Skeleton className="w-2/3 bg-white">
        <Card className="bg-white w-full">
          <CardHeader className="m-0 p-2">
            <CardTitle className="text-lg p-2 px-4">
              Usuários Cadastrados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold ">Imagem</TableHead>
                  <TableHead className="font-semibold">Nome</TableHead>
                  <TableHead className="font-semibold">
                    Última atualização
                  </TableHead>
                  <TableHead className="text-right font-semibold">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
            </Table>
          </CardContent>
        </Card>
      </Skeleton>
    );
  }

  return (
    <Card className="bg-white w-2/3">
      <CardHeader className="m-0 p-2">
        <CardTitle className="text-lg p-2 px-4">Usuários Cadastrados</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold ">Imagem</TableHead>
              <TableHead className="font-semibold">Nome</TableHead>
              <TableHead className="font-semibold">
                Última atualização
              </TableHead>
              <TableHead className="text-right font-semibold">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Image
                    src={user.avatar ?? "/placeholder.jpg"}
                    alt={user.username ?? "Avatar"}
                    width={40}
                    height={40}
                    className="rounded-sm"
                  />
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{formatDate(user.updated_at)}</TableCell>
                <TableCell className="text-right">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="rounded-full"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Essa ação é irreversível. O usuário será
                          permanentemente removido do sistema.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteUser(user.id)}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          {isDeleting ? "Removendo..." : "Remover"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger className="mt-4" asChild>
              <Button variant={"outline"}>
                <PlusIcon /> Criar novo usuário
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo Usuário</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  createUser();
                }}
                className="flex gap-4 justify-center items-center"
                id="user-create-form"
              >
                <Label
                  htmlFor="avatar"
                  className="flex justify-center items-center rounded-full border border-solid max-w-40 w-full aspect-square max-h-40 overflow-hidden cursor-pointer"
                >
                  {formData.avatar && (
                    <div className="relative w-full h-full">
                      <Image
                        src={URL.createObjectURL(formData.avatar)}
                        alt="Avatar"
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                  )}
                  <PlusIcon className={`${formData.avatar ? "hidden" : ""}`} />
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  name="avatar"
                  id="avatar"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                {errors.avatar && (
                  <motion.p
                    className="text-sm text-red-500"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.avatar}
                  </motion.p>
                )}
                <div className="w-full flex flex-col gap-2">
                <Input
                    name="username"
                    autoComplete="name"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Nome de Usuário"
                  />
                  {errors.email && (
                    <motion.p
                      className="text-sm text-red-500"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                  <Input
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <motion.p
                      className="text-sm text-red-500"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                  <Input
                    type="password"
                    autoComplete="new-password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Senha"
                  />
                  {errors.password && (
                    <motion.p
                      className="text-sm text-red-500"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.password}
                    </motion.p>
                  )}
                  <Input
                    type="password"
                    autoComplete="new-password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirmar senha"
                  />
                  {errors.confirmPassword && (
                    <motion.p
                      className="text-sm text-red-500"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant={"secondary"}
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Cadastrar"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
