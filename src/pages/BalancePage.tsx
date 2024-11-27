import React, { useEffect, useState } from "react";
import { useMnemonic } from "../context/MnemonicContext";
import {
  deriveKeyPairForEthereum,
  deriveKeyPairForSolana,
} from "../services/KeyDerivationService";
import { Mnemonic } from "ethers";

const BalancePage: React.FC = () => {
  const { mnemonicString, coin_type, seed, totalCount, addAccount } =
    useMnemonic();
  // const [currentAccountPublicKey, setCurrentAccountPublicKey] = useState<string>("");
  const [publicKey, setPublicKey] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (!mnemonicString) {
      console.error("No mnemonic found!");
      return;
    }

    const deriveKeyAndFetchBalance = async () => {
      const mnemonic = Mnemonic.fromPhrase(mnemonicString);
      console.log(coin_type);
      try {
        if (coin_type === 501) {
          const derivationPath = `m/44'/501'/${totalCount}'/0'`;
          const { publicKey, privateKey } = await deriveKeyPairForSolana(
            seed,
            derivationPath
          );
          console.log(publicKey,"public key")
          console.log(privateKey,"private key")

          // setPublicKey(publicKey);
          // setPrivateKey(privateKey);
          // createEthereumAccount(publicKey,privateKey);
        } else if (coin_type === 60) {
          // Handle Ethereum derivation
          const derivationPath = `m/44'/60'/${totalCount}'/0'`;
          const { publicKey, privateKey } = await deriveKeyPairForEthereum(
            mnemonic,
            derivationPath
          );
          setPublicKey(publicKey);
          setPrivateKey(privateKey);
          createEthereumAccount(publicKey,privateKey);
        }

        // Simulate fetching balance (replace with actual API call)
        setBalance(100); // Replace with actual logic
      } catch (error) {
        console.error("Error deriving keypair or fetching balance:", error);
      }
    };

    deriveKeyAndFetchBalance();
  }, []);

  const createEthereumAccount = (privateKey:string,publicKey:string) => {
    addAccount({
      id: totalCount,
      type: "ethereum",
      publicKey: publicKey,
      privateKey: privateKey,
    });
  };


  return (
    <div className="page-container">
      <div className="col-container">
        <h1>Your Wallet</h1>
        <p>
          <strong>Public Key:</strong> {publicKey}
        </p>
        <p>
          <strong>Balance:</strong> {balance} ETH{" "}
          {/* Adjust unit dynamically */}
        </p>
      </div>
    </div>
  );
};

export default BalancePage;
