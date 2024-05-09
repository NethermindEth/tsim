import React, { createContext, useContext, useState, ReactNode } from "react";
import { FileItemProps, Workspace as WorkspaceType } from "./types";
import { DEFAULT_WORKSPACE_TREE } from "./constants";
import { Account } from "starknet";
import { type Function } from '../starknet/Simulate'

const initialCode = 
`#[starknet::interface]
pub trait IHelloStarknet<TContractState> {
    fn increase_balance(ref self: TContractState, amount: felt252);
    fn get_balance(self: @TContractState) -> felt252;
}

#[starknet::contract]
mod HelloStarknet {
    #[storage]
    struct Storage {
        balance: felt252, 
    }

    #[abi(embed_v0)]
    impl HelloStarknetImpl of super::IHelloStarknet<ContractState> {
        fn increase_balance(ref self: ContractState, amount: felt252) {
            assert(amount != 0, 'Amount cannot be 0');
            self.balance.write(self.balance.read() + amount);
        }

        fn get_balance(self: @ContractState) -> felt252 {
            self.balance.read()
        }
    }
}
`

interface WorkspaceContextType {
  workspaces: WorkspaceType[];
  selectedWorkspace: number;
  selectedCode: string;
  selectedFileName: string;
  compilationResult: string;
  contractAddress: string;
  account: Account | undefined;
  functions: Function | undefined;
  trace: any | undefined;
  setWorkspaces: (workspaces: WorkspaceType[]) => void;
  setSelectedWorkspace: (index: number) => void;
  setSelectedCode: (code: string) => void;
  setSelectedFileName: (fileName: string) => void;
  setCompilationResult: (result: string) => void;
  setContractAddress: (address: string) => void;
  setAccount: (account: Account) => void;
  setFunctions: (functions: Function) => void;
  setTrace: (trace: any) => void;
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
  const [selectedCode, setSelectedCode] = useState<string>(initialCode);
  const [selectedFileName, setSelectedFileName] = useState<string>("Balance");
  const [compilationResult, setCompilationResult] = useState<string>("");
  const [contractAddress, setContractAddress] = useState<string>("");
  const [account, setAccount] = useState<Account>();
  const [functions, setFunctions] = useState<Function>({
    read: [],
    write: [],
  });
  const [trace, setTrace] = useState();

  // useEffect(() => {
  //   if (compilationResult) {
  //     const abi =
  //       JSON.parse(compilationResult).cairo_sierra.sierra_contract_class.abi;

  //     if (abi) {
  //       setFunctions(getFunctions(abi));
  //     }
  //   }
  // }, [compilationResult]);

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
        functions,
        trace,
        setWorkspaces,
        setSelectedWorkspace,
        setSelectedCode,
        setSelectedFileName,
        setCompilationResult,
        setContractAddress,
        setAccount,
        setFunctions,
        setTrace
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