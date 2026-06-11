import Docker from 'dockerode';
import path from 'path';
import fs from 'fs';
import os from 'os';

interface ExecutionResult {
  success: boolean;
  output: string;
  error: string | null;
  duration: number;
  containerId?: string;
}

export class DockerExecutor {
  private docker: Docker;
  private timeout = 10000; // 10 seconds

  constructor() {
    this.docker = new Docker({
      socketPath: process.env.DOCKER_SOCKET || '/var/run/docker.sock',
    });
  }

  async executeJavaScript(code: string): Promise<ExecutionResult> {
    const startTime = Date.now();

    try {
      // Create container
      const container = await this.docker.createContainer({
        Image: 'node:18-alpine',
        Cmd: ['node', '-e', code],
        HostConfig: {
          Memory: 128 * 1024 * 1024, // 128MB
          MemorySwap: 128 * 1024 * 1024,
          CpuQuota: 50000, // 50% CPU
        },
        Tty: false,
        AttachStdout: true,
        AttachStderr: true,
      });

      // Start container
      await container.start();

      // Wait for container to finish
      const result = await container.wait();

      // Get logs
      const logs = await container.logs({
        stdout: true,
        stderr: true,
      });

      // Remove container
      await container.remove();

      const output = logs.toString();
      const success = result.StatusCode === 0;

      return {
        success,
        output,
        error: success ? null : `Process exited with code ${result.StatusCode}`,
        duration: Date.now() - startTime,
        containerId: container.id,
      };
    } catch (error: any) {
      return {
        success: false,
        output: '',
        error: error.message,
        duration: Date.now() - startTime,
      };
    }
  }

  async executePython(code: string): Promise<ExecutionResult> {
    const startTime = Date.now();

    try {
      // Create container
      const container = await this.docker.createContainer({
        Image: 'python:3.11-alpine',
        Cmd: ['python', '-c', code],
        HostConfig: {
          Memory: 128 * 1024 * 1024, // 128MB
          MemorySwap: 128 * 1024 * 1024,
          CpuQuota: 50000, // 50% CPU
        },
        Tty: false,
        AttachStdout: true,
        AttachStderr: true,
      });

      // Start container
      await container.start();

      // Wait for container to finish
      const result = await container.wait();

      // Get logs
      const logs = await container.logs({
        stdout: true,
        stderr: true,
      });

      // Remove container
      await container.remove();

      const output = logs.toString();
      const success = result.StatusCode === 0;

      return {
        success,
        output,
        error: success ? null : `Process exited with code ${result.StatusCode}`,
        duration: Date.now() - startTime,
        containerId: container.id,
      };
    } catch (error: any) {
      return {
        success: false,
        output: '',
        error: error.message,
        duration: Date.now() - startTime,
      };
    }
  }

  async cleanup(): Promise<void> {
    try {
      const containers = await this.docker.listContainers({
        all: true,
        filters: { label: ['terkix=true'] },
      });

      for (const containerInfo of containers) {
        const container = this.docker.getContainer(containerInfo.Id);
        try {
          await container.stop();
          await container.remove();
        } catch (e) {
          // Ignore errors
        }
      }
    } catch (error) {
      // Ignore errors
    }
  }
}

export default new DockerExecutor();
