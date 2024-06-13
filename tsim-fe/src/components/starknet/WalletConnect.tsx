import { useState, useEffect } from "react";
import { connect, disconnect, StarknetWindowObject } from "starknetkit";
import { Button } from "@/components/ui/button";
import Simulate from "./Simulate";
import { useWorkspace } from "@/components/simulator/Context";

const WalletConnect = () => {
  const { setAccount } = useWorkspace();

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    const { wallet } = await connect({
      // modalMode: "neverAsk",
    });
    console.log("wallet", wallet);

    if (wallet && wallet.isConnected) {
      setAccount(wallet.account);
    }
  };

  const disconnectWallet = async () => {
    await disconnect({ clearLastWallet: true });
  };

  return (
    <div>
      <Button onClick={connectWallet}>Connect</Button>
      {/* <Button onClick={disconnectWallet}>Disconnect</Button> */}
    </div>
  );
};

export default WalletConnect;
