import { useState, useEffect } from "react";
import { connect, disconnect, StarknetWindowObject } from "starknetkit";
import { Button } from "@/components/ui/button";
import Simulate from "./Simulate";

const WalletConnect = () => {
  const [connection, setConnection] = useState<StarknetWindowObject>();
  const [address, setAddress] = useState("");

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    const { wallet } = await connect({
      // modalMode: "neverAsk",
    });
    console.log("wallet", wallet);

    if (wallet && wallet.isConnected) {
      setConnection(wallet);
      setAddress(wallet.selectedAddress);
    }
  };

  const disconnectWallet = async () => {
    await disconnect({ clearLastWallet: true });

    setConnection(undefined);
    setAddress("");
  };

  return (
    <div>
      {connection && address ? (
        <Simulate connection={connection} />
      ) : (
        <Button onClick={connectWallet}>Connect</Button>
      )}
      {/* <Button onClick={disconnectWallet}>Disconnect</Button> */}
    </div>
  );
};

export default WalletConnect;
