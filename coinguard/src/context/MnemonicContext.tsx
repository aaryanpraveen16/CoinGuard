import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface MnemonicContextType {
  mnemonicString: string;
  setMnemonicString: (mnemonic: string) => void;
  seed: string;
  setSeedState: (seed: string) => void;
  coin_type: number;
  setCoinType: (coinType: number) => void;
  accounts: Account[];
  addAccount: (account: Account) => void;
  ethCount: number;
  solCount: number;
  totalCount: number;
}

interface Account {
  id: number; // Unique identifier for the account
  type: "ethereum" | "solana"; // Type of account
  publicKey: string; // Public key
  privateKey: string; // Private key or seed phrase (optional)
}

const MnemonicContext = createContext<MnemonicContextType | undefined>(undefined);

export const MnemonicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial state from localStorage
  const [mnemonicString, setMnemonicStringState] = useState<string>(() => {
    return localStorage.getItem("mnemonicString") || "";
  });

  const [seed, setSeedState] = useState<string>(() => {
    return localStorage.getItem("seed") || "";
  });

  const [coin_type, setCoinTypeState] = useState<number>(() => {
    return parseInt(localStorage.getItem("coin_type") || "0", 10);
  });

  const [accounts, setAccountsState] = useState<Account[]>(() => {
    const storedAccounts = localStorage.getItem("accounts");
    return storedAccounts ? JSON.parse(storedAccounts) : [];
  });

  const [ethCount, setEthCountState] = useState<number>(() => {
    return parseInt(localStorage.getItem("ethCount") || "0", 10);
  });

  const [solCount, setSolCountState] = useState<number>(() => {
    return parseInt(localStorage.getItem("solCount") || "0", 10);
  });

  // Update localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("mnemonicString", mnemonicString);
  }, [mnemonicString]);

  useEffect(() => {
    localStorage.setItem("seed", seed);
  }, [seed]);

  useEffect(() => {
    localStorage.setItem("coin_type", coin_type.toString());
  }, [coin_type]);

  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem("ethCount", ethCount.toString());
  }, [ethCount]);

  useEffect(() => {
    localStorage.setItem("solCount", solCount.toString());
  }, [solCount]);

  // Context methods
  const setMnemonicString = (mnemonic: string) => setMnemonicStringState(mnemonic);
  const setSeed = (seed: string) => setSeedState(seed);
  const setCoinType = (coinType: number) => setCoinTypeState(coinType);

  const addAccount = (account: Account) => {
    setAccountsState((prevAccounts) => [...prevAccounts, account]);

    if (account.type === "ethereum") {
      setEthCountState((prev) => prev + 1);
    } else if (account.type === "solana") {
      setSolCountState((prev) => prev + 1);
    }
  };

  return (
    <MnemonicContext.Provider
      value={{
        mnemonicString,
        setMnemonicString,
        seed,
        setSeedState,
        coin_type,
        setCoinType,
        accounts,
        addAccount,
        ethCount,
        solCount,
        totalCount: ethCount + solCount,
      }}
    >
      {children}
    </MnemonicContext.Provider>
  );
};

export const useMnemonic = () => {
  const context = useContext(MnemonicContext);
  if (!context) {
    throw new Error("useMnemonic must be used within a MnemonicProvider");
  }
  return context;
};
