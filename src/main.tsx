import React from "react";
import ReactDOM from "react-dom/client";
import { ThirdwebProvider } from "thirdweb/react";
import { defineChain } from "thirdweb/chains";
import App from "./App";

// Configure a chain (vamos usar Mumbai Testnet para testes)
const chain = defineChain(80001); // Mumbai Testnet

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ThirdwebProvider>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);