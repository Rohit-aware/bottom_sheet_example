import { useState, useCallback } from 'react';

export interface ActionLogEntry {
  timestamp: string;
  action: string;
}

export const useAdvancedSheet = () => {
  const [logs, setLogs] = useState<ActionLogEntry[]>([]);

  const addLog = useCallback((action: string) => {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    setLogs(prev => [{ timestamp, action }, ...prev.slice(0, 4)]);
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return {
    logs,
    addLog,
    clearLogs,
  };
};
