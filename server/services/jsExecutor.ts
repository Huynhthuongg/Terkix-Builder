import { Worker } from 'worker_threads';
import path from 'path';

interface ExecutionResult {
  success: boolean;
  output: string;
  error: string | null;
  duration: number;
}

export class JavaScriptExecutor {
  private timeout = 5000; // 5 seconds

  async execute(code: string): Promise<ExecutionResult> {
    const startTime = Date.now();

    return new Promise((resolve) => {
      const timeoutId = setTimeout(() => {
        resolve({
          success: false,
          output: '',
          error: 'Execution timeout (5 seconds)',
          duration: Date.now() - startTime,
        });
      }, this.timeout);

      try {
        // Create a safe execution context
        const output: string[] = [];
        const errors: string[] = [];

        // Mock console object
        const mockConsole = {
          log: (...args: any[]) => {
            output.push(args.map((arg) => JSON.stringify(arg)).join(' '));
          },
          error: (...args: any[]) => {
            errors.push(args.map((arg) => JSON.stringify(arg)).join(' '));
          },
          warn: (...args: any[]) => {
            output.push('[WARN] ' + args.map((arg) => JSON.stringify(arg)).join(' '));
          },
          info: (...args: any[]) => {
            output.push('[INFO] ' + args.map((arg) => JSON.stringify(arg)).join(' '));
          },
        };

        // Create execution function
        const executeCode = new Function('console', code);

        // Execute code
        executeCode(mockConsole);

        clearTimeout(timeoutId);

        resolve({
          success: errors.length === 0,
          output: output.join('\n'),
          error: errors.length > 0 ? errors.join('\n') : null,
          duration: Date.now() - startTime,
        });
      } catch (error: any) {
        clearTimeout(timeoutId);

        resolve({
          success: false,
          output: '',
          error: error.message,
          duration: Date.now() - startTime,
        });
      }
    });
  }

  async executeSafe(code: string): Promise<ExecutionResult> {
    // Additional safety checks
    const dangerousPatterns = [
      /require\s*\(/gi,
      /import\s+/gi,
      /eval\s*\(/gi,
      /Function\s*\(/gi,
      /process\./gi,
      /fs\./gi,
      /child_process/gi,
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(code)) {
        return {
          success: false,
          output: '',
          error: `Dangerous pattern detected: ${pattern.source}`,
          duration: 0,
        };
      }
    }

    return this.execute(code);
  }
}

export default new JavaScriptExecutor();
