export interface FileItemProps {
  name: string;
  id: number;
  type: "folder" | "file";
  code?: string;
  children?: FileItemProps[];
}

export type Workspace = {
  name: string;
  children: FileItemProps[];
};

export type PreDeployedAccount = {
  address: string;
  initial_balance: string;
  private_key: string;
  public_key: string;
};

export type SimulationParameters = {
  functionName: string;
  calldata: string[];
};
