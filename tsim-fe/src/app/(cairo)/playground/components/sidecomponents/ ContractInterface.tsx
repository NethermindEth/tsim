
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Result, type Contract } from "starknet"
import { useRef, useState } from "react"
import { feltToString } from "@/lib/utils"
import { v4 as uuidv4 } from 'uuid';

export const abi = [
  {
    "type": "function",
    "name": "increase_balance",
    "inputs": [
      {
        "name": "amount",
        "type": "core::felt252"
      }
    ],
    "outputs": [],
    "state_mutability": "external"
  },
  {
    "type": "function",
    "name": "get_balance",
    "inputs": [],
    "outputs": [
      {
        "type": "core::felt252"
      }
    ],
    "state_mutability": "view"
  },
  {
    "type": "function",
    "name": "get_two",
    "inputs": [],
    "outputs": [
      {
        "type": "core::felt252"
      }
    ],
    "state_mutability": "view"
  },
  {
    "type": "impl",
    "name": "Mintable",
    "interface_name": "vesu::test::mock_asset::IMintable"
  },
  {
    "type": "struct",
    "name": "core::integer::u256",
    "members": [
      {
        "name": "low",
        "type": "core::integer::u128"
      },
      {
        "name": "high",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "type": "enum",
    "name": "core::bool",
    "variants": [
      {
        "name": "False",
        "type": "()"
      },
      {
        "name": "True",
        "type": "()"
      }
    ]
  },
  {
    "type": "interface",
    "name": "vesu::test::mock_asset::IMintable",
    "items": [
      {
        "type": "function",
        "name": "mint",
        "inputs": [
          {
            "name": "recipient",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "amount",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "impl",
    "name": "ERC20Impl",
    "interface_name": "vesu::vendor::erc20::IERC20"
  },
  {
    "type": "interface",
    "name": "vesu::vendor::erc20::IERC20",
    "items": [
      {
        "type": "function",
        "name": "total_supply",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "balance_of",
        "inputs": [
          {
            "name": "account",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "allowance",
        "inputs": [
          {
            "name": "owner",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "spender",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "transfer",
        "inputs": [
          {
            "name": "recipient",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "amount",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "transfer_from",
        "inputs": [
          {
            "name": "sender",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "recipient",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "amount",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "approve",
        "inputs": [
          {
            "name": "spender",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "amount",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "impl",
    "name": "ERC20MetadataImpl",
    "interface_name": "vesu::vendor::erc20::IERC20Metadata"
  },
  {
    "type": "interface",
    "name": "vesu::vendor::erc20::IERC20Metadata",
    "items": [
      {
        "type": "function",
        "name": "name",
        "inputs": [],
        "outputs": [
          {
            "type": "core::felt252"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "symbol",
        "inputs": [],
        "outputs": [
          {
            "type": "core::felt252"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "decimals",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u8"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "impl",
    "name": "ERC20CamelOnlyImpl",
    "interface_name": "vesu::vendor::erc20::IERC20CamelOnly"
  },
  {
    "type": "interface",
    "name": "vesu::vendor::erc20::IERC20CamelOnly",
    "items": [
      {
        "type": "function",
        "name": "totalSupply",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "balanceOf",
        "inputs": [
          {
            "name": "account",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "transferFrom",
        "inputs": [
          {
            "name": "sender",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "recipient",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "amount",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "constructor",
    "name": "constructor",
    "inputs": [
      {
        "name": "name",
        "type": "core::felt252"
      },
      {
        "name": "symbol",
        "type": "core::felt252"
      },
      {
        "name": "decimals",
        "type": "core::integer::u8"
      },
      {
        "name": "initial_supply",
        "type": "core::integer::u256"
      },
      {
        "name": "recipient",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "type": "event",
    "name": "vesu::vendor::erc20_component::ERC20Component::Transfer",
    "kind": "struct",
    "members": [
      {
        "name": "from",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "to",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "value",
        "type": "core::integer::u256",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "vesu::vendor::erc20_component::ERC20Component::Approval",
    "kind": "struct",
    "members": [
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "spender",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "value",
        "type": "core::integer::u256",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "vesu::vendor::erc20_component::ERC20Component::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "Transfer",
        "type": "vesu::vendor::erc20_component::ERC20Component::Transfer",
        "kind": "nested"
      },
      {
        "name": "Approval",
        "type": "vesu::vendor::erc20_component::ERC20Component::Approval",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "vesu::test::mock_asset::MockAsset::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "ERC20Event",
        "type": "vesu::vendor::erc20_component::ERC20Component::Event",
        "kind": "flat"
      }
    ]
  }
]

export const ContractInterface = ({ abi_, contract }: { abi_: typeof abi, contract: Contract }) => {
  let [_input, _setInput] = useState<string>("")
  const [_output, _setOutput] = useState<Result>();
  let _inputsRefs =  useRef<HTMLInputElement>(null);
  return (
    <div key={uuidv4()} className="grid w-full items-center gap-8 ">
      <div>
        <h1 className="text-3xl font-bold">Contract Interface</h1>
        <div
          className="flex flex-col space-y-1.5">
          <Label htmlFor="nnn">NNN</Label>
          <Input id="env" placeholder="" itemRef="" ref={_inputsRefs} value={_input} onChange={(e) => _setInput(e.target.value)} />
        </div>
      </div>
      {
        abi_
          .filter((abi) => abi.type == 'interface')
          .map((abi) => abi.items?.map((e, i) => {
            const [output, setOutput] = useState<Result>();
            let inputsRefs = e.inputs.map(() => useRef<HTMLInputElement>(null));
            return (
              <div
                key={i}
                className="flex flex-col space-y-1.5 p-2 gap-4">
                <h2 className="text-lg">{e.name} <span className="text-sm bg-yellow-300 text-black rounded-lg py-0.5 px-2">{e.state_mutability == 'external' ? 'Write' : 'Read'}</span> </h2>
                {
                  e.inputs.map((e_, i_) => {
                    let [input, setInput] = useState<string>("")
                    return (
                      <div
                        key={i_ + e_.name}
                        className="flex flex-col space-y-1.5">
                        <Label htmlFor={e_.name}>{e_.name}</Label>
                        <Input id="env" placeholder="" itemRef="" ref={inputsRefs[i_]} value={input} onChange={(e) => setInput(e.target.value)} />
                      </div>
                    )
                  })
                }
                <Button onClick={async () => {
                  let inputs_ = inputsRefs.map((e) => e.current?.value)
                  //TODO: Handle the arguments correctly and remove the any type
                  const bal1 = await contract.call(e.name, inputs_ as any)
                  console.log(bal1)
                  setOutput(bal1)
                }}>Transact</Button>
                {
                  output &&
                  <div className="flex flex-col space-y-1.5">
                    {e.outputs[0].type == "core::felt252" ? feltToString(output) : output.toString()}
                  </div>
                }
              </div>
            )
          }))

      }
      {
        abi_
          .filter((abi) => abi.type == 'function')
          .map((e, i) => {
            const [output, setOutput] = useState<Result>();
            if (e.inputs == undefined) return null
            let inputsRefs = e.inputs.map(() => useRef<HTMLInputElement>(null));
            return (
              <div
                key={i}
                className="flex flex-col space-y-1.5 p-2 gap-4">
                <h2 className="text-lg">{e.name} <span className="text-sm bg-yellow-300 text-black rounded-lg py-0.5 px-2">{e.state_mutability == 'external' ? 'Write' : 'Read'}</span> </h2>
                {
                  e.inputs.map((e_, i_) => {
                    let [input, setInput] = useState<string>("")
                    return (
                      <div
                        key={i_ + e_.name}
                        className="flex flex-col space-y-1.5">
                        <Label htmlFor={e_.name}>{e_.name}</Label>
                        <Input id="env" placeholder="" itemRef="" ref={inputsRefs[i_]} value={input} onChange={(e) => setInput(e.target.value)} />
                      </div>
                    )
                  })
                }
                <Button onClick={async () => {
                  let inputs_ = inputsRefs.map((e) => e.current?.value)
                  //TODO: Handle the arguments correctly and remove the any type
                  const bal1 = await contract.call(e.name, inputs_ as any)
                  console.log(bal1)
                  setOutput(bal1)
                }}>Transact</Button>
                {
                  output && e.outputs &&
                  <div className="flex flex-col space-y-1.5">
                    {e.outputs[0].type == "core::felt252" ? feltToString(output) : output.toString()}
                  </div>
                }
              </div>
            )
          })
      }
    </div>
  )
}