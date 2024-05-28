"use client";
import { useEffect, useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { useWorkspace } from "./Context";

export default function CodeEditor() {
  const [editor, setEditor] = useState<any>(null);
  const [decorations, setDecorations] = useState<string[]>([]);
  const [monacoInstance, setMonacoInstance] = useState<any>(null);
  const { location, selectedCode, setSelectedCode } = useWorkspace();

  const handleEditorMount: OnMount = (editor, monaco) => {
    setEditor(editor);
    setMonacoInstance(monaco);
  };

  useEffect(() => {
    if (editor && monacoInstance && location) {
      console.log("Updating decorations for location", location);
      const { startLineNumber, startColNumber, endLineNumber, endColNumber } = {
        startLineNumber: location.start.line + 1,
        startColNumber: location.start.col + 1,
        endLineNumber: location.end.line + 1,
        endColNumber: location.end.col + 1,
      };

      // Clear previous decorations before setting new ones
      const newDecorations = editor.deltaDecorations(decorations, [
        {
          range: new monacoInstance.Range(
            startLineNumber,
            startColNumber,
            endLineNumber,
            endColNumber
          ),
          options: {
            inlineClassName: "bg-yellow-50",
          },
        },
      ]);
      setDecorations(newDecorations);
    }
  }, [editor, monacoInstance, location]);

  return (
    <>
      <Editor
        height="100%"
        defaultLanguage="rust"
        value={selectedCode}
        onChange={(value) => setSelectedCode(value!)}
        theme="vs-dark"
        onMount={handleEditorMount}
      />
    </>
  );
}
