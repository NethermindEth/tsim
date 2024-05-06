"use client";
import { useState, useEffect } from "react";
import { useWorkspace } from "./Context";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BottomRight() {
  const [activeTab, setActiveTab] = useState("sierra");
  const [sierra, setSierra] = useState("");
  const [casm, setCasm] = useState("");
  const [simulation, setSimulation] = useState("");
  const { compilationResult } = useWorkspace();

  useEffect(() => {
    if (!compilationResult) {
      console.log("No compilation result available.");
      return;
    }

    try {
      const jsonCompilationResult = JSON.parse(compilationResult);
      if (jsonCompilationResult) {
        if (jsonCompilationResult) {
          setSierra(
            JSON.stringify(
              jsonCompilationResult.cairo_sierra.sierra_contract_class,
              null,
              4
            )
          );
          setCasm(
            JSON.stringify(
              jsonCompilationResult.casm_sierra.casm_contract_class,
              null,
              4
            )
          );
        }
      }
    } catch (error) {
      console.error("Error parsing compilation result:", error);
      setSierra("");
      setCasm("");
    }
  }, [compilationResult]);

  return (
    <div className="p-2">
      <Tabs defaultValue="bottom-right" className="w-[800px] justify-between">
        <TabsList className="">
          <TabsTrigger value="sierra">Sierra</TabsTrigger>
          <TabsTrigger value="casm">CASM</TabsTrigger>
          <TabsTrigger value="simulation">Simulation</TabsTrigger>
        </TabsList>
        <TabsContent value="sierra">
          <Editor
            height={200}
            language="json"
            theme="vs-dark"
            value={sierra}
            options={{
              readOnly: true,
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              scrollbar: {
                horizontal: "hidden",
              },
            }}
          />
        </TabsContent>
        <TabsContent value="casm">
          <Editor
            height={200}
            language="json"
            theme="vs-dark"
            value={casm}
            options={{
              readOnly: true,
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              scrollbar: {
                horizontal: "hidden",
              },
            }}
          />
        </TabsContent>
        <TabsContent value="simulation">
          <p>Simulation content...</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
