import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
}

const CodeEditor = ({ code, onChange }: CodeEditorProps) => {
  return (
    <div className="editor-container h-[70vh]">
      <Editor
        height="100%"
        defaultLanguage="c"
        theme="vs-dark"
        value={code}
        onChange={(value) => onChange(value || "")}
        options={{
          fontSize: 16,
          fontFamily: "'JetBrains Mono', monospace",
          minimap: { enabled: false },
          padding: { top: 16, bottom: 16 },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          wordWrap: "on",
          lineNumbers: "on",
          renderLineHighlight: "line",
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          smoothScrolling: true,
          contextmenu: true,
          folding: true,
          bracketPairColorization: { enabled: true },
        }}
      />
    </div>
  );
};

export default CodeEditor;
