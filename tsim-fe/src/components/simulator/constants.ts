import { FileItemProps, Workspace } from "./types";

export const DEFAULT_WORKSPACE: FileItemProps = {
  name: "contracts",
  id: 1,
  type: "folder",
  children: [
    {
      id: 0,
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
  children: [{ ...DEFAULT_WORKSPACE }],
};

const API_URL = "http://127.0.0.1:8080";
export const COMPILE_CAIRO_CONTRACT_ENDPOINT = `${API_URL}/compile_contract`;
export const COMPILE_CAIRO_ENDPOINT = `${API_URL}/compile`;
export const TRACE_ERROR_ENDPOINT = `${API_URL}/trace_error`;

export const NETHERMIND_DEVNET_URL =
  "https://starknet-remix-devnet.nethermind.io";
export const PREDEPLOYED_ACCOUNTS_ENDPOINT = `${NETHERMIND_DEVNET_URL}/predeployed_accounts`;

export const TEST_TRACE = {
  type: "INVOKE",
  validate_invocation: {
    contract_address:
      "0x62003875436e2380a26b1b707fac979a5484a57373bba318b99f15e0b9ac71",
    entry_point_selector:
      "0x162da33a4585851fe8d3af3c2a9c60b557814e221e0d4f30ff0b2189d9c7775",
    calldata: [
      "0x2",
      "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
      "0x219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c",
      "0x3",
      "0x2354515660599bf97a21a2de195785ef8f407399ad910b98f8d15683cde193c",
      "0x16345785d8a0000",
      "0x0",
      "0x2354515660599bf97a21a2de195785ef8f407399ad910b98f8d15683cde193c",
      "0x15543c3708653cda9d418b4ccd3be11368e40636c10c44b18cfe756b6d88b29",
      "0x7",
      "0x2349bd4048674537ab7613333dbf8c8a5dd633f87aceb0588eaec24eb62e49b",
      "0x0",
      "0x16345785d8a0000",
      "0x0",
      "0x1",
      "0xbeae6e4ae315f10b38bd51a9",
      "0x0",
    ],
    caller_address: "0x0",
    class_hash:
      "0x29927c8af6bccf3f6fda035981e765a7bdbf18a2dc0d630494f8758aa908e2b",
    entry_point_type: "EXTERNAL",
    call_type: "CALL",
    result: ["0x56414c4944"],
    calls: [],
    events: [],
    messages: [],
    execution_resources: {
      steps: 2124,
      memory_holes: 648,
      range_check_builtin_applications: 40,
      ec_op_builtin_applications: 3,
    },
  },
  execute_invocation: {
    contract_address:
      "0x62003875436e2380a26b1b707fac979a5484a57373bba318b99f15e0b9ac71",
    entry_point_selector:
      "0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad",
    calldata: [
      "0x2",
      "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
      "0x219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c",
      "0x3",
      "0x2354515660599bf97a21a2de195785ef8f407399ad910b98f8d15683cde193c",
      "0x16345785d8a0000",
      "0x0",
      "0x2354515660599bf97a21a2de195785ef8f407399ad910b98f8d15683cde193c",
      "0x15543c3708653cda9d418b4ccd3be11368e40636c10c44b18cfe756b6d88b29",
      "0x7",
      "0x2349bd4048674537ab7613333dbf8c8a5dd633f87aceb0588eaec24eb62e49b",
      "0x0",
      "0x16345785d8a0000",
      "0x0",
      "0x1",
      "0xbeae6e4ae315f10b38bd51a9",
      "0x0",
    ],
    caller_address: "0x0",
    class_hash:
      "0x29927c8af6bccf3f6fda035981e765a7bdbf18a2dc0d630494f8758aa908e2b",
    entry_point_type: "EXTERNAL",
    call_type: "CALL",
    result: [
      "0x2",
      "0x1",
      "0x1",
      "0x6",
      "0x28d2a93d4e4b329",
      "0x0",
      "0x1",
      "0x16345785d8a0000",
      "0x0",
      "0x0",
    ],
    calls: [
      {
        contract_address:
          "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        entry_point_selector:
          "0x219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c",
        calldata: [
          "0x2354515660599bf97a21a2de195785ef8f407399ad910b98f8d15683cde193c",
          "0x16345785d8a0000",
          "0x0",
        ],
        caller_address:
          "0x62003875436e2380a26b1b707fac979a5484a57373bba318b99f15e0b9ac71",
        class_hash:
          "0x7f3777c99f3700505ea966676aac4a0d692c2a9f5e667f4c606b51ca1dd3420",
        entry_point_type: "EXTERNAL",
        call_type: "CALL",
        result: ["0x1"],
        calls: [],
        events: [
          {
            order: 0,
            keys: [
              "0x134692b230b9e1ffa39098904722134159652b09c5bc41d88d6698779d228ff",
            ],
            data: [
              "0x62003875436e2380a26b1b707fac979a5484a57373bba318b99f15e0b9ac71",
              "0x2354515660599bf97a21a2de195785ef8f407399ad910b98f8d15683cde193c",
              "0x16345785d8a0000",
              "0x0",
            ],
          },
        ],
        messages: [],
        execution_resources: {
          steps: 495,
          memory_holes: 11,
          pedersen_builtin_applications: 2,
          range_check_builtin_applications: 14,
        },
      },
      {
        contract_address:
          "0x2354515660599bf97a21a2de195785ef8f407399ad910b98f8d15683cde193c",
        entry_point_selector:
          "0x15543c3708653cda9d418b4ccd3be11368e40636c10c44b18cfe756b6d88b29",
        calldata: [
          "0x2349bd4048674537ab7613333dbf8c8a5dd633f87aceb0588eaec24eb62e49b",
          "0x0",
          "0x16345785d8a0000",
          "0x0",
          "0x1",
          "0xbeae6e4ae315f10b38bd51a9",
          "0x0",
        ],
        caller_address:
          "0x62003875436e2380a26b1b707fac979a5484a57373bba318b99f15e0b9ac71",
        class_hash:
          "0x7f5d65faed62ef4ac0e70dab9f595e4f98c890adb596bba2c11fbba508eda7b",
        entry_point_type: "EXTERNAL",
        call_type: "CALL",
        result: [
          "0x28d2a93d4e4b329",
          "0x0",
          "0x1",
          "0x16345785d8a0000",
          "0x0",
          "0x0",
        ],
        calls: [
          {
            contract_address:
              "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
            entry_point_selector:
              "0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e",
            calldata: [
              "0x62003875436e2380a26b1b707fac979a5484a57373bba318b99f15e0b9ac71",
              "0x28d2a93d4e4b329",
              "0x0",
            ],
            caller_address:
              "0x2354515660599bf97a21a2de195785ef8f407399ad910b98f8d15683cde193c",
            class_hash:
              "0x4ad3c1dc8413453db314497945b6903e1c766495a1e60492d44da9c2a986e4b",
            entry_point_type: "EXTERNAL",
            call_type: "CALL",
            result: ["0x1"],
            calls: [],
            events: [
              {
                order: 1,
                keys: [
                  "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9",
                ],
                data: [
                  "0x2354515660599bf97a21a2de195785ef8f407399ad910b98f8d15683cde193c",
                  "0x62003875436e2380a26b1b707fac979a5484a57373bba318b99f15e0b9ac71",
                  "0x28d2a93d4e4b329",
                  "0x0",
                ],
              },
            ],
            messages: [],
            execution_resources: {
              steps: 1178,
              memory_holes: 23,
              pedersen_builtin_applications: 4,
              range_check_builtin_applications: 37,
            },
          },
          {
            contract_address:
              "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
            entry_point_selector:
              "0x41b033f4a31df8067c24d1e9b550a2ce75fd4a29e1147af9752174f0e6cb20",
            calldata: [
              "0x62003875436e2380a26b1b707fac979a5484a57373bba318b99f15e0b9ac71",
              "0x2354515660599bf97a21a2de195785ef8f407399ad910b98f8d15683cde193c",
              "0x16345785d8a0000",
              "0x0",
            ],
            caller_address:
              "0x2354515660599bf97a21a2de195785ef8f407399ad910b98f8d15683cde193c",
            class_hash:
              "0x7f3777c99f3700505ea966676aac4a0d692c2a9f5e667f4c606b51ca1dd3420",
            entry_point_type: "EXTERNAL",
            call_type: "CALL",
            result: ["0x1"],
            calls: [],
            events: [
              {
                order: 2,
                keys: [
                  "0x134692b230b9e1ffa39098904722134159652b09c5bc41d88d6698779d228ff",
                ],
                data: [
                  "0x62003875436e2380a26b1b707fac979a5484a57373bba318b99f15e0b9ac71",
                  "0x2354515660599bf97a21a2de195785ef8f407399ad910b98f8d15683cde193c",
                  "0x0",
                  "0x0",
                ],
              },
              {
                order: 3,
                keys: [
                  "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9",
                ],
                data: [
                  "0x62003875436e2380a26b1b707fac979a5484a57373bba318b99f15e0b9ac71",
                  "0x2354515660599bf97a21a2de195785ef8f407399ad910b98f8d15683cde193c",
                  "0x16345785d8a0000",
                  "0x0",
                ],
              },
            ],
            messages: [],
            execution_resources: {
              steps: 1819,
              memory_holes: 48,
              pedersen_builtin_applications: 8,
              range_check_builtin_applications: 55,
            },
          },
        ],
        events: [
          {
            order: 4,
            keys: [
              "0xe316f0d9d2a3affa97de1d99bb2aac0538e2666d0d8545545ead241ef0ccab",
            ],
            data: [
              "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
              "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
              "0x1f4",
              "0xa",
              "0x62003875436e2380a26b1b707fac979a5484a57373bba318b99f15e0b9ac71",
              "0x62003875436e2380a26b1b707fac979a5484a57373bba318b99f15e0b9ac71",
              "0x28d2a93d4e4b329",
              "0x0",
              "0x1",
              "0x16345785d8a0000",
              "0x0",
              "0x0",
              "0xbdf4dbfbd37d6c9ecfa8f00e",
              "0x0",
              "0x945c818d49feb411",
              "0xd7298",
            ],
          },
        ],
        messages: [],
        execution_resources: {
          steps: 37603,
          memory_holes: 15859,
          pedersen_builtin_applications: 41,
          range_check_builtin_applications: 3356,
          bitwise_builtin_applications: 41,
        },
      },
    ],
    events: [
      {
        order: 5,
        keys: [
          "0x1dcde06aabdbca2f80aa51392b345d7549d7757aa855f7e37f5d335ac8243b1",
          "0x10e952cb899e8edaf863db3802a7cbc3eddfed055918282be70a89909e3c486",
        ],
        data: [
          "0x2",
          "0x1",
          "0x1",
          "0x6",
          "0x28d2a93d4e4b329",
          "0x0",
          "0x1",
          "0x16345785d8a0000",
          "0x0",
          "0x0",
        ],
      },
    ],
    messages: [],
    execution_resources: {
      steps: 42138,
      memory_holes: 15878,
      pedersen_builtin_applications: 43,
      range_check_builtin_applications: 3463,
      bitwise_builtin_applications: 41,
    },
  },
  fee_transfer_invocation: {
    contract_address:
      "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    entry_point_selector:
      "0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e",
    calldata: [
      "0x1176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8",
      "0xdafeafb39b29",
      "0x0",
    ],
    caller_address:
      "0x62003875436e2380a26b1b707fac979a5484a57373bba318b99f15e0b9ac71",
    class_hash:
      "0x7f3777c99f3700505ea966676aac4a0d692c2a9f5e667f4c606b51ca1dd3420",
    entry_point_type: "EXTERNAL",
    call_type: "CALL",
    result: ["0x1"],
    calls: [],
    events: [
      {
        order: 0,
        keys: [
          "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9",
        ],
        data: [
          "0x62003875436e2380a26b1b707fac979a5484a57373bba318b99f15e0b9ac71",
          "0x1176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8",
          "0xdafeafb39b29",
          "0x0",
        ],
      },
    ],
    messages: [],
    execution_resources: {
      steps: 1178,
      memory_holes: 23,
      pedersen_builtin_applications: 4,
      range_check_builtin_applications: 37,
    },
  },
  state_diff: {
    storage_diffs: [
      {
        address:
          "0x2354515660599bf97a21a2de195785ef8f407399ad910b98f8d15683cde193c",
        storage_entries: [
          {
            key: "0x29059914eca156f20d1b5d308c16eea178af7eede234c9dc76029429ab08922",
            value: "0x9116076be458e2955a2194730012948ed86a159f1928821fe240a2da",
          },
          {
            key: "0x317b985eb81e4f9e99c3a06fd68d6bfde665d2338c4816c580b8c08a3cabe94",
            value:
              "0x663f0c210001c67d8cd33100000000000000000084c87f0d9cf9ebe9a89eca",
          },
          {
            key: "0x7af9bb230a679203447ba567b3fa5508b7dbd5699a16594fa9a659153317560",
            value: "0x945c818d49feb411",
          },
          {
            key: "0x6334ca90543c947b4a2e638ca3d27b824f5ed232db957164b0a56e679f91637",
            value: "0x2a",
          },
          {
            key: "0x7d244746511197d6f863b2853ae144757728106dee50151c5955c324b6b6035",
            value: "0x1265f47dbd57ee6194b409796e60e7",
          },
          {
            key: "0x7d244746511197d6f863b2853ae144757728106dee50151c5955c324b6b6034",
            value: "0x3a599c47fb76e23e6bd47ef8649862",
          },
        ],
      },
      {
        address:
          "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
        storage_entries: [
          {
            key: "0x1e931a6bd70b4f43076804cecfb5938d7f1512c8e72d72911d321e3875f0402",
            value: "0x1e28baf3f5b0bcc28",
          },
          {
            key: "0x778094a9625318af29eea44eb3063130dc540bdbb2edf41803a9956dc961cbe",
            value: "0x28d2a93d4e4b329",
          },
        ],
      },
      {
        address:
          "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        storage_entries: [
          {
            key: "0x5496768776e3db30053404f18067d81a6e06f5a2b0de326e21298fd9d569a9a",
            value: "0xa666b6b7f3fe8e8f0",
          },
          {
            key: "0x1e931a6bd70b4f43076804cecfb5938d7f1512c8e72d72911d321e3875f0402",
            value: "0x2ad758ea389e71ce",
          },
          {
            key: "0x778094a9625318af29eea44eb3063130dc540bdbb2edf41803a9956dc961cbe",
            value: "0xb1626c191cf6eaa",
          },
        ],
      },
    ],
    nonces: [
      {
        contract_address:
          "0x62003875436e2380a26b1b707fac979a5484a57373bba318b99f15e0b9ac71",
        nonce: "0xa",
      },
    ],
    deployed_contracts: [],
    deprecated_declared_classes: [],
    declared_classes: [],
    replaced_classes: [],
  },
  execution_resources: {
    steps: 45440,
    memory_holes: 16549,
    pedersen_builtin_applications: 47,
    range_check_builtin_applications: 3540,
    bitwise_builtin_applications: 41,
    ec_op_builtin_applications: 3,
    data_availability: {
      l1_gas: 0,
      l1_data_gas: 832,
    },
  },
};
