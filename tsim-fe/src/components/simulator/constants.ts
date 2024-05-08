import { FileItemProps, Workspace } from "./types";

export const DEFAULT_WORKSPACE: FileItemProps = {
  name: "contracts",
  type: "folder",
  children: [
    {
      name: "Balance.cairo",
      type: "file",
      code: `
  #[starknet::interface]
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
        `,
    },
  ],
};

export const DEFAULT_WORKSPACE_TREE: Workspace = {
  name: "default_workspace",
  children: [DEFAULT_WORKSPACE],
};

const API_URL = "http://127.0.0.1:8080";
export const COMPILE_CAIRO_CONTRACT_ENDPOINT = `${API_URL}/compile_contract`;
export const COMPILE_CAIRO_ENDPOINT = `${API_URL}/compile`;

export const NETHERMIND_DEVNET_URL =
  "https://starknet-remix-devnet.nethermind.io";
export const PREDEPLOYED_ACCOUNTS_ENDPOINT = `${NETHERMIND_DEVNET_URL}/predeployed_accounts`;
