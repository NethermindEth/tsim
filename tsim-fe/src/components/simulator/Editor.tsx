"use client";
import { useEffect, useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { useWorkspace } from "./Context";

export default function CodeEditor({ readOnly }: { readOnly: boolean }) {
  const [editor, setEditor] = useState<any>(null);
  const [decorations, setDecorations] = useState<string[]>([]);
  const [monacoInstance, setMonacoInstance] = useState<any>(null);
  const [viewContract, setViewContract] = useState<boolean>(false);
  const {
    contract,
    location,
    selectedCode,
    selectedFileName,
    setSelectedCode,
  } = useWorkspace();

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

      if (location.file_name == "contract") {
        setViewContract(true);
      } else {
        setViewContract(false);
      }

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
      <div className="flex m-3 h-5">
        <div
          className="text-sm text-white border-r-2 border-white pr-2 cursor-pointer"
          onClick={() => setViewContract(false)}
        >
          {selectedFileName}
        </div>
        {contract && (
          <div
            className="text-sm text-white border-r-2 border-white px-2 cursor-pointer"
            onClick={() => setViewContract(true)}
          >
            contract
          </div>
        )}
      </div>
      <Editor
        height="100%"
        defaultLanguage="rust"
        value={viewContract == false ? selectedCode : contract}
        options={{ readOnly: readOnly }}
        onChange={(value) => {
          !readOnly && setSelectedCode(value!);
        }}
        theme="vs-dark"
        onMount={handleEditorMount}
      />
    </>
  );
}
