import { ConnectButton } from "thirdweb/react";

export function WalletConnect() {
  return (
    <ConnectButton
      client={{
        clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
      }}
    />
  );
}