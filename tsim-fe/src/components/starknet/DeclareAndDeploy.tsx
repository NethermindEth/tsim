"use client";
import { useState, useEffect } from "react";
import { useWorkspace } from "@/components/simulator/Context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Account,
  CompiledContract,
  RpcProvider,
  CairoAssembly,
} from "starknet";
import {
  NETHERMIND_DEVNET_URL,
  PREDEPLOYED_ACCOUNTS_ENDPOINT,
} from "@/components/simulator/constants";
import { PreDeployedAccount } from "@/components/simulator/types";

const DeclareAndDeploy = () => {
  const { compilationResult, contractAddress, setContractAddress, setAccount } =
    useWorkspace();
  const [preDeployedAccounts, setPreDeployedAccounts] = useState<
    PreDeployedAccount[]
  >([]);
  const [sierra, setSierra] = useState<CompiledContract>();
  const [casm, setCasm] = useState<CairoAssembly>();

  // TODO: Duplicate implementation of this in the workspace. Fix
  useEffect(() => {
    if (!compilationResult) {
      console.log("No compilation result available.");
      return;
    }

    try {
      const jsonCompilationResult = JSON.parse(compilationResult);
      if (jsonCompilationResult) {
        if (jsonCompilationResult) {
          setSierra(jsonCompilationResult.cairo_sierra.sierra_contract_class);
          setCasm(jsonCompilationResult.casm_sierra.casm_contract_class);
        }
      }
    } catch (error) {
      console.error("Error parsing compilation result:", error);
    }
  }, [compilationResult]);

  const getAccounts = async () => {
    const response = await fetch(PREDEPLOYED_ACCOUNTS_ENDPOINT);
    const accounts = await response.json();
    setPreDeployedAccounts(accounts);
    return accounts;
  };

  const declareAndDeploy = async () => {
    const preDeployedAccounts = await getAccounts();
    // TODO: Allow user to select account
    const preDeployedAccount = preDeployedAccounts[0];

    const provider = new RpcProvider({
      nodeUrl: NETHERMIND_DEVNET_URL,
    });

    const account = new Account(
      provider,
      preDeployedAccount.address,
      preDeployedAccount.private_key
    );
    setAccount(account);

    const deployResponse = await account.declareAndDeploy({
      contract: sierra!,
      casm: casm,
    });
    setContractAddress(deployResponse.deploy.address);
  };

  return (
    <div>
      <Button
        disabled={contractAddress !== "" || compilationResult === ""}
        onClick={declareAndDeploy}
      >
        Declare and Deploy
      </Button>
    </div>
  );
};

export default DeclareAndDeploy;
