import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import {
  FileItemProps,
  SimulationParameters,
  Workspace as WorkspaceType,
} from "./types";
import { DEFAULT_WORKSPACE_TREE, DEFAULT_WORKSPACE } from "./constants";
import { Account } from "starknet";
import { type Function } from "../starknet/Simulate";

const initialCode = `#[starknet::interface]
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
`;

interface WorkspaceContextType {
  workspaces: WorkspaceType[];
  selectedWorkspace: number;
  selectedCode: string;
  selectedFileName: string;
  compilationResult: string;
  contractAddress: string;
  account: Account | undefined;
  functions: Function | undefined;
  location: any | undefined;
  trace: any | undefined;
  traceError: string | undefined;
  simulationParameters: SimulationParameters | undefined;
  selectedFileId: number;

  addFile: (type: "folder" | "file") => (name: string) => void;
  saveFile: () => void;
  createNewWorkspace: (name: string) => void;
  deleteWorkspace:()=>void;

  setWorkspaces: (workspaces: WorkspaceType[]) => void;
  setSelectedWorkspace: (index: number) => void;
  setSelectedCode: (code: string) => void;
  setSelectedFileName: (fileName: string) => void;
  setCompilationResult: (result: string) => void;
  setContractAddress: (address: string) => void;
  setAccount: (account: Account) => void;
  setFunctions: (functions: Function) => void;
  setLocation: (location: any) => void;
  setTrace: (trace: any) => void;
  setTraceError: (traceError: string) => void;
  setSimulationParameters: (simulationParameters: SimulationParameters) => void;
  setSelectedFileId: Dispatch<SetStateAction<number>>;
  setSelectedFolder: Dispatch<SetStateAction<number>>;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined
);

export const WorkspaceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {

  //Create a quick deep copy from a pure JSON
  const clone = JSON.parse(JSON.stringify(DEFAULT_WORKSPACE_TREE));

  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([clone]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<number>(0);
  const [nextId, setNextId] = useState<number>(2);
  const [selectedCode, setSelectedCode] = useState<string>(initialCode);
  const [selectedFileName, setSelectedFileName] = useState<string>("Balance");
  const [compilationResult, setCompilationResult] = useState<string>("");
  const [contractAddress, setContractAddress] = useState<string>("");
  const [account, setAccount] = useState<Account>();
  const [functions, setFunctions] = useState<Function>({
    read: [],
    write: [],
  });
  const [location, setLocation] = useState<any>("");
  const [trace, setTrace] = useState();
  const [traceError, setTraceError] = useState("");
  const [simulationParameters, setSimulationParameters] =
    useState<SimulationParameters>();
  const [selectedFileId, setSelectedFileId] = useState<number>(1);
  const [selectedFolder, setSelectedFolder] = useState<number>(0);



  //Recursive functions to update deeply nested array child
  //Update the code for the current file from editor changes
  const updateChild = (id: number, code: string) => (obj: FileItemProps) => {
    if (obj.id === id) {
      obj.code = code;
      return true;
    } else if (obj.children) return obj.children.some(updateChild(id, code));
  };


  //Add a new file/folder in the File Tree
  const addChild =
    (id: number, fileData: FileItemProps) => (obj: FileItemProps) => {
      if (obj.id === id) {
        if (obj.children) obj.children.push(fileData);
        else obj.children = [fileData];
        return true;
      } else if (obj.children) return obj.children.some(addChild(id, fileData));
    };


  //Exported functions to update workspace states
  const addFile = (type: "folder" | "file") => (name: string) => {
    const newWorkspaceChildren = workspaces[selectedWorkspace].children;
    newWorkspaceChildren.some(
      addChild(selectedFolder, { id: nextId, name, type, code: initialCode })
    );
    const newWorkspaces = workspaces.map((workspace, index) => {
      if (index !== selectedWorkspace) return workspace;
      else return { ...workspace, children: newWorkspaceChildren };
    });
    setWorkspaces(newWorkspaces);
    setNextId((prevState) => prevState + 1);
  };

  const saveFile = () => {
    const newWorkspaceChildren = workspaces[selectedWorkspace].children;
    newWorkspaceChildren.some(updateChild(selectedFileId, selectedCode));
    const newWorkspaces = workspaces.map((workspace, index) => {
      if (index !== selectedWorkspace) return workspace;
      else return { ...workspace, children: newWorkspaceChildren };
    });
    setWorkspaces(newWorkspaces);
  };

  const createNewWorkspace = (name: string) => {
    const clone = JSON.parse(JSON.stringify(DEFAULT_WORKSPACE_TREE));
    clone.name = name;
    setWorkspaces((prevState) => {
      const length = prevState.length;
       setSelectedWorkspace(length)
      return [...prevState, clone];
    });
   
  };

  const deleteWorkspace = ()=>{
    setWorkspaces(prevState=>{
      return prevState.filter((workspace,index)=>index!==selectedWorkspace)
    })
    setSelectedWorkspace(0);
  }
  //Update file contents in the file tree on editor changes
  useEffect(() => {
    saveFile();
  }, [selectedCode]);

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
        location,
        trace,
        traceError,
        simulationParameters,
        selectedFileId,
        addFile,
        saveFile,
        createNewWorkspace,
        deleteWorkspace,
        setWorkspaces,
        setSelectedWorkspace,
        setSelectedCode,
        setSelectedFileName,
        setCompilationResult,
        setContractAddress,
        setAccount,
        setFunctions,
        setLocation,
        setTrace,
        setTraceError,
        setSimulationParameters,
        setSelectedFileId,
        setSelectedFolder,
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
