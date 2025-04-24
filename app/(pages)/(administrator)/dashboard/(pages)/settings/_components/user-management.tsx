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
import { Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Skeleton } from "@/app/_components/ui/skeleton";

const UserManagement = () => {
  const { users, isLoading, formatDate } = useUserManagent();

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
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => console.log("Excluir usuário", user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
