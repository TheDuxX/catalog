"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Log } from "../_services/logs-service";
import {
  formatedDateandHour,
  badgeColors,
  useLogList,
} from "../_viewmodels/useLogList";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Badge } from "@/app/_components/ui/badge";

const LogsList = () => {
  const { data: logs, isLoading, error, refetch } = useLogList();

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao buscar logs</p>;

  return (
    <Card className="flex flex-col gap-2 bg-white">
      <CardHeader>
        <CardTitle>Histórico de Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Data</TableHead>
              <TableHead className="font-semibold">Detalhes</TableHead>
              <TableHead className="font-semibold">Entidade</TableHead>
              <TableHead className="font-semibold">Usuário</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs?.map((log: Log) =>
              log ? (
                <TableRow key={log.id}>
                  <TableCell>
                    <Badge
                      className={`${badgeColors(
                        log.action
                      )} aspect-square rounded-full`}
                    ></Badge>
                  </TableCell>
                  <TableCell>{formatedDateandHour(log.created_at)}</TableCell>
                  <TableCell>{log.details}</TableCell>
                  <TableCell>{log.entity_id}</TableCell>
                  <TableCell>{log.user_id}</TableCell>
                </TableRow>
              ) : null
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LogsList;
