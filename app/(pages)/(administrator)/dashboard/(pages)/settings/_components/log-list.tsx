"use client";

import { useLogList } from "../_viewmodels/useLogList";

const LogsList = () => {
  const { logs, loading, formatDate, renderLog } = useLogList();

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="flex flex-col gap-2">
      {logs.map((log) =>
        log ? (
          <div key={log.id}>
            <p>{log.entity}</p>
            <p>{log.action}</p>
            <p>{formatDate(log.created_at)}</p>
            {renderLog(log)}
          </div>
        ) : null
      )}
    </div>
  );
};

export default LogsList;
