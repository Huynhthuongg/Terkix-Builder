import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import os from "os";

interface ExecutionResult {
  success: boolean;
  output: string;
  error: string | null;
  duration: number;
}

export class PythonExecutor {
  private timeout = 5000; // 5 seconds
  private pythonPath = "python3";

  async execute(code: string): Promise<ExecutionResult> {
    const startTime = Date.now();

    return new Promise((resolve) => {
      // Create temporary file
      const tempDir = os.tmpdir();
      const tempFile = path.join(tempDir, `terkix_${Date.now()}.py`);

      try {
        // Write code to temporary file
        fs.writeFileSync(tempFile, code);

        let output = "";
        let error = "";

        const process = spawn(this.pythonPath, [tempFile], {
          timeout: this.timeout,
          stdio: ["pipe", "pipe", "pipe"],
        });

        process.stdout?.on("data", (data) => {
          output += data.toString();
        });

        process.stderr?.on("data", (data) => {
          error += data.toString();
        });

        const timeoutId = setTimeout(() => {
          process.kill();
          try {
            fs.unlinkSync(tempFile);
          } catch (e) {
            // Ignore cleanup errors
          }

          resolve({
            success: false,
            output,
            error: "Execution timeout (5 seconds)",
            duration: Date.now() - startTime,
          });
        }, this.timeout);

        process.on("close", (code) => {
          clearTimeout(timeoutId);
          // Clean up temporary file
          try {
            fs.unlinkSync(tempFile);
          } catch (e) {
            // Ignore cleanup errors
          }

          resolve({
            success: code === 0 && !error,
            output,
            error:
              error || (code !== 0 ? `Process exited with code ${code}` : null),
            duration: Date.now() - startTime,
          });
        });

        process.on("error", (err) => {
          clearTimeout(timeoutId);
          // Clean up temporary file
          try {
            fs.unlinkSync(tempFile);
          } catch (e) {
            // Ignore cleanup errors
          }

          resolve({
            success: false,
            output,
            error: err.message,
            duration: Date.now() - startTime,
          });
        });
      } catch (err: any) {
        // Clean up temporary file
        try {
          fs.unlinkSync(tempFile);
        } catch (e) {
          // Ignore cleanup errors
        }

        resolve({
          success: false,
          output: "",
          error: err.message,
          duration: Date.now() - startTime,
        });
      }
    });
  }
}

export default new PythonExecutor();
