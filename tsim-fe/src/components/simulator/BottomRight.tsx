"use client";
import { useState, useEffect } from "react";
import { useWorkspace } from "./Context";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge, BadgeButton } from "../badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



export default function BottomRight() {
  const [activeTab, setActiveTab] = useState("sierra");
  const [sierra, setSierra] = useState("");
  const [casm, setCasm] = useState("");
  const [simulation, setSimulation] = useState("");
  const { compilationResult, trace } = useWorkspace();

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
      <Tabs defaultValue="bottom-right" className=" justify-between">
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
            {/* <Table>
              <TableCaption>The trace of your transaction</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Contract</TableHead>
                  <TableHead>Function</TableHead>
                  <TableHead className="text-right">More Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  trace && <SimVis traces={trace} />
                }
              </TableBody>
            </Table> */}
            <SimulateTraceTable traces={demoTrace} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export const SimVis = ({ traces }: { traces: Trace[] | Trace }) => {
  if (Array.isArray(traces)) {
    traces.map((trace) => {
      return (
        <SimVis traces={trace} />
      )
    })
  } else {
    return (
      <>
        <TableRow>
          <TableCell>{traces.contractAddress.slice(5)}</TableCell>
          <Badge color="purple" className="p-2">
            <TableCell className="text-base">{traces.functionName}</TableCell>
          </Badge>
          <TableCell>More Details</TableCell>
        </TableRow>
        {Array.isArray(traces.internal_calls) ? traces.internal_calls.map((call) => {
          return (
            <SimVis traces={call} />
          )
        }) : <SimVis traces={traces.internal_calls} />
        }
      </>
    )
  }
}




type Value = string[] | {
  name: string;
  type: string;
  value: Value;
}

export type Trace = {
  contractAddress: string;
  functionName: string;
  inputs: Value[];
  outputs: Value[];
  internal_calls: Trace[] | Trace;
}




const demoTrace = {
  "type": "INVOKE",
  "validate_invocation": {
    "contract_address": "0xa9651e29b175aa3da6b2a3f1ab37381f977aeb77ef8a107e2dd7d69bf44921",
    "entry_point_selector": "0x162da33a4585851fe8d3af3c2a9c60b557814e221e0d4f30ff0b2189d9c7775",
    "calldata": [
      "0x2",
      "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      "0x219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c",
      "0x3",
      "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
      "0x821ab0d4414980000",
      "0x0",
      "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
      "0x1171593aa5bdadda4d6b0efde6cc94ee7649c3163d5efeb19da6c16d63a2a63",
      "0x1d",
      "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      "0x821ab0d4414980000",
      "0x0",
      "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      "0x8298754455be60000",
      "0x0",
      "0x8225cb000435d0000",
      "0x0",
      "0xa9651e29b175aa3da6b2a3f1ab37381f977aeb77ef8a107e2dd7d69bf44921",
      "0x0",
      "0x0",
      "0x2",
      "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
      "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
      "0x64",
      "0x6",
      "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
      "0x20c49ba5e353f80000000000000000",
      "0x3e8",
      "0x0",
      "0x116d1842aa10000c91959c7be",
      "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
      "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      "0x49ff5b3a7d38e2b50198f408fa8281635b5bc81ee49ab87ac36c8324c214427",
      "0x64",
      "0x1",
      "0x7ae43abf704f4981094a4f3457d1abe6b176844f6cdfbb39c0544a635ef56b0"
    ],
    "caller_address": "0x0",
    "class_hash": "0x29927c8af6bccf3f6fda035981e765a7bdbf18a2dc0d630494f8758aa908e2b",
    "entry_point_type": "EXTERNAL",
    "call_type": "CALL",
    "result": [
      "0x56414c4944"
    ],
    "calls": [],
    "events": [],
    "messages": [],
    "execution_resources": {
      "steps": 3093,
      "memory_holes": 705,
      "range_check_builtin_applications": 62,
      "ec_op_builtin_applications": 3
    }
  },
  "execute_invocation": {
    "contract_address": "0xa9651e29b175aa3da6b2a3f1ab37381f977aeb77ef8a107e2dd7d69bf44921",
    "entry_point_selector": "0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad",
    "calldata": [
      "0x2",
      "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      "0x219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c",
      "0x3",
      "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
      "0x821ab0d4414980000",
      "0x0",
      "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
      "0x1171593aa5bdadda4d6b0efde6cc94ee7649c3163d5efeb19da6c16d63a2a63",
      "0x1d",
      "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      "0x821ab0d4414980000",
      "0x0",
      "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      "0x8298754455be60000",
      "0x0",
      "0x8225cb000435d0000",
      "0x0",
      "0xa9651e29b175aa3da6b2a3f1ab37381f977aeb77ef8a107e2dd7d69bf44921",
      "0x0",
      "0x0",
      "0x2",
      "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
      "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
      "0x64",
      "0x6",
      "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
      "0x20c49ba5e353f80000000000000000",
      "0x3e8",
      "0x0",
      "0x116d1842aa10000c91959c7be",
      "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
      "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      "0x49ff5b3a7d38e2b50198f408fa8281635b5bc81ee49ab87ac36c8324c214427",
      "0x64",
      "0x1",
      "0x7ae43abf704f4981094a4f3457d1abe6b176844f6cdfbb39c0544a635ef56b0"
    ],
    "caller_address": "0x0",
    "class_hash": "0x29927c8af6bccf3f6fda035981e765a7bdbf18a2dc0d630494f8758aa908e2b",
    "entry_point_type": "EXTERNAL",
    "call_type": "CALL",
    "result": [
      "0x2",
      "0x1",
      "0x1",
      "0x1",
      "0x1"
    ],
    "calls": [
      {
        "contract_address": "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
        "entry_point_selector": "0x219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c",
        "calldata": [
          "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
          "0x821ab0d4414980000",
          "0x0"
        ],
        "caller_address": "0xa9651e29b175aa3da6b2a3f1ab37381f977aeb77ef8a107e2dd7d69bf44921",
        "class_hash": "0x4ad3c1dc8413453db314497945b6903e1c766495a1e60492d44da9c2a986e4b",
        "entry_point_type": "EXTERNAL",
        "call_type": "CALL",
        "result": [
          "0x1"
        ],
        "calls": [],
        "events": [
          {
            "order": 0,
            "keys": [
              "0x134692b230b9e1ffa39098904722134159652b09c5bc41d88d6698779d228ff"
            ],
            "data": [
              "0xa9651e29b175aa3da6b2a3f1ab37381f977aeb77ef8a107e2dd7d69bf44921",
              "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
              "0x821ab0d4414980000",
              "0x0"
            ]
          }
        ],
        "messages": [],
        "execution_resources": {
          "steps": 495,
          "memory_holes": 11,
          "pedersen_builtin_applications": 2,
          "range_check_builtin_applications": 14
        }
      },
      {
        "contract_address": "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
        "entry_point_selector": "0x1171593aa5bdadda4d6b0efde6cc94ee7649c3163d5efeb19da6c16d63a2a63",
        "calldata": [
          "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
          "0x821ab0d4414980000",
          "0x0",
          "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
          "0x8298754455be60000",
          "0x0",
          "0x8225cb000435d0000",
          "0x0",
          "0xa9651e29b175aa3da6b2a3f1ab37381f977aeb77ef8a107e2dd7d69bf44921",
          "0x0",
          "0x0",
          "0x2",
          "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
          "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
          "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
          "0x64",
          "0x6",
          "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
          "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
          "0x20c49ba5e353f80000000000000000",
          "0x3e8",
          "0x0",
          "0x116d1842aa10000c91959c7be",
          "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
          "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
          "0x49ff5b3a7d38e2b50198f408fa8281635b5bc81ee49ab87ac36c8324c214427",
          "0x64",
          "0x1",
          "0x7ae43abf704f4981094a4f3457d1abe6b176844f6cdfbb39c0544a635ef56b0"
        ],
        "caller_address": "0xa9651e29b175aa3da6b2a3f1ab37381f977aeb77ef8a107e2dd7d69bf44921",
        "class_hash": "0x5b9f8d0d8f1794053114f4180d1c4dd98a7a1dd1721a850edea299a7e2397b9",
        "entry_point_type": "EXTERNAL",
        "call_type": "CALL",
        "result": [
          "0x1"
        ],
        "calls": [
          {
            "contract_address": "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
            "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
            "calldata": [
              "0xa9651e29b175aa3da6b2a3f1ab37381f977aeb77ef8a107e2dd7d69bf44921"
            ],
            "caller_address": "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
            "class_hash": "0x4ad3c1dc8413453db314497945b6903e1c766495a1e60492d44da9c2a986e4b",
            "entry_point_type": "EXTERNAL",
            "call_type": "CALL",
            "result": [
              "0x83324394b541b5253",
              "0x0"
            ],
            "calls": [],
            "events": [],
            "messages": [],
            "execution_resources": {
              "steps": 263,
              "pedersen_builtin_applications": 1,
              "range_check_builtin_applications": 12
            }
          },
          {
            "contract_address": "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
            "entry_point_selector": "0x41b033f4a31df8067c24d1e9b550a2ce75fd4a29e1147af9752174f0e6cb20",
            "calldata": [
              "0xa9651e29b175aa3da6b2a3f1ab37381f977aeb77ef8a107e2dd7d69bf44921",
              "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
              "0x821ab0d4414980000",
              "0x0"
            ],
            "caller_address": "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
            "class_hash": "0x4ad3c1dc8413453db314497945b6903e1c766495a1e60492d44da9c2a986e4b",
            "entry_point_type": "EXTERNAL",
            "call_type": "CALL",
            "result": [
              "0x1"
            ],
            "calls": [],
            "events": [
              {
                "order": 1,
                "keys": [
                  "0x134692b230b9e1ffa39098904722134159652b09c5bc41d88d6698779d228ff"
                ],
                "data": [
                  "0xa9651e29b175aa3da6b2a3f1ab37381f977aeb77ef8a107e2dd7d69bf44921",
                  "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                  "0x0",
                  "0x0"
                ]
              },
              {
                "order": 2,
                "keys": [
                  "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9"
                ],
                "data": [
                  "0xa9651e29b175aa3da6b2a3f1ab37381f977aeb77ef8a107e2dd7d69bf44921",
                  "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                  "0x821ab0d4414980000",
                  "0x0"
                ]
              }
            ],
            "messages": [],
            "execution_resources": {
              "steps": 1819,
              "memory_holes": 48,
              "pedersen_builtin_applications": 8,
              "range_check_builtin_applications": 55
            }
          },
          {
            "contract_address": "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
            "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
            "calldata": [
              "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682"
            ],
            "caller_address": "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
            "class_hash": "0x4ad3c1dc8413453db314497945b6903e1c766495a1e60492d44da9c2a986e4b",
            "entry_point_type": "EXTERNAL",
            "call_type": "CALL",
            "result": [
              "0x821ab0d4414980000",
              "0x0"
            ],
            "calls": [],
            "events": [],
            "messages": [],
            "execution_resources": {
              "steps": 263,
              "pedersen_builtin_applications": 1,
              "range_check_builtin_applications": 12
            }
          },
          {
            "contract_address": "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
            "entry_point_selector": "0x15543c3708653cda9d418b4ccd3be11368e40636c10c44b18cfe756b6d88b29",
            "calldata": [
              "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
              "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
              "0x821ab0d4414980000",
              "0x0",
              "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
              "0x0",
              "0x0",
              "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
              "0x6",
              "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
              "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
              "0x20c49ba5e353f80000000000000000",
              "0x3e8",
              "0x0",
              "0x116d1842aa10000c91959c7be"
            ],
            "caller_address": "0xa9651e29b175aa3da6b2a3f1ab37381f977aeb77ef8a107e2dd7d69bf44921",
            "class_hash": "0x6844145a2a7e4cf07eb49923f2565cb7700601bfcc8140a2685d886da6e7e20",
            "entry_point_type": "EXTERNAL",
            "call_type": "DELEGATE",
            "result": [],
            "calls": [
              {
                "contract_address": "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
                "entry_point_selector": "0x168652c307c1e813ca11cfb3a601f1cf3b22452021a5052d8b05f1f1f8a3e92",
                "calldata": [
                  "0xd",
                  "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
                  "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                  "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
                  "0x821ab0d4414980000",
                  "0x0",
                  "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
                  "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
                  "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
                  "0x20c49ba5e353f80000000000000000",
                  "0x3e8",
                  "0x0",
                  "0x116d1842aa10000c91959c7be",
                  "0x0"
                ],
                "caller_address": "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                "class_hash": "0x3e8d67c8817de7a2185d418e88d321c89772a9722b752c6fe097192114621be",
                "entry_point_type": "EXTERNAL",
                "call_type": "CALL",
                "result": [
                  "0x0"
                ],
                "calls": [
                  {
                    "contract_address": "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                    "entry_point_selector": "0x399c6d7581cbb37d2e578d3097bfdd3323e05447f1fd7670b6c3a3fb9d9ff79",
                    "calldata": [
                      "0x0",
                      "0xd",
                      "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
                      "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                      "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
                      "0x821ab0d4414980000",
                      "0x0",
                      "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
                      "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
                      "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
                      "0x20c49ba5e353f80000000000000000",
                      "0x3e8",
                      "0x0",
                      "0x116d1842aa10000c91959c7be",
                      "0x0"
                    ],
                    "caller_address": "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
                    "class_hash": "0x5b9f8d0d8f1794053114f4180d1c4dd98a7a1dd1721a850edea299a7e2397b9",
                    "entry_point_type": "EXTERNAL",
                    "call_type": "CALL",
                    "result": [
                      "0x0"
                    ],
                    "calls": [
                      {
                        "contract_address": "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                        "entry_point_selector": "0x25ef2564dc27d90f0cd3ffbe419481249901a2c185139533c6cded38ae979b3",
                        "calldata": [
                          "0xd",
                          "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
                          "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                          "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
                          "0x821ab0d4414980000",
                          "0x0",
                          "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
                          "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
                          "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
                          "0x20c49ba5e353f80000000000000000",
                          "0x3e8",
                          "0x0",
                          "0x116d1842aa10000c91959c7be",
                          "0x0"
                        ],
                        "caller_address": "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
                        "class_hash": "0x6844145a2a7e4cf07eb49923f2565cb7700601bfcc8140a2685d886da6e7e20",
                        "entry_point_type": "EXTERNAL",
                        "call_type": "DELEGATE",
                        "result": [],
                        "calls": [
                          {
                            "contract_address": "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
                            "entry_point_selector": "0x63ecb4395e589622a41a66715a0eac930abc9f0b92c0b1dcda630adfb2bf2d",
                            "calldata": [
                              "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
                              "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
                              "0x20c49ba5e353f80000000000000000",
                              "0x3e8",
                              "0x0"
                            ],
                            "caller_address": "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                            "class_hash": "0x3e8d67c8817de7a2185d418e88d321c89772a9722b752c6fe097192114621be",
                            "entry_point_type": "EXTERNAL",
                            "call_type": "CALL",
                            "result": [
                              "0x1332407aa9cb5f67ad649b7a4508",
                              "0x0",
                              "0x1a1816c",
                              "0x1"
                            ],
                            "calls": [],
                            "events": [],
                            "messages": [],
                            "execution_resources": {
                              "steps": 352,
                              "memory_holes": 3,
                              "pedersen_builtin_applications": 5,
                              "range_check_builtin_applications": 41
                            }
                          },
                          {
                            "contract_address": "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
                            "entry_point_selector": "0x15543c3708653cda9d418b4ccd3be11368e40636c10c44b18cfe756b6d88b29",
                            "calldata": [
                              "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
                              "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
                              "0x20c49ba5e353f80000000000000000",
                              "0x3e8",
                              "0x0",
                              "0x821ab0d4414980000",
                              "0x0",
                              "0x0",
                              "0x133129a925a0be67ac9b82207d4a",
                              "0x0",
                              "0x64"
                            ],
                            "caller_address": "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                            "class_hash": "0x3e8d67c8817de7a2185d418e88d321c89772a9722b752c6fe097192114621be",
                            "entry_point_type": "EXTERNAL",
                            "call_type": "CALL",
                            "result": [
                              "0x821ab0d4414980000",
                              "0x0",
                              "0xbb2d8ba",
                              "0x1"
                            ],
                            "calls": [],
                            "events": [
                              {
                                "order": 3,
                                "keys": [
                                  "0x157717768aca88da4ac4279765f09f4d0151823d573537fbbeb950cdbd9a870"
                                ],
                                "data": [
                                  "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                                  "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
                                  "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
                                  "0x20c49ba5e353f80000000000000000",
                                  "0x3e8",
                                  "0x0",
                                  "0x821ab0d4414980000",
                                  "0x0",
                                  "0x0",
                                  "0x133129a925a0be67ac9b82207d4a",
                                  "0x0",
                                  "0x64",
                                  "0x821ab0d4414980000",
                                  "0x0",
                                  "0xbb2d8ba",
                                  "0x1",
                                  "0x1332160d7cf251c4fddf7909d4b4",
                                  "0x0",
                                  "0x1a181b0",
                                  "0x1",
                                  "0x4696d0250610e532"
                                ]
                              }
                            ],
                            "messages": [],
                            "execution_resources": {
                              "steps": 10854,
                              "memory_holes": 3393,
                              "pedersen_builtin_applications": 23,
                              "range_check_builtin_applications": 1675,
                              "bitwise_builtin_applications": 29
                            }
                          },
                          {
                            "contract_address": "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
                            "entry_point_selector": "0x219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c",
                            "calldata": [
                              "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
                              "0x821ab0d4414980000",
                              "0x0"
                            ],
                            "caller_address": "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                            "class_hash": "0x4ad3c1dc8413453db314497945b6903e1c766495a1e60492d44da9c2a986e4b",
                            "entry_point_type": "EXTERNAL",
                            "call_type": "CALL",
                            "result": [
                              "0x1"
                            ],
                            "calls": [],
                            "events": [
                              {
                                "order": 4,
                                "keys": [
                                  "0x134692b230b9e1ffa39098904722134159652b09c5bc41d88d6698779d228ff"
                                ],
                                "data": [
                                  "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                                  "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
                                  "0x821ab0d4414980000",
                                  "0x0"
                                ]
                              }
                            ],
                            "messages": [],
                            "execution_resources": {
                              "steps": 495,
                              "memory_holes": 11,
                              "pedersen_builtin_applications": 2,
                              "range_check_builtin_applications": 14
                            }
                          },
                          {
                            "contract_address": "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
                            "entry_point_selector": "0x1c756803e4eb4ccfb136b73d5f72e3dc0d452d30ae1f4bc82af394c73ce7115",
                            "calldata": [
                              "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d"
                            ],
                            "caller_address": "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                            "class_hash": "0x3e8d67c8817de7a2185d418e88d321c89772a9722b752c6fe097192114621be",
                            "entry_point_type": "EXTERNAL",
                            "call_type": "CALL",
                            "result": [],
                            "calls": [
                              {
                                "contract_address": "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
                                "entry_point_selector": "0x1e888a1026b19c8c0b57c72d63ed1737106aa10034105b980ba117bd0c29fe1",
                                "calldata": [
                                  "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                                  "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b"
                                ],
                                "caller_address": "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
                                "class_hash": "0x4ad3c1dc8413453db314497945b6903e1c766495a1e60492d44da9c2a986e4b",
                                "entry_point_type": "EXTERNAL",
                                "call_type": "CALL",
                                "result": [
                                  "0x821ab0d4414980000",
                                  "0x0"
                                ],
                                "calls": [],
                                "events": [],
                                "messages": [],
                                "execution_resources": {
                                  "steps": 298,
                                  "memory_holes": 12,
                                  "pedersen_builtin_applications": 2,
                                  "range_check_builtin_applications": 15
                                }
                              },
                              {
                                "contract_address": "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
                                "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                "calldata": [
                                  "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b"
                                ],
                                "caller_address": "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
                                "class_hash": "0x4ad3c1dc8413453db314497945b6903e1c766495a1e60492d44da9c2a986e4b",
                                "entry_point_type": "EXTERNAL",
                                "call_type": "CALL",
                                "result": [
                                  "0x9ce3cd9b69d2700debdaa",
                                  "0x0"
                                ],
                                "calls": [],
                                "events": [],
                                "messages": [],
                                "execution_resources": {
                                  "steps": 263,
                                  "pedersen_builtin_applications": 1,
                                  "range_check_builtin_applications": 12
                                }
                              },
                              {
                                "contract_address": "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
                                "entry_point_selector": "0x41b033f4a31df8067c24d1e9b550a2ce75fd4a29e1147af9752174f0e6cb20",
                                "calldata": [
                                  "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                                  "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
                                  "0x821ab0d4414980000",
                                  "0x0"
                                ],
                                "caller_address": "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
                                "class_hash": "0x4ad3c1dc8413453db314497945b6903e1c766495a1e60492d44da9c2a986e4b",
                                "entry_point_type": "EXTERNAL",
                                "call_type": "CALL",
                                "result": [
                                  "0x1"
                                ],
                                "calls": [],
                                "events": [
                                  {
                                    "order": 5,
                                    "keys": [
                                      "0x134692b230b9e1ffa39098904722134159652b09c5bc41d88d6698779d228ff"
                                    ],
                                    "data": [
                                      "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                                      "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
                                      "0x0",
                                      "0x0"
                                    ]
                                  },
                                  {
                                    "order": 6,
                                    "keys": [
                                      "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9"
                                    ],
                                    "data": [
                                      "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                                      "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
                                      "0x821ab0d4414980000",
                                      "0x0"
                                    ]
                                  }
                                ],
                                "messages": [],
                                "execution_resources": {
                                  "steps": 1819,
                                  "memory_holes": 48,
                                  "pedersen_builtin_applications": 8,
                                  "range_check_builtin_applications": 55
                                }
                              },
                              {
                                "contract_address": "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
                                "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                "calldata": [
                                  "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b"
                                ],
                                "caller_address": "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
                                "class_hash": "0x4ad3c1dc8413453db314497945b6903e1c766495a1e60492d44da9c2a986e4b",
                                "entry_point_type": "EXTERNAL",
                                "call_type": "CALL",
                                "result": [
                                  "0x9ce44fb61aa6b1576bdaa",
                                  "0x0"
                                ],
                                "calls": [],
                                "events": [],
                                "messages": [],
                                "execution_resources": {
                                  "steps": 263,
                                  "pedersen_builtin_applications": 1,
                                  "range_check_builtin_applications": 12
                                }
                              }
                            ],
                            "events": [],
                            "messages": [],
                            "execution_resources": {
                              "steps": 6942,
                              "memory_holes": 103,
                              "pedersen_builtin_applications": 13,
                              "range_check_builtin_applications": 224
                            }
                          },
                          {
                            "contract_address": "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
                            "entry_point_selector": "0x15511cc3694f64379908437d6d64458dc76d02482052bfb8a5b33a72c054c77",
                            "calldata": [
                              "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
                              "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                              "0xbb2d8ba"
                            ],
                            "caller_address": "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                            "class_hash": "0x3e8d67c8817de7a2185d418e88d321c89772a9722b752c6fe097192114621be",
                            "entry_point_type": "EXTERNAL",
                            "call_type": "CALL",
                            "result": [],
                            "calls": [
                              {
                                "contract_address": "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
                                "entry_point_selector": "0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e",
                                "calldata": [
                                  "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                                  "0xbb2d8ba",
                                  "0x0"
                                ],
                                "caller_address": "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
                                "class_hash": "0x5ffbcfeb50d200a0677c48a129a11245a3fc519d1d98d76882d1c9a1b19c6ed",
                                "entry_point_type": "EXTERNAL",
                                "call_type": "CALL",
                                "result": [
                                  "0x1"
                                ],
                                "calls": [],
                                "events": [
                                  {
                                    "order": 7,
                                    "keys": [
                                      "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9"
                                    ],
                                    "data": [
                                      "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
                                      "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                                      "0xbb2d8ba",
                                      "0x0"
                                    ]
                                  }
                                ],
                                "messages": [],
                                "execution_resources": {
                                  "steps": 1705,
                                  "memory_holes": 56,
                                  "pedersen_builtin_applications": 4,
                                  "range_check_builtin_applications": 37
                                }
                              }
                            ],
                            "events": [],
                            "messages": [],
                            "execution_resources": {
                              "steps": 3509,
                              "memory_holes": 70,
                              "pedersen_builtin_applications": 5,
                              "range_check_builtin_applications": 103
                            }
                          }
                        ],
                        "events": [],
                        "messages": [],
                        "execution_resources": {
                          "steps": 28272,
                          "memory_holes": 3659,
                          "pedersen_builtin_applications": 48,
                          "range_check_builtin_applications": 2212,
                          "bitwise_builtin_applications": 29
                        }
                      }
                    ],
                    "events": [],
                    "messages": [],
                    "execution_resources": {
                      "steps": 30844,
                      "memory_holes": 3669,
                      "pedersen_builtin_applications": 49,
                      "range_check_builtin_applications": 2277,
                      "bitwise_builtin_applications": 29
                    }
                  }
                ],
                "events": [],
                "messages": [],
                "execution_resources": {
                  "steps": 32829,
                  "memory_holes": 3675,
                  "pedersen_builtin_applications": 49,
                  "range_check_builtin_applications": 2345,
                  "bitwise_builtin_applications": 29
                }
              }
            ],
            "events": [],
            "messages": [],
            "execution_resources": {
              "steps": 35497,
              "memory_holes": 3723,
              "pedersen_builtin_applications": 49,
              "range_check_builtin_applications": 2423,
              "bitwise_builtin_applications": 29
            }
          },
          {
            "contract_address": "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
            "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
            "calldata": [
              "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682"
            ],
            "caller_address": "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
            "class_hash": "0x5ffbcfeb50d200a0677c48a129a11245a3fc519d1d98d76882d1c9a1b19c6ed",
            "entry_point_type": "EXTERNAL",
            "call_type": "CALL",
            "result": [
              "0xbb2d8ba",
              "0x0"
            ],
            "calls": [],
            "events": [],
            "messages": [],
            "execution_resources": {
              "steps": 385,
              "memory_holes": 15,
              "pedersen_builtin_applications": 1,
              "range_check_builtin_applications": 12
            }
          },
          {
            "contract_address": "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
            "entry_point_selector": "0x15543c3708653cda9d418b4ccd3be11368e40636c10c44b18cfe756b6d88b29",
            "calldata": [
              "0x49ff5b3a7d38e2b50198f408fa8281635b5bc81ee49ab87ac36c8324c214427",
              "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
              "0xbb2d8ba",
              "0x0",
              "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
              "0x0",
              "0x0",
              "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
              "0x1",
              "0x7ae43abf704f4981094a4f3457d1abe6b176844f6cdfbb39c0544a635ef56b0"
            ],
            "caller_address": "0xa9651e29b175aa3da6b2a3f1ab37381f977aeb77ef8a107e2dd7d69bf44921",
            "class_hash": "0x4ac055f14361bb6f7bf4b9af6e96ca68825e6037e9bdf87ea0b2c641dea73ae",
            "entry_point_type": "EXTERNAL",
            "call_type": "DELEGATE",
            "result": [],
            "calls": [
              {
                "contract_address": "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
                "entry_point_selector": "0x219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c",
                "calldata": [
                  "0x49ff5b3a7d38e2b50198f408fa8281635b5bc81ee49ab87ac36c8324c214427",
                  "0xbb2d8ba",
                  "0x0"
                ],
                "caller_address": "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                "class_hash": "0x5ffbcfeb50d200a0677c48a129a11245a3fc519d1d98d76882d1c9a1b19c6ed",
                "entry_point_type": "EXTERNAL",
                "call_type": "CALL",
                "result": [
                  "0x1"
                ],
                "calls": [],
                "events": [
                  {
                    "order": 8,
                    "keys": [
                      "0x134692b230b9e1ffa39098904722134159652b09c5bc41d88d6698779d228ff"
                    ],
                    "data": [
                      "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                      "0x49ff5b3a7d38e2b50198f408fa8281635b5bc81ee49ab87ac36c8324c214427",
                      "0xbb2d8ba",
                      "0x0"
                    ]
                  }
                ],
                "messages": [],
                "execution_resources": {
                  "steps": 754,
                  "memory_holes": 12,
                  "pedersen_builtin_applications": 2,
                  "range_check_builtin_applications": 14
                }
              },
              {
                "contract_address": "0x49ff5b3a7d38e2b50198f408fa8281635b5bc81ee49ab87ac36c8324c214427",
                "entry_point_selector": "0x3276861cf5e05d6daf8f352cabb47df623eb10c383ab742fcc7abea94d5c5cc",
                "calldata": [
                  "0xbb2d8ba",
                  "0x0",
                  "0x0",
                  "0x0",
                  "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
                  "0x1",
                  "0x7ae43abf704f4981094a4f3457d1abe6b176844f6cdfbb39c0544a635ef56b0",
                  "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                  "0x6634b623"
                ],
                "caller_address": "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                "class_hash": "0x182dfcf12cf38789f5937a1b920f0513195131a408716224ac8273f371d9d0a",
                "entry_point_type": "EXTERNAL",
                "call_type": "CALL",
                "result": [
                  "0x2",
                  "0xbb2d8ba",
                  "0x0",
                  "0x8231c1c100f0d6d8c",
                  "0x0"
                ],
                "calls": [
                  {
                    "contract_address": "0x7ae43abf704f4981094a4f3457d1abe6b176844f6cdfbb39c0544a635ef56b0",
                    "entry_point_selector": "0xce7b6bfaaa8aeaaddf29401347ece7ea1e62dc96b606abb416173ce5e5e382",
                    "calldata": [],
                    "caller_address": "0x49ff5b3a7d38e2b50198f408fa8281635b5bc81ee49ab87ac36c8324c214427",
                    "class_hash": "0x4f9849485e35f4a1c57d69b297feda94e743151f788202a6d731173babf4aec",
                    "entry_point_type": "EXTERNAL",
                    "call_type": "CALL",
                    "result": [
                      "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d"
                    ],
                    "calls": [],
                    "events": [],
                    "messages": [],
                    "execution_resources": {
                      "steps": 203,
                      "memory_holes": 1,
                      "range_check_builtin_applications": 6
                    }
                  },
                  {
                    "contract_address": "0x7ae43abf704f4981094a4f3457d1abe6b176844f6cdfbb39c0544a635ef56b0",
                    "entry_point_selector": "0x3ef44502dd0b5c5fa735f1c5b76605e454e7126e7b6edb91ded1f5daa943f6",
                    "calldata": [
                      "0xbb2d8ba",
                      "0x0",
                      "0x0"
                    ],
                    "caller_address": "0x49ff5b3a7d38e2b50198f408fa8281635b5bc81ee49ab87ac36c8324c214427",
                    "class_hash": "0x4f9849485e35f4a1c57d69b297feda94e743151f788202a6d731173babf4aec",
                    "entry_point_type": "EXTERNAL",
                    "call_type": "CALL",
                    "result": [
                      "0x8231c1c100f0d6d8c",
                      "0x0"
                    ],
                    "calls": [],
                    "events": [],
                    "messages": [],
                    "execution_resources": {
                      "steps": 1574,
                      "memory_holes": 75,
                      "range_check_builtin_applications": 129
                    }
                  },
                  {
                    "contract_address": "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
                    "entry_point_selector": "0x41b033f4a31df8067c24d1e9b550a2ce75fd4a29e1147af9752174f0e6cb20",
                    "calldata": [
                      "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                      "0x7ae43abf704f4981094a4f3457d1abe6b176844f6cdfbb39c0544a635ef56b0",
                      "0xbb2d8ba",
                      "0x0"
                    ],
                    "caller_address": "0x49ff5b3a7d38e2b50198f408fa8281635b5bc81ee49ab87ac36c8324c214427",
                    "class_hash": "0x5ffbcfeb50d200a0677c48a129a11245a3fc519d1d98d76882d1c9a1b19c6ed",
                    "entry_point_type": "EXTERNAL",
                    "call_type": "CALL",
                    "result": [
                      "0x1"
                    ],
                    "calls": [],
                    "events": [
                      {
                        "order": 9,
                        "keys": [
                          "0x134692b230b9e1ffa39098904722134159652b09c5bc41d88d6698779d228ff"
                        ],
                        "data": [
                          "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                          "0x49ff5b3a7d38e2b50198f408fa8281635b5bc81ee49ab87ac36c8324c214427",
                          "0x0",
                          "0x0"
                        ]
                      },
                      {
                        "order": 10,
                        "keys": [
                          "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9"
                        ],
                        "data": [
                          "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                          "0x7ae43abf704f4981094a4f3457d1abe6b176844f6cdfbb39c0544a635ef56b0",
                          "0xbb2d8ba",
                          "0x0"
                        ]
                      }
                    ],
                    "messages": [],
                    "execution_resources": {
                      "steps": 2646,
                      "memory_holes": 84,
                      "pedersen_builtin_applications": 8,
                      "range_check_builtin_applications": 55
                    }
                  },
                  {
                    "contract_address": "0x7ae43abf704f4981094a4f3457d1abe6b176844f6cdfbb39c0544a635ef56b0",
                    "entry_point_selector": "0xce7b6bfaaa8aeaaddf29401347ece7ea1e62dc96b606abb416173ce5e5e382",
                    "calldata": [],
                    "caller_address": "0x49ff5b3a7d38e2b50198f408fa8281635b5bc81ee49ab87ac36c8324c214427",
                    "class_hash": "0x4f9849485e35f4a1c57d69b297feda94e743151f788202a6d731173babf4aec",
                    "entry_point_type": "EXTERNAL",
                    "call_type": "CALL",
                    "result": [
                      "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d"
                    ],
                    "calls": [],
                    "events": [],
                    "messages": [],
                    "execution_resources": {
                      "steps": 203,
                      "memory_holes": 1,
                      "range_check_builtin_applications": 6
                    }
                  },
                  {
                    "contract_address": "0x7ae43abf704f4981094a4f3457d1abe6b176844f6cdfbb39c0544a635ef56b0",
                    "entry_point_selector": "0x15543c3708653cda9d418b4ccd3be11368e40636c10c44b18cfe756b6d88b29",
                    "calldata": [
                      "0x8231c1c100f0d6d8c",
                      "0x0",
                      "0x0",
                      "0x0",
                      "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                      "0x0"
                    ],
                    "caller_address": "0x49ff5b3a7d38e2b50198f408fa8281635b5bc81ee49ab87ac36c8324c214427",
                    "class_hash": "0x4f9849485e35f4a1c57d69b297feda94e743151f788202a6d731173babf4aec",
                    "entry_point_type": "EXTERNAL",
                    "call_type": "CALL",
                    "result": [],
                    "calls": [
                      {
                        "contract_address": "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
                        "entry_point_selector": "0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e",
                        "calldata": [
                          "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                          "0x8231c1c100f0d6d8c",
                          "0x0"
                        ],
                        "caller_address": "0x7ae43abf704f4981094a4f3457d1abe6b176844f6cdfbb39c0544a635ef56b0",
                        "class_hash": "0x4ad3c1dc8413453db314497945b6903e1c766495a1e60492d44da9c2a986e4b",
                        "entry_point_type": "EXTERNAL",
                        "call_type": "CALL",
                        "result": [
                          "0x1"
                        ],
                        "calls": [],
                        "events": [
                          {
                            "order": 11,
                            "keys": [
                              "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9"
                            ],
                            "data": [
                              "0x7ae43abf704f4981094a4f3457d1abe6b176844f6cdfbb39c0544a635ef56b0",
                              "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                              "0x8231c1c100f0d6d8c",
                              "0x0"
                            ]
                          }
                        ],
                        "messages": [],
                        "execution_resources": {
                          "steps": 1178,
                          "memory_holes": 23,
                          "pedersen_builtin_applications": 4,
                          "range_check_builtin_applications": 37
                        }
                      },
                      {
                        "contract_address": "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
                        "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                        "calldata": [
                          "0x7ae43abf704f4981094a4f3457d1abe6b176844f6cdfbb39c0544a635ef56b0"
                        ],
                        "caller_address": "0x7ae43abf704f4981094a4f3457d1abe6b176844f6cdfbb39c0544a635ef56b0",
                        "class_hash": "0x4ad3c1dc8413453db314497945b6903e1c766495a1e60492d44da9c2a986e4b",
                        "entry_point_type": "EXTERNAL",
                        "call_type": "CALL",
                        "result": [
                          "0x43a9d16ef9ba1d2debee",
                          "0x0"
                        ],
                        "calls": [],
                        "events": [],
                        "messages": [],
                        "execution_resources": {
                          "steps": 263,
                          "pedersen_builtin_applications": 1,
                          "range_check_builtin_applications": 12
                        }
                      },
                      {
                        "contract_address": "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
                        "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                        "calldata": [
                          "0x7ae43abf704f4981094a4f3457d1abe6b176844f6cdfbb39c0544a635ef56b0"
                        ],
                        "caller_address": "0x7ae43abf704f4981094a4f3457d1abe6b176844f6cdfbb39c0544a635ef56b0",
                        "class_hash": "0x5ffbcfeb50d200a0677c48a129a11245a3fc519d1d98d76882d1c9a1b19c6ed",
                        "entry_point_type": "EXTERNAL",
                        "call_type": "CALL",
                        "result": [
                          "0x61467d3841",
                          "0x0"
                        ],
                        "calls": [],
                        "events": [],
                        "messages": [],
                        "execution_resources": {
                          "steps": 385,
                          "memory_holes": 15,
                          "pedersen_builtin_applications": 1,
                          "range_check_builtin_applications": 12
                        }
                      }
                    ],
                    "events": [
                      {
                        "order": 12,
                        "keys": [
                          "0xe14a408baf7f453312eec68e9b7d728ec5337fbdf671f917ee8c80f3255232"
                        ],
                        "data": [
                          "0x43a9d16ef9ba1d2debee",
                          "0x0",
                          "0x61467d3841",
                          "0x0"
                        ]
                      },
                      {
                        "order": 13,
                        "keys": [
                          "0xe316f0d9d2a3affa97de1d99bb2aac0538e2666d0d8545545ead241ef0ccab"
                        ],
                        "data": [
                          "0x49ff5b3a7d38e2b50198f408fa8281635b5bc81ee49ab87ac36c8324c214427",
                          "0x0",
                          "0x0",
                          "0xbb2d8ba",
                          "0x0",
                          "0x8231c1c100f0d6d8c",
                          "0x0",
                          "0x0",
                          "0x0",
                          "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682"
                        ]
                      }
                    ],
                    "messages": [],
                    "execution_resources": {
                      "steps": 9353,
                      "memory_holes": 462,
                      "pedersen_builtin_applications": 6,
                      "range_check_builtin_applications": 439
                    }
                  }
                ],
                "events": [],
                "messages": [],
                "execution_resources": {
                  "steps": 19579,
                  "memory_holes": 853,
                  "pedersen_builtin_applications": 14,
                  "range_check_builtin_applications": 789
                }
              }
            ],
            "events": [],
            "messages": [],
            "execution_resources": {
              "steps": 23119,
              "memory_holes": 911,
              "pedersen_builtin_applications": 16,
              "range_check_builtin_applications": 877
            }
          },
          {
            "contract_address": "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
            "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
            "calldata": [
              "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682"
            ],
            "caller_address": "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
            "class_hash": "0x4ad3c1dc8413453db314497945b6903e1c766495a1e60492d44da9c2a986e4b",
            "entry_point_type": "EXTERNAL",
            "call_type": "CALL",
            "result": [
              "0x8231c1c100f0d6d8c",
              "0x0"
            ],
            "calls": [],
            "events": [],
            "messages": [],
            "execution_resources": {
              "steps": 263,
              "pedersen_builtin_applications": 1,
              "range_check_builtin_applications": 12
            }
          },
          {
            "contract_address": "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
            "entry_point_selector": "0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e",
            "calldata": [
              "0xa9651e29b175aa3da6b2a3f1ab37381f977aeb77ef8a107e2dd7d69bf44921",
              "0x8231c1c100f0d6d8c",
              "0x0"
            ],
            "caller_address": "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
            "class_hash": "0x4ad3c1dc8413453db314497945b6903e1c766495a1e60492d44da9c2a986e4b",
            "entry_point_type": "EXTERNAL",
            "call_type": "CALL",
            "result": [
              "0x1"
            ],
            "calls": [],
            "events": [
              {
                "order": 14,
                "keys": [
                  "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9"
                ],
                "data": [
                  "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
                  "0xa9651e29b175aa3da6b2a3f1ab37381f977aeb77ef8a107e2dd7d69bf44921",
                  "0x8231c1c100f0d6d8c",
                  "0x0"
                ]
              }
            ],
            "messages": [],
            "execution_resources": {
              "steps": 1178,
              "memory_holes": 23,
              "pedersen_builtin_applications": 4,
              "range_check_builtin_applications": 37
            }
          },
          {
            "contract_address": "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
            "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
            "calldata": [
              "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682"
            ],
            "caller_address": "0x4068514fc353a2d7144a73a80496fe42076687a1f6c42cadc7ca079a166b682",
            "class_hash": "0x5ffbcfeb50d200a0677c48a129a11245a3fc519d1d98d76882d1c9a1b19c6ed",
            "entry_point_type": "EXTERNAL",
            "call_type": "CALL",
            "result": [
              "0x0",
              "0x0"
            ],
            "calls": [],
            "events": [],
            "messages": [],
            "execution_resources": {
              "steps": 385,
              "memory_holes": 15,
              "pedersen_builtin_applications": 1,
              "range_check_builtin_applications": 12
            }
          }
        ],
        "events": [
          {
            "order": 15,
            "keys": [
              "0xe316f0d9d2a3affa97de1d99bb2aac0538e2666d0d8545545ead241ef0ccab"
            ],
            "data": [
              "0xa9651e29b175aa3da6b2a3f1ab37381f977aeb77ef8a107e2dd7d69bf44921",
              "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
              "0x821ab0d4414980000",
              "0x0",
              "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
              "0x8231c1c100f0d6d8c",
              "0x0",
              "0xa9651e29b175aa3da6b2a3f1ab37381f977aeb77ef8a107e2dd7d69bf44921"
            ]
          }
        ],
        "messages": [],
        "execution_resources": {
          "steps": 76514,
          "memory_holes": 6257,
          "pedersen_builtin_applications": 84,
          "range_check_builtin_applications": 3972,
          "bitwise_builtin_applications": 29,
          "segment_arena_builtin": 6
        }
      }
    ],
    "events": [
      {
        "order": 16,
        "keys": [
          "0x1dcde06aabdbca2f80aa51392b345d7549d7757aa855f7e37f5d335ac8243b1",
          "0x72d572d5033a0322a85b6cf93bde86ba0dae22fc83ac516c2951f17690de343"
        ],
        "data": [
          "0x2",
          "0x1",
          "0x1",
          "0x1",
          "0x1"
        ]
      }
    ],
    "messages": [],
    "execution_resources": {
      "steps": 81653,
      "memory_holes": 6276,
      "pedersen_builtin_applications": 86,
      "range_check_builtin_applications": 4091,
      "bitwise_builtin_applications": 29,
      "segment_arena_builtin": 6
    }
  },
  "fee_transfer_invocation": {
    "contract_address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "entry_point_selector": "0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e",
    "calldata": [
      "0x1176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8",
      "0x1d8b1154b9e",
      "0x0"
    ],
    "caller_address": "0xa9651e29b175aa3da6b2a3f1ab37381f977aeb77ef8a107e2dd7d69bf44921",
    "class_hash": "0x7f3777c99f3700505ea966676aac4a0d692c2a9f5e667f4c606b51ca1dd3420",
    "entry_point_type": "EXTERNAL",
    "call_type": "CALL",
    "result": [
      "0x1"
    ],
    "calls": [],
    "events": [
      {
        "order": 0,
        "keys": [
          "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9"
        ],
        "data": [
          "0xa9651e29b175aa3da6b2a3f1ab37381f977aeb77ef8a107e2dd7d69bf44921",
          "0x1176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8",
          "0x1d8b1154b9e",
          "0x0"
        ]
      }
    ],
    "messages": [],
    "execution_resources": {
      "steps": 1178,
      "memory_holes": 23,
      "pedersen_builtin_applications": 4,
      "range_check_builtin_applications": 37
    }
  },
  "state_diff": {
    "storage_diffs": [
      {
        "address": "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
        "storage_entries": [
          {
            "key": "0x43e1ef374bc5f9e49c6c9764a9aac6e36bc8e3df0ca3bffb3cde5a0990ca369",
            "value": "0x570d4f45945"
          },
          {
            "key": "0x3c33860d274b2b559e71c6190a38ae8aedda95366387155c63d55b1f028d4c2",
            "value": "0x61467d3841"
          }
        ]
      },
      {
        "address": "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
        "storage_entries": [
          {
            "key": "0x2ae384abfe124fd57348d40e21c4594a95aca6005b381e9096574e5e6f80192",
            "value": "0x8349548174e90bfdf"
          },
          {
            "key": "0x43e1ef374bc5f9e49c6c9764a9aac6e36bc8e3df0ca3bffb3cde5a0990ca369",
            "value": "0x9ce44fb61aa6b1576bdaa"
          },
          {
            "key": "0x3c33860d274b2b559e71c6190a38ae8aedda95366387155c63d55b1f028d4c2",
            "value": "0x43a9d16ef9ba1d2debee"
          }
        ]
      },
      {
        "address": "0x7ae43abf704f4981094a4f3457d1abe6b176844f6cdfbb39c0544a635ef56b0",
        "storage_entries": [
          {
            "key": "0x1f5dba4f0e386fe3e03022985e50076614214c29faad4f1a66fd553c39c47ed",
            "value": "0x43a9d16ef9ba1d2debee"
          },
          {
            "key": "0x3e9df762c67f04c3d19de6f877d7906e3a52e992c3f97013dc2450ab7851c9",
            "value": "0x61467d3841"
          }
        ]
      },
      {
        "address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        "storage_entries": [
          {
            "key": "0x2ae384abfe124fd57348d40e21c4594a95aca6005b381e9096574e5e6f80192",
            "value": "0x21fe21b3b6872d"
          },
          {
            "key": "0x5496768776e3db30053404f18067d81a6e06f5a2b0de326e21298fd9d569a9a",
            "value": "0x40848c03fe490e3f"
          }
        ]
      },
      {
        "address": "0x5dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b",
        "storage_entries": [
          {
            "key": "0xae1b72a594adf942d61d66fb222d7bbe953934f3b762905c245fa71ea84ab9",
            "value": "0x2cfb3f87bccc28e1b5628916128d0b2d1f95"
          },
          {
            "key": "0x4a586bf09eec1cf5a6cf9d6d34e17e76a4f73dae476853d9f2bed89865e2ef2",
            "value": "0x101a181b000000000000000000000001332160d7cf251c4fddf7909d4b4"
          }
        ]
      }
    ],
    "nonces": [
      {
        "contract_address": "0xa9651e29b175aa3da6b2a3f1ab37381f977aeb77ef8a107e2dd7d69bf44921",
        "nonce": "0x641"
      }
    ],
    "deployed_contracts": [],
    "deprecated_declared_classes": [],
    "declared_classes": [],
    "replaced_classes": []
  },
  "execution_resources": {
    "steps": 85924,
    "memory_holes": 7004,
    "pedersen_builtin_applications": 90,
    "range_check_builtin_applications": 4190,
    "bitwise_builtin_applications": 29,
    "ec_op_builtin_applications": 3,
    "segment_arena_builtin": 6,
    "data_availability": {
      "l1_gas": 0,
      "l1_data_gas": 960
    }
  }
} as const

