import { create } from 'zustand';

interface EditorState {
  code: string;
  language: string;
  theme: 'light' | 'dark';
  fontSize: number;
  editorType: 'monaco' | 'codemirror' | 'ace';
  isAutoSave: boolean;
  isSaved: boolean;

  // Actions
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setFontSize: (size: number) => void;
  setEditorType: (type: 'monaco' | 'codemirror' | 'ace') => void;
  setAutoSave: (enabled: boolean) => void;
  setSaved: (saved: boolean) => void;
  reset: () => void;
}

const initialState = {
  code: '// Start coding here...\n',
  language: 'javascript',
  theme: 'dark' as const,
  fontSize: 14,
  editorType: 'monaco' as const,
  isAutoSave: true,
  isSaved: true,
};

export const useEditorStore = create<EditorState>((set) => ({
  ...initialState,

  setCode: (code) => set({ code, isSaved: false }),
  setLanguage: (language) => set({ language }),
  setTheme: (theme) => set({ theme }),
  setFontSize: (fontSize) => set({ fontSize }),
  setEditorType: (editorType) => set({ editorType }),
  setAutoSave: (isAutoSave) => set({ isAutoSave }),
  setSaved: (isSaved) => set({ isSaved }),
  reset: () => set(initialState),
}));
