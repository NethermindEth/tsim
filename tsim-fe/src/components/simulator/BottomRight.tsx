"use client";
import { useState, useEffect } from "react";
import { useWorkspace } from "./Context";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "../badge";

export default function BottomRight() {
  const [activeTab, setActiveTab] = useState("sierra");
  const [sierra, setSierra] = useState("");
  const [casm, setCasm] = useState("");
  const [simulation, setSimulation] = useState("");
  const { compilationResult } = useWorkspace();

  useEffect(() => {
    if (!compilationResult) {
      console.log("No compilation result available.");
      return;
    }

    try {
      const jsonCompilationResult = JSON.parse(compilationResult);
      if (jsonCompilationResult) {
        if (jsonCompilationResult) {
          setSierra(
            JSON.stringify(
              jsonCompilationResult.cairo_sierra.sierra_contract_class,
              null,
              4
            )
          );
          setCasm(
            JSON.stringify(
              jsonCompilationResult.casm_sierra.casm_contract_class,
              null,
              4
            )
          );
        }
      }
    } catch (error) {
      console.error("Error parsing compilation result:", error);
      setSierra("");
      setCasm("");
    }
  }, [compilationResult]);

  return (
    <div className="p-2">
      <Tabs defaultValue="bottom-right" className="w-[800px] justify-between">
        <TabsList className="">
          <TabsTrigger value="sierra">Sierra</TabsTrigger>
          <TabsTrigger value="casm">CASM</TabsTrigger>
          <TabsTrigger value="simulation">Simulation</TabsTrigger>
        </TabsList>
        <TabsContent value="sierra">
          <Editor
            height={200}
            language="json"
            theme="vs-dark"
            value={sierra}
            options={{
              readOnly: true,
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              scrollbar: {
                horizontal: "hidden",
              },
            }}
          />
        </TabsContent>
        <TabsContent value="casm">
          <Editor
            height={200}
            language="json"
            theme="vs-dark"
            value={casm}
            options={{
              readOnly: true,
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              scrollbar: {
                horizontal: "hidden",
              },
            }}
          />
        </TabsContent>
        <TabsContent value="simulation">
          <div>

            <p>Simulation content...</p>
            <Simulation trace={demoTrace} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const anotherTrace = [
  {
    "to": {
      "value": "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      "type": "core::starknet::contract_address::ContractAddress"
    },
    "selector": {
      "value": "0x0219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c",
      "type": "core::felt252"
    },
    "calldata": {
      "value": [
        "0x04068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
        "0x0821ab0d4414980000",
        "0x00"
      ],
      "type": "core::array::Array::<core::felt252>"
    }
  },
  {
    "to": {
      "value": "0x04068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
      "type": "core::starknet::contract_address::ContractAddress"
    },
    "selector": {
      "value": "0x01171593aa5bdadda4d6b0efde6cc94ee7649c3163d5efeb19da6c16d63a2a63",
      "type": "core::felt252"
    },
    "calldata": {
      "value": [
        "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
        "0x0821ab0d4414980000",
        "0x00",
        "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
        "0x08298754455be60000",
        "0x00",
        "0x08225cb000435d0000",
        "0x00",
        "0xa9651e29b175aa3da6b2a3f1ab37381f977aeb77ef8a107e2dd7d69bf44921",
        "0x00",
        "0x00",
        "0x02",
        "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
        "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
        "0x05dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
        "0x64",
        "0x06",
        "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
        "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
        "0x20c49ba5e353f80000000000000000",
        "0x03e8",
        "0x00",
        "0x0116d1842aa10000c91959c7be",
        "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
        "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
        "0x049ff5b3a7d38e2b50198f408fa8281635b5bc81ee49ab87ac36c8324c214427",
        "0x64",
        "0x01",
        "0x07ae43abf704f4981094a4f3457d1abe6b176844f6cdfbb39c0544a635ef56b0"
      ],
      "type": "core::array::Array::<core::felt252>"
    }
  }
]

const demoTrace = {
  "contractAddress": "0x7c515fd06ceb17303e51402a2b88da6f2e903ca3cca00300744a434563ed230",
  "functionName": "__execute__",
  "inputs": [
    {
      "name": "calls",
      "type": "core::array::Array::<core::starknet::account::Call>",
      "value": [
        [
          {
            "name": "to",
            "type": "core::starknet::contract_address::ContractAddress",
            "value": [
              "0x7b891037fa97b0fd1796dae441fe8f550d3ee31503bd7936b0a8120b95ad454"
            ]
          },
          {
            "name": "selector",
            "type": "core::felt252",
            "value": [
              "0x362398bec32bc0ebb411203221a35a0301193a96f317ebe5e40be9f60d15320"
            ]
          },
          {
            "name": "calldata",
            "type": "core::array::Array::<core::felt252>",
            "value": [
              "0x1"
            ]
          }
        ]
      ]
    }
  ],
  "outputs": [
    {
      "type": "core::array::Array::<core::array::Span::<core::felt252>>",
      "value": [
        [
          {
            "name": "snapshot",
            "type": "@core::array::Array::<core::felt252>",
            "value": [
              "0x7b891037fa97b0fd1796dae441fe8f550d3ee31503bd7936b0a8120b95ad454"
            ]
          }
        ]
      ]
    }
  ],
  "internal_calls": [
    {
      "contractAddress": "0x7b891037fa97b0fd1796dae441fe8f550d3ee31503bd7936b0a8120b95ad454",
      "functionName": "increase_balance",
      "inputs": [
        {
          "name": "amount",
          "type": "core::felt252",
          "value": [
            "0x1"
          ]
        }
      ],
      "outputs": [],
      "internal_calls": []
    }
  ]
}


export const Simulation = ({ trace }: { trace: typeof demoTrace }) => {
  return (
    trace.internal_calls.map((call) => {
      return (
        <div>
          <p>Contract: {call.contractAddress}</p>
          <h2>Function: <Badge color="indigo" ><span className=" text-lg">{call.functionName}</span></Badge></h2>
          <p>Inputs:
          </p>
          {
            call.inputs.map((input) => {
              return (<div>
                <p>{input.name}: {input.value}</p>
              </div>)
            })
          }

          <div>
            {
              call.internal_calls && call.internal_calls.map(
                (call) => <div>{call}</div>
              )
            }
          </div>
        </div>
      );
    })
  )
}