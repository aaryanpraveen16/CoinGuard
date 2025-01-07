import React, { useEffect, useState } from "react";
import { useMnemonic } from "../context/MnemonicContext";
import {
  deriveKeyPairForEthereum,
  deriveKeyPairForSolana,
} from "../services/KeyDerivationService";
import { Mnemonic } from "ethers";
import { mnemonicToSeedSync } from "bip39";
import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  Divider,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Connection ,PublicKey,clusterApiUrl } from "@solana/web3.js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const BalancePage: React.FC = () => {
  const {
    activeAccountId,
    updateWalletInAccount,
    accounts,
    activeWalletId,
    setActiveWallet,
    activeAccountWallets,
    addWalletToAccount,
    setActiveWalletBalance,
    activeWalletBalance,
  } = useMnemonic();
  const account = React.useMemo(
    () => accounts[activeAccountId],
    [accounts, activeAccountId]
  );
  const mnemonicString = account.mnemonicString;
  const coinType = account.type;
  let seed: string = "";
  let navigate = useNavigate();
  const activeWallet = account?.wallets[activeWalletId];
  let connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  useEffect(() => {
    const deriveKeyAndFetchBalance = () => {
      try {
        if (coinType === 501) {
          createSolanaWallet("update");
        } else if (coinType === 60) {
          createEthereumWallet("update");
        }
      } catch (error) {
        console.error("Error deriving keypair or fetching balance:", error);
      }
    };
    deriveKeyAndFetchBalance();
    getBalance();
  }, []);

  const createSolanaWallet = async (action: string) => {
    seed = mnemonicToSeedSync(mnemonicString).toString("hex");
    const derivationPath = `m/44'/501'/${
      accounts.length - 1
    }'/${activeWalletId}'`;
    const { publicKey, privateKey } = await deriveKeyPairForSolana(
      seed,
      derivationPath
    );
    if (action == "update") {
      updateWallet(publicKey, privateKey);
    } else {
      createWallet(publicKey, privateKey);
    }
  };
  const createEthereumWallet = async (action: string) => {
    const mnemonic = Mnemonic.fromPhrase(mnemonicString);
    const derivationPath = `m/44'/60'/${
      accounts.length - 1
    }'/${activeWalletId}''`;
    const { publicKey, privateKey } = await deriveKeyPairForEthereum(
      mnemonic,
      derivationPath
    );
    if (action == "update") {
      updateWallet(publicKey, privateKey);
    } else {
      createWallet(publicKey, privateKey);
    }
  };

  const updateWallet = (
    publicKey: string,
    privateKey: string,
  ) => {
    updateWalletInAccount(
      {
        id: account.wallets.length - 1, // Assign a new wallet ID
        publicKey,
        privateKey,
        seed,
        balance: activeWallet?.balance,
      },
      account.id
    );
  };
  const createWallet = (
    publicKey: string,
    privateKey: string,
  ) => {
    addWalletToAccount(
      {
        id: activeWalletId,
        publicKey,
        privateKey,
        seed,
        balance: 0,
      },
      account.id
    );
  };


  useEffect(() => {
    const createNewWallet = async () => {
      if (coinType === 501) {
        await createSolanaWallet("create");
      } else if (coinType === 60) {
        await createEthereumWallet("create");
      }
    };
    if (activeWalletId >= account.wallets.length) {
      createNewWallet();
    }
    getBalance();
  }, [activeWalletId]);

  const addNewWallet = () => {
    setActiveWallet(activeWalletId + 1);
  };
  const handleWalletChange = (event: SelectChangeEvent<number>) => {
    setActiveWallet(event.target.value as number);
  };


  const getBalance = async() => {
    let balance = await connection.getBalance(new PublicKey(activeWallet.publicKey));
    setActiveWalletBalance(balance);
  }

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0E0F14",
        color: "#EDEDED",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "#333",
          padding: "2rem",
          borderRadius: 2,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Typography variant="h4" sx={{ color: "#EDEDED" }}>
              Wallet {1}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<FontAwesomeIcon icon={faPlus} />}
              sx={{
                color: "#EDEDED",
                borderColor: "#4c94ff",
                "&:hover": {
                  backgroundColor: "#4c94ff",
                  color: "#2D2E36",
                },
              }}
              onClick={addNewWallet}
            >
              {`Add New ${coinType == 501 ? "Soalana" : "Ethereum"} Wallet`}
            </Button>
          </Stack>

          <Divider sx={{ width: "100%", borderColor: "#ffffff1a" }} />

          {/* Wallet Dropdown */}
          <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
            <Typography variant="body1" sx={{ color: "#EDEDED" }}>
              Select Wallet:
            </Typography>
            <Select
              value={activeWalletId}
              onChange={handleWalletChange}
              fullWidth
              sx={{
                backgroundColor: "#222",
                color: "#EDEDED",
                borderColor: "#4c94ff",
              }}
            >
              {activeAccountWallets.map((wallet, index) => (
                <MenuItem key={wallet.id} value={index}>
                  Wallet {wallet.id} - {wallet.publicKey}
                </MenuItem>
              ))}
            </Select>
          </Stack>

          <Stack direction="column">
            <Typography variant="body1" sx={{ color: "#EDEDED" }}>
              <strong>Wallet Address:</strong>{" "}
              {activeWallet?.publicKey || "N/A"}
            </Typography>
            <Typography variant="body1" sx={{ color: "#EDEDED" }}>
              <strong>Balance:</strong> {activeWalletBalance/LAMPORTS_PER_SOL}{" "}
              {coinType === 60 ? "ETH" : "SOL"}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
            <Button
              variant="outlined"
              startIcon={<FontAwesomeIcon icon={faArrowDown} />}
              fullWidth
              sx={{
                color: "#EDEDED",
                borderColor: "#4c94ff",
                "&:hover": {
                  backgroundColor: "#4c94ff",
                  color: "#2D2E36",
                },
              }}
            >
              Receive
            </Button>
            <Button
              variant="outlined"
              startIcon={<FontAwesomeIcon icon={faArrowUp} />}
              fullWidth
              sx={{
                color: "#EDEDED",
                borderColor: "#4c94ff",
                "&:hover": {
                  backgroundColor: "#4c94ff",
                  color: "#2D2E36",
                },
              }}
              onClick={() => navigate("/select-recepient")}
            >
              Send
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default BalancePage;
