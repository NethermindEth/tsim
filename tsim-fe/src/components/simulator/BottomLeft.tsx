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
import WalletConnect from "@/components/starknet/WalletConnect";

export default function BottomLeft() {
  const { selectedCode, selectedFileName, setCompilationResult } =
    useWorkspace();

  const compileCode = async () => {
    console.log("Compiling code...");
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
          <AccordionTrigger>SIMULATE</AccordionTrigger>
          <AccordionContent>
            <WalletConnect />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
