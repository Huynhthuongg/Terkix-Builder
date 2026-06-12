"use client";

import Editor from "@monaco-editor/react";

interface MonacoEditorProps {
  code: string;
  language: string;
  theme?: "light" | "dark" | "vs" | "vs-dark";
  fontSize?: number;
  onChange?: (code: string) => void;
  readOnly?: boolean;
  height?: string;
}

export default function MonacoEditorComponent({
  code,
  language,
  theme = "vs-dark",
  fontSize = 14,
  onChange,
  readOnly = false,
  height = "100%",
}: MonacoEditorProps) {
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && onChange) {
      onChange(value);
    }
  };

  return (
    <Editor
      height={height}
      defaultLanguage={language}
      language={language}
      value={code}
      onChange={handleEditorChange}
      theme={theme}
      options={{
        minimap: { enabled: false },
        fontSize,
        readOnly,
        wordWrap: "on",
        formatOnPaste: true,
        formatOnType: true,
        autoClosingBrackets: "always",
        autoClosingQuotes: "always",
        autoIndent: "full",
        bracketPairColorization: {
          enabled: true,
        },
        scrollBeyondLastLine: false,
        smoothScrolling: true,
        cursorBlinking: "blink",
        cursorSmoothCaretAnimation: "on",
      }}
    />
  );
}
