import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { CodeView } from "./codeview";
import { SideNav } from "./components/sidenav";
import { SideBar } from "./components/sidebar";

const Page = () => {
  return (
    
      <div className="grid h-screen w-full pl-[53px]">
        <SideNav />
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
            <h1 className="text-xl font-semibold">CairoVM Playground</h1>
          </header>
          <main className="flex-1 gap-4 overflow-auto p-4 ">
              <ResizablePanelGroup
                direction="horizontal"
                className="rounded-lg border"
              >
                <SideBar />
                <ResizablePanel defaultSize={80}>
                  <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={75}>
                        <CodeView />
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={25}>
                        <span className="font-semibold">Terminal</span>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
              </ResizablePanelGroup>
          </main>
        </div>


      </div>
  );
};

export default Page;

