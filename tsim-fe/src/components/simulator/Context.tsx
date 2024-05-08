import React, { createContext, useContext, useState, ReactNode } from "react";
import { FileItemProps, Workspace as WorkspaceType } from "./types";
import { DEFAULT_WORKSPACE_TREE } from "./constants";
import { Account } from "starknet";

interface WorkspaceContextType {
  workspaces: WorkspaceType[];
  selectedWorkspace: number;
  selectedCode: string;
  selectedFileName: string;
  compilationResult: string;
  contractAddress: string;
  account: Account | undefined;
  setWorkspaces: (workspaces: WorkspaceType[]) => void;
  setSelectedWorkspace: (index: number) => void;
  setSelectedCode: (code: string) => void;
  setSelectedFileName: (fileName: string) => void;
  setCompilationResult: (result: string) => void;
  setContractAddress: (address: string) => void;
  setAccount: (account: Account) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined
);

export const WorkspaceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([
    DEFAULT_WORKSPACE_TREE,
  ]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<number>(0);
  const [selectedCode, setSelectedCode] = useState<string>("");
  const [selectedFileName, setSelectedFileName] = useState<string>("Balance");
  const [compilationResult, setCompilationResult] = useState<string>("");
  const [contractAddress, setContractAddress] = useState<string>("");
  const [account, setAccount] = useState<Account>();

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        selectedWorkspace,
        selectedCode,
        selectedFileName,
        compilationResult,
        contractAddress,
        account,
        setWorkspaces,
        setSelectedWorkspace,
        setSelectedCode,
        setSelectedFileName,
        setCompilationResult,
        setContractAddress,
        setAccount,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
};
