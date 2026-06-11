'use client';

import { useEffect, useRef } from 'react';
import ace from 'ace-builds';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/ext-language_tools';

interface AceEditorProps {
  code: string;
  language: string;
  theme?: 'light' | 'dark';
  fontSize?: number;
  onChange?: (code: string) => void;
  readOnly?: boolean;
  height?: string;
}

export default function AceEditorComponent({
  code,
  language,
  theme = 'dark',
  fontSize = 14,
  onChange,
  readOnly = false,
  height = '100%',
}: AceEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<ace.Ace.Editor | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = ace.edit(editorRef.current);
    editorInstance.current = editor;

    // Set mode based on language
    const modeMap: Record<string, string> = {
      javascript: 'ace/mode/javascript',
      typescript: 'ace/mode/javascript',
      python: 'ace/mode/python',
    };

    editor.session.setMode(modeMap[language] || 'ace/mode/javascript');
    editor.setTheme(theme === 'dark' ? 'ace/theme/monokai' : 'ace/theme/chrome');
    editor.setValue(code);
    editor.setReadOnly(readOnly);
    editor.setFontSize(fontSize);

    // Enable autocompletion
    editor.setOptions({
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
    });

    // Listen for changes
    editor.session.on('change', () => {
      if (onChange) {
        onChange(editor.getValue());
      }
    });

    return () => {
      editor.destroy();
    };
  }, [language, theme, fontSize, readOnly]);

  return (
    <div
      ref={editorRef}
      style={{
        height,
        width: '100%',
        fontFamily: 'monospace',
      }}
    />
  );
}
