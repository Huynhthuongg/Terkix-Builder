"use client";

import { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";

interface CodeMirrorEditorProps {
  code: string;
  language: string;
  theme?: "light" | "dark";
  fontSize?: number;
  onChange?: (code: string) => void;
  readOnly?: boolean;
  height?: string;
}

export default function CodeMirrorEditorComponent({
  code,
  language,
  theme = "dark",
  fontSize = 14,
  onChange,
  readOnly = false,
  height = "100%",
}: CodeMirrorEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) return undefined;

    const getLanguageExtension = () => {
      switch (language) {
        case "javascript":
        case "typescript":
          return javascript({ typescript: language === "typescript" });
        case "python":
          return python();
        default:
          return javascript();
      }
    };

    const state = EditorState.create({
      doc: code,
      extensions: [
        basicSetup,
        getLanguageExtension(),
        theme === "dark" ? oneDark : [],
        EditorView.updateListener.of((update) => {
          if (update.docChanged && onChange) {
            onChange(update.state.doc.toString());
          }
        }),
        EditorView.editable.of(!readOnly),
      ],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    return () => {
      view.destroy();
    };
  }, [code, language, onChange, readOnly, theme]);

  return <div ref={editorRef} style={{ height, fontSize: `${fontSize}px` }} />;
}