export const SimulateTrace = ({ traces, level }: { traces: typeof demoTrace['execute_invocation'], level: number }) => {
  if (!traces) return <></>
  let _level = level + 1;
  const { contract_address, entry_point_selector, call_type, calldata, caller_address, class_hash, entry_point_type, result, calls, messages, execution_resources } = traces;
  let arr = new Array(_level).fill(0);
  return (
    <>
      <TableRow>
        <TableCell className="">
          <div className="flex">
            {arr.map((e) => {
              return (
                <>
                  <div key={e} className="w-4 h-4 space-x-8 align-centre items-center justify-center ">
                  </div>
                </>
              )
            })}
            <div>{contract_address.slice(0, 8) + "..." + contract_address.slice(-8)}</div>
          </div>
        </TableCell>
        <TableCell className="text-base">
          <Badge color={call_type === "CALL" ? "purple" : "green"} className="p-2">{call_type}</Badge>
        </TableCell>
        <TableCell>{entry_point_selector.slice(0, 5)}</TableCell>
        <TableCell> <BadgeButton color="amber" className="p-2">More Details</BadgeButton></TableCell>
      </TableRow>
      {
        calls.map((call) => {
          return <SimulateTrace traces={call as any} level={_level} />
        })
      }
    </>

  )
}

export const SimulateTraceTable = ({ traces }: { traces: typeof demoTrace }) => {
  return (
    <Table>
      <TableCaption>The trace of your transaction</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Contract</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Function</TableHead>
          <TableHead className="text-right">More Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          traces && <SimulateTrace traces={traces.execute_invocation} level={0} />
        }
      </TableBody>
    </Table>
  )
}

