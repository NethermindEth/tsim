import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { CodeView } from "./codeview";


const Page = () => {
  return (
    <main className="h-full">
      <h2>Cairo VM Playground</h2>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel >One</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel>The Main Coding Area <CodeView /> </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>The Terminal Area</ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>

    </main>
  );
};

export default Page;
