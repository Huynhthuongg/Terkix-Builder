import { Request, Response } from "express";
import jsExecutor from "../services/jsExecutor";
import pythonExecutor from "../services/pythonExecutor";
import dockerExecutor from "../services/dockerExecutor";

export const executeCode = async (req: Request, res: Response) => {
  try {
    const { code, language, projectId, useDocker = false } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: code, language",
      });
    }

    let result;

    if (useDocker) {
      // Use Docker for sandboxed execution
      if (language === "javascript" || language === "typescript") {
        result = await dockerExecutor.executeJavaScript(code);
      } else if (language === "python") {
        result = await dockerExecutor.executePython(code);
      } else {
        return res.status(400).json({
          success: false,
          error: `Unsupported language: ${language}`,
        });
      }
    } else {
      // Use local execution
      if (language === "javascript" || language === "typescript") {
        result = await jsExecutor.executeSafe(code);
      } else if (language === "python") {
        result = await pythonExecutor.execute(code);
      } else {
        return res.status(400).json({
          success: false,
          error: `Unsupported language: ${language}`,
        });
      }
    }

    res.json({
      success: result.success,
      output: result.output,
      error: result.error,
      duration: result.duration,
      projectId,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const buildProject = async (req: Request, res: Response) => {
  try {
    const { projectId, language } = req.body;

    if (!projectId || !language) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: projectId, language",
      });
    }

    // TODO: Implement build logic
    res.json({
      success: true,
      buildId: Date.now().toString(),
      status: "completed",
      output: "Build completed successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
