"use client";
import { useWorkspace } from "@/components/simulator/Context";
import { useState, useEffect, useRef } from "react";
import { Abi, Invocations, Result, TransactionType } from "starknet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { decodeTrace } from "./decoder";
import { Input } from "../ui/input";

export type Function = {
  read: {
    name: string;
    inputs: any;
    outputs: any;
    state_mutability: string;
  }[];
  write: {
    name: string;
    inputs: any;
    outputs: any;
    state_mutability: string;
  }[];
};

const Simulate = ({ functions }: { functions?: Function }) => {
  const {
    account,
    contractAddress,
    trace,
    setTrace,
    setTraceError,
    setSimulationParameters,
  } = useWorkspace();

  const simulateTransaction = async (
    functionName: string,
    calldata: string[]
  ) => {
    setTraceError("");
    const simulationParameters = {
      functionName,
      calldata,
    };
    setSimulationParameters(simulationParameters);

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

    try {
      const simulation = await account?.simulateTransaction(
        invocation,
        simulateTransactionOptions
      );

      console.log("Simulation: ");
      console.log(simulation);
      if (simulation) {
        console.log("simulation: " + simulation[0].transaction_trace);
        const trace = await decodeTrace(simulation[0].transaction_trace);
        setTrace(trace);
      }
    } catch (err) {
      const error = err as any;
      const regex = /revert_error":"(.*)/;
      const matches = regex.exec(error);
      if (matches && matches[1]) {
        setTraceError(matches[1]);
      } else {
        setTraceError("An unexpected error occurred.");
      }
    }
  };

  if (!functions) {
    return null;
  }

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
            {functions.read.map((f, i) => {
              return (
                <div key={i}>
                  <p className="font-bold">{f.name}</p>
                  <div>
                    {f.inputs?.map((input: any, i_: number) => (
                      <div key={i_}>
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
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="write">
          <div className="my-2">
            {functions.write.map((f, i) => {
              // const [output, setOutput] = useState<Result>();
              let inputsRefs = f.inputs.map(() => useRef());
              // let thisInputRef = useRef<HTMLInputElement>(null)
              return (
                <div key={i}>
                  <p className="font-bold">{f.name}</p>
                  <div>
                    {f.inputs?.map((input: any, i_: number) => {
                      let [value, setValue] = useState<string | number>("");
                      return (
                        <div key={i_ + input}>
                          <Input
                            placeholder={input.name}
                            type="text"
                            className="p-2"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            ref={inputsRefs[i_]}
                          />
                          {/* TODO: input type */}
                        </div>
                      );
                    })}
                  </div>
                  <Button
                    onClick={async () => {
                      let inputs_ = inputsRefs.map(
                        (ref: any) => ref.current?.value
                      );
                      simulateTransaction(f.name, inputs_).catch((err) =>
                        console.log("Sim Error:" + err)
                      ); // TODO: replace with actual inputs
                    }}
                  >
                    Simulate
                  </Button>
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Simulate;
