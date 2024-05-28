import Workspace from "./Workspace";
import BottomLeft from "./BottomLeft";
import BottomRight from "./BottomRight";
import CodeEditor from "./Editor";

export default function Home() {
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
          <CodeEditor />
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
