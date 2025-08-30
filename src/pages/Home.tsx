import { Link } from "react-router-dom";
import { WalletConnect } from "../components/WalletConnect";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Edge of Realms</h1>
        <WalletConnect />
      </header>
      
      <main className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-bold mb-6">Welcome to Edge of Realms</h2>
        <p className="text-xl mb-10 text-purple-200">
          Explore the mystical universe of NFTs and earn rewards through staking
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
          <Link to="/mint">
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105">
              Mint NFT
            </button>
          </Link>
          <Link to="/staking">
            <button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105">
              Stake NFTs
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}