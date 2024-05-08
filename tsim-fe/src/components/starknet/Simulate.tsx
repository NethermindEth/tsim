"use client";
import { useWorkspace } from "@/components/simulator/Context";
import { useState, useEffect } from "react";
import { Abi, Invocations, TransactionType } from "starknet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { decodeTrace } from "./decoder";

type Function = {
  read: { name: string; inputs: any; outputs: any; state_mutability: string }[];
  write: {
    name: string;
    inputs: any;
    outputs: any;
    state_mutability: string;
  }[];
};

const Simulate = () => {
  const { account, contractAddress, compilationResult } = useWorkspace();
  const [simulationResult, setSimulationResult] = useState<string>("");
  const [functions, setFunctions] = useState<Function>({
    read: [],
    write: [],
  });

  useEffect(() => {
    if (compilationResult) {
      const abi =
        JSON.parse(compilationResult).cairo_sierra.sierra_contract_class.abi;

      if (abi) {
        setFunctions(getFunctions(abi));
      }
    }
  }, [compilationResult]);

  const simulateTransaction = async (
    functionName: string,
    calldata: string[]
  ) => {
    const invocation: Invocations = [
      {
        type: TransactionType.INVOKE,
        contractAddress,
        entrypoint: functionName,
        calldata,
      },
    ];

    const simulateTransactionOptions = {
      blockIdentifier: "latest",
    };

    //FIXME: Should remove later
    console.log("Account: " + account);

    const simulation = await account?.simulateTransaction(
      invocation,
      simulateTransactionOptions
    );
    console.log("Simulation: ");
    console.log(simulation);
    if (simulation) {
      const trace = await decodeTrace(simulation[0].transaction_trace);
      console.log("Trace: ");
      console.log(trace);
    }
  };

  const getFunctions = (abi: Abi): Function => {
    return abi.reduce(
      (acc, f) => {
        if (
          f.type === "function" ||
          (f.type === "interface" &&
            f.items.some((item: { type: string }) => item.type === "function"))
        ) {
          const functions =
            f.type === "function"
              ? [f]
              : f.items.filter(
                  (item: { type: string }) => item.type === "function"
                );
          functions.forEach(
            (func: {
              name: string;
              inputs: any;
              outputs: any;
              state_mutability: string;
            }) => {
              const funcObject = {
                name: func.name,
                inputs: func.inputs,
                outputs: func.outputs,
                state_mutability: func.state_mutability,
              };
              if (func.state_mutability === "view") {
                acc.read.push(funcObject);
              } else {
                acc.write.push(funcObject);
              }
            }
          );
        }
        return acc;
      },
      { read: [], write: [] }
    );
  };

  return (
    <div className="p-2">
      <Tabs defaultValue="simulator" className="w-[800px] justify-between">
        <TabsList className="">
          <TabsTrigger value="read">Read</TabsTrigger>
          <TabsTrigger value="write">Write</TabsTrigger>
        </TabsList>
        <TabsContent value="read">
          <p>Test</p>
          <div>
            {functions.read.map((f, i) => (
              <div key={i}>
                <p className="font-bold">{f.name}</p>
                <div>
                  {f.inputs?.map((input: any, i: number) => (
                    <div key={i}>
                      <input
                        placeholder={input.name}
                        type="text"
                        className="p-2"
                      />
                      {/* TODO: input type */}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="write">
          <div className="my-2">
            {functions.write.map((f, i) => (
              <div key={i}>
                <p className="font-bold">{f.name}</p>
                <div>
                  {f.inputs?.map((input: any, i: number) => (
                    <div key={i}>
                      <input
                        placeholder={input.name}
                        type="text"
                        className="p-2"
                      />
                      {/* TODO: input type */}
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => {
                    simulateTransaction(f.name, ["0x1"]); // TODO: replace with actual inputs
                  }}
                >
                  Simulate
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Simulate;
