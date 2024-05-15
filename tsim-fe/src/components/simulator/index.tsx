"use client";
import { useEffect, useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import Editor, { OnMount } from "@monaco-editor/react";
import Workspace from "./Workspace";
import { useWorkspace } from "./Context";
import BottomLeft from "./BottomLeft";
import BottomRight from "./BottomRight";

export default function Home() {
  const [showFiles, setShowFiles] = useState(true);
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
  }, [editor, monacoInstance, location]); // Include decorations in the dependency array

  return (
    <div className="flex flex-col h-screen">
      {" "}
      {/* Full screen height and flex column */}
      <div className="flex flex-1 overflow-hidden">
        {" "}
        {/* Flex container for top half */}
        {/* Left Panel for Files and Folders */}
        <div className="w-1/4 p-2 border-r overflow-auto">
          <Workspace />
        </div>
        {/* Code Editor */}
        <div className="flex-1 p-2 overflow-auto">
          <Editor
            height="100%"
            defaultLanguage="rust"
            value={selectedCode}
            onChange={(value) => setSelectedCode(value!)}
            theme="vs-dark"
            onMount={handleEditorMount}
          />
        </div>
      </div>
      {/* Bottom Panel for Tabs */}
      <div className="flex border-t max-h-[50vh] min-h-[40vh]">
        <BottomLeft />
        <BottomRight />
      </div>
    </div>
  );
}
