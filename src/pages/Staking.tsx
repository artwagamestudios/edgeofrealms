import { useState } from "react";
import { useContract } from "thirdweb/react";
import { useAddress } from "thirdweb/react";
import { WalletConnect } from "../components/WalletConnect";

export default function Staking() {
  const address = useAddress();
  const { contract } = useContract("ENDEREÇO_DO_CONTRATO_STAKING");
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null);
  const [isStaking, setIsStaking] = useState(false);
  const [staked, setStaked] = useState(false);

  const handleStake = async () => {
    if (!address || selectedNFT === null) {
      alert("Please select an NFT to stake");
      return;
    }

    setIsStaking(true);
    try {
      // Aqui você implementaria a lógica real de staking
      const tx = await contract.call("stake", [selectedNFT]);
      
      setStaked(true);
      console.log("NFT staked com sucesso!", tx);
    } catch (err: any) {
      console.error("Erro ao stakar NFT:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsStaking(false);
    }
  };

  if (staked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-purple-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 text-center">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-3xl font-bold mb-4">NFT Staked Successfully!</h2>
          <p className="mb-8 text-purple-200">Your NFT has been staked and is earning rewards.</p>
          <button 
            onClick={() => setStaked(false)}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full font-medium transition"
          >
            Stake Another NFT
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
      <header className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold">Edge of Realms</h1>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">NFT Staking</h2>
          <p className="text-purple-300 max-w-2xl mx-auto">
            Stake your Edge of Realms NFTs to earn rewards.
          </p>
        </div>

        {address ? (
          <div className="bg-purple-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Select NFT to Stake</h3>
            
            <div className="mb-6">
              <select 
                value={selectedNFT || ""}
                onChange={(e) => setSelectedNFT(Number(e.target.value))}
                className="w-full bg-purple-900 bg-opacity-50 border border-purple-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select an NFT</option>
                <option value="1">NFT #1</option>
                <option value="2">NFT #2</option>
                <option value="3">NFT #3</option>
              </select>
            </div>
            
            <button
              onClick={handleStake}
              disabled={isStaking || selectedNFT === null}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isStaking ? "Staking..." : "Stake NFT"}
            </button>
          </div>
        ) : (
          <div className="bg-purple-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-12 text-center max-w-2xl mx-auto">
            <div className="text-5xl mb-6">🔐</div>
            <h3 className="text-2xl font-bold mb-4">Connect Your Wallet</h3>
            <p className="text-purple-300 mb-8">Please connect your wallet to stake your NFTs.</p>
            <WalletConnect />
          </div>
        )}
      </main>
    </div>
  );
}