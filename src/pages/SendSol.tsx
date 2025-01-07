import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Stack,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { useMnemonic } from "../context/MnemonicContext";
import { Connection, PublicKey, Transaction, SystemProgram, sendAndConfirmTransaction, Keypair  } from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const SendSol: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const recipient = location.state;
  const { activeWalletId, accounts, activeAccountId } = useMnemonic();

  const account = accounts[activeAccountId];
  const activeWallet = account?.wallets.find(
    (wallet) => wallet.id === activeWalletId
  );

  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Handle back navigation
  const handleBackClick = () => {
    navigate("/balance"); // Adjust the route to your balance page
  };

  // Handle send button click
  const handleSend = () => {
    const parsedAmount = parseFloat(amount);

    if (!parsedAmount || parsedAmount <= 0) {
      setError("Please enter a valid amount of SOL.");
      return;
    }

    if (activeWallet && parsedAmount > activeWallet.balance) {
      setError("Insufficient balance.");
      return;
    }
    setError(""); // Clear any existing errors
    // Add logic to send SOL using Solana SDK or backend
    if(activeWallet){
      const privateKeyUint8Array = Uint8Array.from(atob(activeWallet.privateKey), c => c.charCodeAt(0)); // Example for Base64
      // console.log(privateKeyUint8Array);
      sendSol(privateKeyUint8Array,recipient,parsedAmount)
    }


  };

  async function sendSol(
    senderPrivateKey: Uint8Array,
    recipient: string,
    amount: number
  ) {
    if (!activeWallet) {
      console.error("Active wallet is not found");
      return;
    }
    const senderKeypair = Keypair.fromSecretKey(senderPrivateKey);
    const senderPublicKey = new PublicKey(activeWallet.publicKey) ;
    const recipientPubKey = "9iF5xGTh7NgbMbjQC5aGYWoGjRBbvod32yLbBBp1TGgX";
  
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: new PublicKey(senderPublicKey),
        toPubkey: new PublicKey(recipientPubKey),
        lamports: amount * 1e9, // Convert SOL to lamports
      })
    );
  
    await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);
    console.log(`Sent ${amount} SOL to ${recipient}`);
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
        {/* Back Button */}
        <IconButton
          onClick={handleBackClick}
          sx={{
            color: "#EDEDED",
            marginBottom: "1rem",
          }}
        >
          {/* <ArrowBackIcon /> */}
        </IconButton>

        {/* Page Title */}
        <Typography
          variant="h5"
          sx={{ marginBottom: "1rem", color: "#EDEDED" }}
        >
          Send SOL
        </Typography>


        {/* Amount to Send */}
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Amount (SOL)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{
            marginBottom: "1rem",
            backgroundColor: "#444",
            input: { color: "#EDEDED" },
          }}
        />

        {/* Error Message */}
        {error && (
          <Typography
            variant="body2"
            sx={{ color: "red", marginBottom: "1rem" }}
          >
            {error}
          </Typography>
        )}

        {/* Send Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleSend}
          sx={{
            backgroundColor: "#4c94ff",
            "&:hover": {
              backgroundColor: "#357ac8",
            },
          }}
        >
          Send
        </Button>
      </Container>
    </Box>
  );
};

export default SendSol;
