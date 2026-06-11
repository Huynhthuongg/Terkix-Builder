export interface Project {
  id: string;
  name: string;
  description: string;
  language: 'javascript' | 'python' | 'typescript';
  createdAt: Date;
  updatedAt: Date;
  files?: File[];
  settings?: ProjectSettings;
}

export interface ProjectSettings {
  isPublic: boolean;
  allowSharing: boolean;
  autoSave: boolean;
  buildCommand?: string;
  startCommand?: string;
}

export interface File {
  id: string;
  projectId: string;
  name: string;
  path: string;
  content: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExecutionResult {
  success: boolean;
  output: string;
  error: string | null;
  duration: number;
  buildId?: string;
}

export interface BuildResult {
  success: boolean;
  buildId: string;
  status: 'building' | 'completed' | 'failed';
  output: string;
  error: string | null;
  artifacts?: string[];
}
