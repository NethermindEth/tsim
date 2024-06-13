"use client";
import Contract from "../../components/contract/main";
import { WorkspaceProvider } from "@/components/simulator/Context";

export default function SepoliaContract() {
  return (
    <WorkspaceProvider>
      <Contract />
    </WorkspaceProvider>
  );
}

// Enter the contract address or class hash of the contract.
// Use Voyager's API (e.g. https://sepolia.voyager.online/api/class/0x0690ac2ab6eb4acd06e27e71935727be7fa723d6e4733656ce78743c5b60634d/code) to get the code
// Add the existing simulation interface
