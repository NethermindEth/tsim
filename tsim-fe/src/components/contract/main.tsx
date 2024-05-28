"use client";
import React, { useState, useEffect } from "react";
import { RpcProvider } from "starknet";
import { FileItem } from "../simulator/Workspace";
import { useWorkspace } from "../simulator/Context";
import { Workspace, FileItemProps } from "../simulator/types";
import BottomRight from "../simulator/BottomRight";
import CodeEditor from "../simulator/Editor";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Simulate, DeclareAndDeploy } from "@/components/starknet";
import { getFunctions, compileCode } from "../simulator/BottomLeft";
import { COMPILE_CAIRO_CONTRACT_ENDPOINT } from "@/components/simulator/constants";
import { type Function } from "../starknet/Simulate";

export default function SepoliaContract() {
  const [workspace, setWorkspace] = useState<Workspace>();
  const { contractAddress, setContractAddress, setSelectedCode, setFunctions } =
    useWorkspace();

  const getContractCode = async () => {
    try {
      const provider = new RpcProvider({
        nodeUrl: "https://free-rpc.nethermind.io/sepolia-juno/",
      });
      const classHash = await provider.getClassHashAt(contractAddress);
      const response = await fetch(
        `/api/fetchContractCode?classHash=${classHash}`
      );
      const data = await response.json();
      setWorkspace(generateWorkspace(data.code));

      const abi = (await provider.getClassAt(classHash)).abi;
      setFunctions(getFunctions(abi));

      setSelectedCode("");
    } catch (error) {
      console.error("Failed to fetch contract code:", error);
    }
  };

  const generateWorkspace = (code: { [key: string]: string }): Workspace => {
    const root: Workspace = {
      name: "root",
      children: [],
    };

    Object.entries(code).forEach(([filePath, fileContent]) => {
      const parts = filePath.split("/");
      let current: FileItemProps[] = root.children;
      parts.forEach((part, index) => {
        let node = current.find((child) => child.name === part);
        if (!node) {
          if (index === parts.length - 1) {
            // It's a file
            node = {
              name: part,
              id: Math.random(),
              type: "file",
              code: fileContent,
            };
          } else {
            // It's a folder
            node = {
              name: part,
              id: Math.random(),
              type: "folder",
              children: [],
            };
          }
          current.push(node);
        }

        if (node.type === "folder") {
          current = node.children!;
        }
      });
    });

    return root;
  };

  const handleAddressChange = (event: any) => {
    setContractAddress(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Contract Address Submitted:", contractAddress);
    getContractCode();
  };

  return (
    <div>
      {workspace ? (
        <div className="flex flex-col h-screen">
          {" "}
          {/* Full screen height and flex column */}
          <div className="flex flex-1 overflow-hidden">
            {" "}
            {/* Flex container for top half */}
            {/* Left Panel for Files and Folders */}
            <div className="w-1/4 p-2 border-r overflow-auto">
              {workspace.children.map((file) => {
                return (
                  <FileItem
                    key={file.name}
                    name={file.name}
                    id={file.id}
                    type={file.type}
                    children={file.children}
                    code={file.type == "file" ? file.code : ""}
                  />
                );
              })}
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
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold mb-4">
            Starknet Transaction Simulator and Execution Debugger
          </h1>
          <p className="text-gray-600 mb-4">
            Enter the contract address to simulate transactions and debug
            executions.
          </p>
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={contractAddress}
              onChange={handleAddressChange}
              placeholder="Enter Contract Address"
              className="mb-2 p-2 border rounded"
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      )}
    </div>
  );
}

const BottomLeft = () => {
  const { functions, selectedCode, selectedFileName, setCompilationResult } =
    useWorkspace();

  return (
    <div className="w-1/4 p-2 border-r overflow-auto">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>COMPILE</AccordionTrigger>
          <AccordionContent>
            <Button
              disabled={selectedCode === ""}
              onClick={async () => {
                console.log("Compiling code...");
                const data = await compileCode(
                  COMPILE_CAIRO_CONTRACT_ENDPOINT,
                  {
                    code: selectedCode,
                    file_name: selectedFileName,
                  }
                );

                if (data) {
                  setCompilationResult(JSON.stringify(data, null, 2));
                }
              }}
            >
              Compile code
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>SIMULATE</AccordionTrigger>
          <AccordionContent>
            <Simulate functions={functions} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
