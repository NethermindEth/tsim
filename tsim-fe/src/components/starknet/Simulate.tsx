"use client";
import { useWorkspace } from "@/components/simulator/Context";
import { useState, useEffect, useRef } from "react";
import {
  Account,
  AccountInvocations,
  ArraySignatureType,
  CairoVersion,
  Call,
  constants,
  Invocations,
  RpcProvider,
  selector,
  stark,
  TransactionType,
} from "starknet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { decodeTrace } from "./decoder";
import { Input } from "../ui/input";
import { Wallet } from "lucide-react";
import { WalletConnect } from ".";

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

    try {
      const provider = new RpcProvider({
        nodeUrl: "https://free-rpc.nethermind.io/sepolia-juno/",
      });

      const walletAddress = account?.address;
      console.log(walletAddress);
      const nonce = await provider.getNonceForAddress(walletAddress!);
      console.log(nonce);
      const chainId = await account?.getChainId();
      const maxFee = "0x0";
      const version = 1;
      const cairoVersion = "1";

      const entrypoint = selector.getSelectorFromName(functionName);
      calldata = [
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0",
      ];

      const call: Call = {
        contractAddress,
        entrypoint,
        calldata: {
          recipient:
            "0x053f84E5968D384C1e6C731DfE9426705165a123d52388E006BA74437983f743",
          amount: "0x0",
        },
      };

      const signature = await signTransaction(
        walletAddress!,
        nonce,
        maxFee,
        version,
        chainId!,
        cairoVersion,
        call
      );

      calldata = [
        "0x1",
        contractAddress,
        entrypoint,
        "0x3",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0",
        "0x0",
      ];

      const simulation = await simulateTransactions(
        walletAddress!,
        calldata,
        signature,
        nonce
      );
      console.log(calldata);

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

  const simulateTransactions = async (
    sender_address: string,
    calldata: string[],
    signature: ArraySignatureType,
    nonce: string
  ) => {
    const url = "https://free-rpc.nethermind.io/sepolia-juno/";
    const payload = {
      jsonrpc: "2.0",
      method: "starknet_simulateTransactions",
      params: {
        block_id: "latest",
        transactions: [
          {
            type: "INVOKE",
            version: "0x1",
            sender_address,
            calldata,
            max_fee: "0x0",
            signature,
            nonce,
          },
        ],
        simulation_flags: ["SKIP_VALIDATE"],
      },
      id: 1,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const signTransaction = async (
    walletAddress: string,
    nonce: string,
    maxFee: string,
    version: any,
    chainId: constants.StarknetChainId,
    cairoVersion: CairoVersion,
    call: Call
  ): Promise<ArraySignatureType> => {
    const signerDetails = {
      walletAddress,
      nonce,
      maxFee,
      version,
      chainId,
      cairoVersion,
      skipValidate: true,
    };

    const signer = account?.signer;
    const signature = await signer?.signTransaction([call], signerDetails);

    const formatedSignature = stark.formatSignature(signature);
    console.log(formatedSignature);
    return formatedSignature;
  };

  if (!functions) {
    return null;
  }

  return (
    <div className="p-2 w-full">
      {account ? (
        <Tabs defaultValue="simulator" className="w-[800px] justify-between">
          <TabsList className="">
            <TabsTrigger value="read">Read</TabsTrigger>
            <TabsTrigger value="write">Write</TabsTrigger>
          </TabsList>
          <TabsContent value="read">
            {/* <p>Test</p> */}
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
      ) : (
        <WalletConnect />
      )}
    </div>
  );
};

export default Simulate;
