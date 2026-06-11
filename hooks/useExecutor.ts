import { useState, useCallback } from 'react';

interface ExecutionResult {
  output: string;
  error: string | null;
  duration: number;
}

export function useExecutor() {
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);

  const execute = useCallback(
    async (code: string, language: string, projectId?: string) => {
      setIsExecuting(true);
      const startTime = Date.now();

      try {
        const response = await fetch('/api/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, language, projectId }),
        });

        const data = await response.json();
        const duration = Date.now() - startTime;

        setResult({
          output: data.output || '',
          error: data.error || null,
          duration,
        });

        return data;
      } catch (error: any) {
        const duration = Date.now() - startTime;
        setResult({
          output: '',
          error: error.message,
          duration,
        });
      } finally {
        setIsExecuting(false);
      }
    },
    []
  );

  const build = useCallback(
    async (projectId: string, language: string) => {
      setIsExecuting(true);
      const startTime = Date.now();

      try {
        const response = await fetch('/api/execute/build', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId, language }),
        });

        const data = await response.json();
        const duration = Date.now() - startTime;

        setResult({
          output: data.output || '',
          error: data.error || null,
          duration,
        });

        return data;
      } catch (error: any) {
        const duration = Date.now() - startTime;
        setResult({
          output: '',
          error: error.message,
          duration,
        });
      } finally {
        setIsExecuting(false);
      }
    },
    []
  );

  return {
    execute,
    build,
    isExecuting,
    result,
  };
}
