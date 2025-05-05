"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Log } from "../_services/logs-service";
import {
  badgeColors,
  formatedDateandHour,
  useLogList,
} from "../_viewmodels/useLogList";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Skeleton } from "@/app/_components/ui/skeleton";
import toast from "react-hot-toast";
import { Button } from "@/app/_components/ui/button";
import { ArrowLeft, ArrowRight, ArrowUpDown, Filter } from "lucide-react";
import { Badge } from "@/app/_components/ui/badge";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { useUsersList } from "../../../_viewmodels/useUsers";
import Image from "next/image";
const TextTable = () => {
  const { data: logs, isLoading, error, refetch } = useLogList();
  const { data: users, isLoading: isLoadingUsers } = useUsersList();

  const [sorting, setSorting] = useState<SortingState>([
    { id: "created_at", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns: ColumnDef<Log, unknown>[] = [
    {
      accessorKey: "action",
      header: () => {
        const column = table.getColumn("action");

        return (
          <div className="flex items-center gap-4">
            <Button
              className="p-0 hover:bg-transparent hover:text-inherit"
              variant="ghost"
              onClick={() =>
                column?.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Status
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="p-0 hover:bg-transparent hover:text-inherit "
                  variant="ghost"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem
                  onClick={() => column?.setFilterValue(undefined)}
                >
                  Todos
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => column?.setFilterValue("create")}
                >
                  Criados
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => column?.setFilterValue("update")}
                >
                  Alterados
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => column?.setFilterValue("delete")}
                >
                  Deletados
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      cell: ({ row }) => (
        <Badge
          className={`rounded-full p-1.5 ${badgeColors(
            row.getValue("action")
          )}`}
        ></Badge>
      ),
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => {
        return (
          <Button
            className="p-0 hover:bg-transparent hover:text-inherit"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => formatedDateandHour(row.getValue("created_at")),
    },
    {
      accessorKey: "details",
      header: ({ column }) => {
        return (
          <Button
            className="p-0 hover:bg-transparent hover:text-inherit"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Detalhes
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "entity_id",
      header: ({ column }) => {
        return (
          <Button
            className="p-0 hover:bg-transparent hover:text-inherit"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Entidade
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "user_id",
      header: ({ column }) => {
        return (
          <Button
            className="p-0 hover:bg-transparent hover:text-inherit"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Usuário
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const user = users?.find((user) => user.id === row.getValue("user_id"));
        return (
          <div className="flex items-center gap-4">
            <div className="overflow-hidden rounded-full aspect-square relative w-6">
              <Image
                src={
                  user?.avatar !== null && user?.avatar !== undefined
                    ? user?.avatar
                    : ""
                }
                alt={
                  user?.username !== null && user?.username !== undefined
                    ? user?.username
                    : ""
                }
                fill
                className="object-cover object-center"
              />
            </div>
            {user?.username}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: logs || [], // Passa um array vazio se logs for undefined
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="w-full">
        <Card>
          <CardContent className="pb-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Skeleton className="h-6 w-20" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-6 w-24" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-6 w-32" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-6 w-24" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-6 w-24" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3, 4, 5].map(
                  (
                    i // Renderiza algumas linhas de skeleton
                  ) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return toast.error("Erro ao carregar logs."), null;
  }

  return (
    <div className="w-full">
      <Card className="bg-white">
        <CardContent className="pb-0 pt-2">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          className="bg-white shadow"
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          className="bg-white shadow"
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TextTable;
