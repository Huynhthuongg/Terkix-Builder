'use client';

import { useEffect, useState } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';

interface CodeMirrorEditorProps {
  code: string;
  language: string;
  theme?: 'light' | 'dark';
  fontSize?: number;
  onChange?: (code: string) => void;
  readOnly?: boolean;
  height?: string;
}

export default function CodeMirrorEditorComponent({
  code,
  language,
  theme = 'dark',
  fontSize = 14,
  onChange,
  readOnly = false,
  height = '100%',
}: CodeMirrorEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const getLanguageExtension = () => {
      switch (language) {
        case 'javascript':
        case 'typescript':
          return javascript({ typescript: language === 'typescript' });
        case 'python':
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
        theme === 'dark' ? oneDark : [],
        EditorView.updateListener.of((update) => {
          if (update.docChanged && onChange) {
            onChange(update.state.doc.toString());
          }
        }),
        EditorView.editable.of(!readOnly),
      ],
    });

    const newView = new EditorView({
      state,
      parent: editorRef.current,
    });

    setView(newView);

    return () => {
      newView.destroy();
    };
  }, []);

  return <div ref={editorRef} style={{ height, fontSize: `${fontSize}px` }} />;
}

import { useRef } from 'react';
