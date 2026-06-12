import { spawn } from "child_process";

interface ExecutionResult {
  success: boolean;
  output: string;
  error: string | null;
  duration: number;
  containerId?: string;
}

interface DockerRunOptions {
  image: string;
  command: string[];
}

export class DockerExecutor {
  private timeout = 10000;

  async executeJavaScript(code: string): Promise<ExecutionResult> {
    return this.runContainer({
      image: "node:18-alpine",
      command: ["node", "-e", code],
    });
  }

  async executePython(code: string): Promise<ExecutionResult> {
    return this.runContainer({
      image: "python:3.11-alpine",
      command: ["python", "-c", code],
    });
  }

  async cleanup(): Promise<void> {
    await this.runDockerCommand([
      "container",
      "prune",
      "--force",
      "--filter",
      "label=terkix=true",
    ]);
  }

  private async runContainer({
    image,
    command,
  }: DockerRunOptions): Promise<ExecutionResult> {
    const startTime = Date.now();
    const args = [
      "run",
      "--rm",
      "--label",
      "terkix=true",
      "--memory",
      "128m",
      "--cpus",
      "0.5",
      image,
      ...command,
    ];

    const result = await this.runDockerCommand(args);

    return {
      success: result.code === 0,
      output: result.stdout,
      error:
        result.code === 0
          ? null
          : result.stderr || `Process exited with code ${result.code}`,
      duration: Date.now() - startTime,
    };
  }

  private runDockerCommand(
    args: string[],
  ): Promise<{ code: number | null; stdout: string; stderr: string }> {
    return new Promise((resolve) => {
      const child = spawn("docker", args, {
        stdio: ["ignore", "pipe", "pipe"],
      });
      let stdout = "";
      let stderr = "";

      const timeoutId = setTimeout(() => {
        child.kill("SIGKILL");
      }, this.timeout);

      child.stdout.on("data", (data) => {
        stdout += data.toString();
      });

      child.stderr.on("data", (data) => {
        stderr += data.toString();
      });

      child.on("error", (error) => {
        clearTimeout(timeoutId);
        resolve({ code: 1, stdout, stderr: error.message });
      });

      child.on("close", (code) => {
        clearTimeout(timeoutId);
        resolve({ code, stdout, stderr });
      });
    });
  }
}

export default new DockerExecutor();
