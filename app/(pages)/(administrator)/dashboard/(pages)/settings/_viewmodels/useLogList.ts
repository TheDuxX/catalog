"use client";

import { useEffect, useState } from "react";
import { ActionLog, getLogs } from "../_services/logs-service";

export function useLogList() {
  const [logs, setLogs] = useState<ActionLog[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const logsData = await getLogs();

      // ✅ Filtra logs válidos (evita nulls ou objetos incompletos)
      const validLogs = logsData.filter(
        (log): log is ActionLog =>
          log &&
          typeof log === "object" &&
          "entity" in log &&
          "action" in log &&
          "created_at" in log &&
          "details" in log
      );

      setLogs(validLogs);
    } catch (error) {
      console.error("Erro ao buscar logs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${formattedDate} às ${formattedTime}`;
  };

  function renderLog(log: ActionLog): string {
    if (log.entity === "product") return `Produto: ${log.details.name}, Preço: ${log.details.price}`;
    if (log.entity === "user") return `Usuário: ${log.details.username}`;
    return "Entidade não reconhecida";
  }

  return { logs, loading, formatDate, renderLog };
}
