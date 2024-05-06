"use client";
import { useWorkspace } from "@/components/simulator/Context";
import { useState, useEffect } from "react";
import {
  Abi,
  Call,
  selector,
  stark,
  ArraySignatureType,
  AccountInvocations,
  TransactionType,
  RpcProvider,
  Signer,
  InvocationsSignerDetails,
  CairoVersion,
  constants,
} from "starknet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { StarknetWindowObject } from "starknetkit";
import { getAbi } from "./decoder";

type Function = {
  read: { name: string; inputs: any; outputs: any; state_mutability: string }[];
  write: {
    name: string;
    inputs: any;
    outputs: any;
    state_mutability: string;
  }[];
};

const Simulate = ({ connection }: { connection: StarknetWindowObject }) => {
  const { compilationResult } = useWorkspace();
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
    const provider = new RpcProvider({
      nodeUrl: "https://free-rpc.nethermind.io/sepolia-juno/",
    });

    const walletAddress = connection?.selectedAddress;
    console.log(walletAddress);
    const nonce = await provider.getNonceForAddress(walletAddress!);
    console.log(nonce);
    const chainId = await connection?.account.provider.chainId;
    const maxFee = "0x0";
    const version = 1;
    const cairoVersion = "1";

    const entrypoint = selector.getSelectorFromName(functionName);

    calldata = [
      "0x1", // no of transactions
      "0x6cc238a12493cb59fb085754fdcc021dec48c41108602d02ce6191d37613b1d", // contract address
      "0x362398bec32bc0ebb411203221a35a0301193a96f317ebe5e40be9f60d15320",
      "0x1", // no of inputs
      "0x1", // calldata
    ];

    const call: Call = {
      contractAddress:
        "0x6cc238a12493cb59fb085754fdcc021dec48c41108602d02ce6191d37613b1d",
      entrypoint:
        "0x362398bec32bc0ebb411203221a35a0301193a96f317ebe5e40be9f60d15320",
      calldata: {
        amount: "0x1",
      },
    };

    const signature = await signTransaction(
      walletAddress!,
      nonce,
      maxFee,
      version,
      chainId,
      cairoVersion,
      call
    );

    const invocation: AccountInvocations = [
      {
        type: TransactionType.INVOKE,
        version,
        nonce,
        maxFee,
        calldata,
        signature,
        contractAddress: walletAddress!,
      },
    ];

    const simulateTransactionOptions = {
      blockIdentifier: "latest",
      skipFeeCharge: true,
    };

    const simulation = await provider.simulateTransaction(
      invocation,
      simulateTransactionOptions
    );
    console.log(simulation);
  };

  const signTransaction = async (
    walletAddress: string,
    nonce: string,
    maxFee: string,
    version: number,
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
    };

    const signer = connection.account.signer;
    console.log(call);
    console.log(signerDetails);
    console.log(signer.pk);
    const signature = await signer.signTransaction([call], signerDetails);

    const formatedSignature = stark.formatSignature(signature);
    console.log(formatedSignature);
    return formatedSignature;
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
              </div>
            ))}
          </div>
          <Button
            onClick={() => {
              simulateTransaction("increase_balance", ["0x1"]);
            }}
          >
            Simulate
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Simulate;
