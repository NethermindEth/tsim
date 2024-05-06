"use client";
import { useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import Editor from "@monaco-editor/react";
import Workspace from "./Workspace";
import { useWorkspace } from "./Context";
import BottomLeft from "./BottomLeft";
import BottomRight from "./BottomRight";

export default function Home() {
  const [showFiles, setShowFiles] = useState(true);
  const { selectedCode, setSelectedCode } = useWorkspace();

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
          />
        </div>
      </div>
      {/* Bottom Panel for Tabs */}
      <div className="flex border-t">
        <BottomLeft />
        <BottomRight />
      </div>
    </div>
  );
}
