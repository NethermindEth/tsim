"use client";
import { useWorkspace } from "./Context";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { COMPILE_CAIRO_CONTRACT_ENDPOINT } from "./constants";
import { Simulate, DeclareAndDeploy } from "@/components/starknet";
import { Abi } from "starknet";
import { type Function} from "../starknet/Simulate";

const getFunctions = (abi: Abi): Function => {
  return abi.reduce(
    (acc, f) => {
      if (
        f.type === "function" ||
        (f.type === "interface" &&
          f.items.some((item: { type: string }) => item.type === "function"))
      ) {
        const functions =
          f.type === "function"
            ? [f]
            : f.items.filter(
              (item: { type: string }) => item.type === "function"
            );
        functions.forEach(
          (func: {
            name: string;
            inputs: any;
            outputs: any;
            state_mutability: string;
          }) => {
            const funcObject = {
              name: func.name,
              inputs: func.inputs,
              outputs: func.outputs,
              state_mutability: func.state_mutability,
            };
            if (func.state_mutability === "view") {
              acc.read.push(funcObject);
            } else {
              acc.write.push(funcObject);
            }
          }
        );
      }
      return acc;
    },
    { read: [], write: [] }
  );
};

export default function BottomLeft() {
  const {
    selectedCode,
    selectedFileName,
    setCompilationResult,
    setContractAddress,
    setFunctions,
    functions
  } = useWorkspace();

  const compileCode = async () => {
    console.log("Compiling code...");
    setContractAddress("");
    const apiUrl = COMPILE_CAIRO_CONTRACT_ENDPOINT;
    const payload = {
      code: selectedCode,
      file_name: selectedFileName,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Compilation successful:", data);
      setCompilationResult(JSON.stringify(data, null, 2));
      
      let compilationResult =  JSON.stringify(data, null, 2);

      if (compilationResult) {
        const abi =
          JSON.parse(compilationResult).cairo_sierra.sierra_contract_class.abi;
  
        if (abi) {
          setFunctions(getFunctions(abi));
        }
      }
    } catch (error) {
      console.error("Failed to compile:", error);
    }
  };

  return (
    <div className="w-1/4 p-2 border-r overflow-auto">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>COMPILE</AccordionTrigger>
          <AccordionContent>
            <Button disabled={selectedCode === ""} onClick={compileCode}>
              Compile code
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>DECLARE AND DEPLOY</AccordionTrigger>
          <AccordionContent>
            <DeclareAndDeploy />
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
}
