import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  ListItemButton,
} from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMnemonic } from "../context/MnemonicContext";

const SelectRecepient: React.FC = () => {
  const navigate = useNavigate();
  const { activeAccountId, accounts } = useMnemonic();
  // Current account and its wallets
  const account = accounts[activeAccountId];
  const wallets = account?.wallets || [];
  const coinType = account.type;

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedWallet, setSelectedWallet] = useState<string>("");

  // Filter wallets based on the search query
  const filteredWallets = wallets.filter((wallet) =>
    wallet.publicKey.includes(searchQuery)
  );

  // Handle navigation back to the BalancePage
  const handleBackClick = () => {
    navigate("/balance"); // Adjust the route as per your app
  };

  // Handle submission
  const handleSubmit = () => {
    navigate("/send-sol",{state : selectedWallet});
  };

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

        {/* Search Bar */}
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search wallet address or type a new one"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            marginBottom: "1rem",
            backgroundColor: "#444",
            input: { color: "#EDEDED" },
          }}
        />

        {/* Wallet List */}
        <List
          sx={{
            maxHeight: "300px",
            overflowY: "auto",
            backgroundColor: "#444",
            borderRadius: "5px",
            padding: 0,
          }}
        >
          {filteredWallets.length > 0 ? (
            filteredWallets.map((wallet) => (
              <ListItemButton
                key={wallet.id}
                onClick={() => setSelectedWallet(wallet.publicKey)}
              >
                <ListItem
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#4c94ff",
                      color: "#2D2E36",
                    },
                  }}
                >
                  <ListItemText
                    primary={wallet.publicKey}
                    secondary={`Balance: ${wallet.balance} SOL`}
                    sx={{
                      color: "#EDEDED",
                      "& .MuiListItemText-secondary": { color: "#888" },
                    }}
                  />
                </ListItem>
                <Divider sx={{ backgroundColor: "#ffffff1a" }} />
              </ListItemButton>
            ))
          ) : (
            <Typography
              variant="body2"
              sx={{
                color: "#888",
                textAlign: "center",
                padding: "1rem",
              }}
            >
              No wallets found.
            </Typography>
          )}
        </List>

        {/* Submit Button */}
        <Button
          variant="contained"
          fullWidth
          disabled={!selectedWallet}
          onClick={handleSubmit}
          sx={{
            marginTop: "1rem",
            backgroundColor: "#4c94ff",
            "&:hover": {
              backgroundColor: "#357ac8",
            },
          }}
        >
          SEND {coinType == 501 ? "SOL" : "ETH"}
        </Button>
      </Container>
    </Box>
  );
};

export default SelectRecepient;
