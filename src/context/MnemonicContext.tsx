import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Wallet Interface
interface Wallet {
  id: number;
  type: number;
  publicKey: string;
  privateKey: string;
  seed: string;
  balance: number;
}

// Account Interface
interface Account {
  mnemonicString: string;
  id: number;
  username: string;
  wallets: Wallet[];
}

// Mnemonic Context Interface
interface MnemonicContextType {
  accounts: Account[];
  activeAccountWallets: Wallet[];
  activeAccountId: number;
  activeWalletId: number;
  setActiveAccount: (accountId: number) => void;
  setActiveWallet: (walletId: number) => void;
  addAccount: (account: Account) => void;
  updateWalletInAccount: (wallet: Wallet, accountId: number) => void;
  addAccountMnemonic: (accountId: number, newMnemonic: string) => void;
  addWalletToAccount: (wallet: Wallet, accountId: number) => void;
  // setActiveWallets:(accounts: Account[]) => void;
}

// Create the context
const MnemonicContext = createContext<MnemonicContextType | undefined>(
  undefined
);

// Provider Component
export const MnemonicProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accounts, setAccounts] = useState<Account[]>(() => {
    const storedAccounts = localStorage.getItem("accounts");
    return storedAccounts ? JSON.parse(storedAccounts) : [];
  });
  console.log("here");
  const [activeAccountId, setActiveAccountId] = useState<number>(() => {
    const storedActiveAccountId = localStorage.getItem("activeAccountId");
    return storedActiveAccountId ? Number(storedActiveAccountId) : -1;
  });

  const [activeWalletId, setActiveWalletId] = useState<number>(() => {
    const storedActiveWalletId = localStorage.getItem("activeWalletId");
    return storedActiveWalletId ? Number(storedActiveWalletId) : 0;
  });

  const [activeAccountWallets, setActiveAccountWallets] = useState<Wallet[]>(
    () => {
      const storedActiveAccountWallets = localStorage.getItem("accounts");
      return storedActiveAccountWallets
        ? JSON.parse(storedActiveAccountWallets)[activeAccountId].wallets
        : [];
    }
  );

  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
    localStorage.setItem("activeAccountId", String(activeAccountId));
    localStorage.setItem("activeWalletId", String(activeWalletId));

  }, [accounts, activeAccountId, activeWalletId]);

  useEffect(() => {
    const storedAccounts = localStorage.getItem("accounts");
    const wallets =
      storedAccounts && activeAccountId !== -1
        ? JSON.parse(storedAccounts)[activeAccountId].wallets
        : [];
    setActiveAccountWallets(wallets);
  }, [accounts, activeAccountId]);
  

  const setActiveAccount = (accountId: number) => {
    setActiveAccountId(accountId);
  };
  
  // const setActiveWallets = (accounts: Account[]) => {
  //   console.log(accounts)
  //   setActiveAccountWallets(accounts[activeAccountId].wallets);
  // };
  const setActiveWallet = (walletId: number) => {
    setActiveWalletId(walletId);
  };

  const addAccount = (account: Account) => {
    setAccounts((prev) => [...prev, account]);
  };

  const updateWalletInAccount = (updatedWallet: Wallet, accountId: number) => {
    setAccounts((prev) =>
      prev.map((account) =>
        account.id === accountId
          ? {
              ...account,
              wallets: account.wallets.map((wallet) =>
                wallet.id === updatedWallet.id
                  ? { ...wallet, ...updatedWallet }
                  : wallet
              ),
            }
          : account
      )
    );
  };

  const addWalletToAccount = (wallet: Wallet, accountId: number) => {
    setAccounts((prev) =>
      prev.map((account) =>
        account.id === accountId
          ? { ...account, wallets: [...account.wallets, wallet] }
          : account
      )
    );
  };
  const addAccountMnemonic = (accountId: number, newMnemonic: string) => {
    setAccounts((prev) => {
      const updatedAccounts = prev.map((account) =>
        account.id === accountId
          ? { ...account, mnemonicString: newMnemonic }
          : account
      );
      localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
      return updatedAccounts;
    });
  };

  return (
    <MnemonicContext.Provider
      value={{
        accounts,
        activeAccountId,
        activeWalletId,
        activeAccountWallets,
        setActiveAccount,
        setActiveWallet,
        addAccount,
        updateWalletInAccount,
        addAccountMnemonic,
        addWalletToAccount,
      }}
    >
      {children}
    </MnemonicContext.Provider>
  );
};

// Custom Hook to access the context
export const useMnemonic = () => {
  const context = useContext(MnemonicContext);
  if (!context) {
    throw new Error("useMnemonic must be used within a MnemonicProvider");
  }
  return context;
};
