import { useState } from "react";
import { useContract, useMintNFT } from "thirdweb/react";
import { useAddress } from "thirdweb/react";
import { WalletConnect } from "../components/WalletConnect";

export default function Mint() {
  const address = useAddress();
  const { contract } = useContract("ENDEREÇO_DO_CONTRATO_NFT");
  const { mutateAsync: mintNft, isLoading, error } = useMintNFT(contract);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const [minted, setMinted] = useState(false);

  const handleMint = async () => {
    if (!address) {
      alert("Please connect your wallet first");
      return;
    }

    setIsMinting(true);
    try {
      const tx = await mintNft({
        to: address,
        metadata: {
          name,
          description,
          image: "https://via.placeholder.com/400", // Substitua pela URL da imagem
        },
      });

      setMinted(true);
      console.log("NFT mintado com sucesso!", tx);
    } catch (err: any) {
      console.error("Erro ao mintar NFT:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsMinting(false);
    }
  };

  if (minted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-purple-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold mb-4">NFT Minted Successfully!</h2>
          <p className="mb-8 text-purple-200">Your NFT has been minted and added to your collection.</p>
          <button 
            onClick={() => setMinted(false)}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full font-medium transition"
          >
            Mint Another NFT
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
      
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-purple-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-2">Mint New NFT</h2>
          <p className="text-purple-300 mb-8">Create your unique Edge of Realms NFT</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">NFT Name</label>
              <input
                type="text"
                placeholder="Enter NFT name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-purple-900 bg-opacity-50 border border-purple-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                placeholder="Describe your NFT"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-purple-900 bg-opacity-50 border border-purple-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <button
              onClick={handleMint}
              disabled={isMinting || !name || !description || !address}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isMinting ? "Minting..." : "Mint NFT"}
            </button>
            
            {error && (
              <div className="bg-red-900 bg-opacity-50 border border-red-700 rounded-lg p-4">
                <p className="text-red-200">Error: {error.message}</p>
              </div>
            )}
            
            {!address && (
              <div className="bg-yellow-900 bg-opacity-50 border border-yellow-700 rounded-lg p-4 text-center">
                <p className="text-yellow-200">Please connect your wallet to mint an NFT</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}