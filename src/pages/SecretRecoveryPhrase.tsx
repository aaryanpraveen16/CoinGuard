import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateMnemonic } from "bip39";
import { Box, Button, Checkbox, Container, Grid, Typography, Divider } from "@mui/material";
import { useMnemonic } from "../context/MnemonicContext";

const SecretRecoveryPhrase: React.FC = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [mnemonicArray, setMnemonicArray] = useState<string[]>([]);
  const { addAccountMnemonic , setActiveAccount ,accounts} = useMnemonic();
  useEffect(() => {
    const mnemonic = generateMnemonic(); // Generate mnemonic
    setMnemonicArray(mnemonic.split(" ")); // Split into words
    console.log(mnemonic,"mnemonic");
    setActiveAccount(accounts.length - 1);
    addAccountMnemonic(accounts.length - 1,mnemonic);
  }, []);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mnemonicArray.join(" "));
    alert("Recovery Phrase copied to clipboard!");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center", // Horizontal centering
        alignItems: "center", // Vertical centering
        backgroundColor: "#0E0F14",
        color: "#EDEDED",
        width:"100vw"
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ color: "#EDEDED" }}>
            Secret Recovery Phrase
          </Typography>
          <Typography variant="body1" sx={{ color: "#5A5E70" }}>
            Save these words in a safe place
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#4c94ff", cursor: "pointer" }}
            onClick={() => navigate("/recovery-phrase-warning")}
          >
            Read the warnings again
          </Typography>

          <Box
            sx={{
              width: "100%",
              padding: 2,
              border: "1px solid #ffffff1a",
              borderRadius: 2,
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "#333", // Card background color
            }}
            onClick={copyToClipboard}
          >
            <Grid container spacing={1}>
              {mnemonicArray.map((word, index) => (
                <Grid item xs={4} key={index}>
                  <Typography variant="body2" sx={{ color: "#EDEDED" }}>
                    {word}
                  </Typography>
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ my: 2, borderColor: "#ffffff1a" }} />
            <Typography variant="body2" sx={{ color: "#5A5E70" }}>
              Click anywhere on this card to copy
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
              width: "90%",
            }}
          >
            <Checkbox
              id="recoveryPhraseAcknowledgment"
              checked={isChecked}
              onChange={handleCheckboxChange}
              sx={{ color: "#5A5E70", "&.Mui-checked": { color: "#4c94ff" } }}
            />
            <Typography variant="body2" sx={{ color: "#5A5E70" }}>
              I understand that if I lose my recovery phrase, I cannot recover my account.
            </Typography>
          </Box>

          <Button
            variant="contained"
            disabled={!isChecked}
            sx={{
              width: "100%",
              maxWidth: "300px",
              backgroundColor: isChecked ? "#EDEDED" : "#D3D3D3",
              color: isChecked ? "#2D2E36" : "#A0A0A0",
              cursor: isChecked ? "pointer" : "not-allowed",
              "&:hover": {
                backgroundColor: isChecked ? "#EDEDED" : "#D3D3D3",
              },
            }}
            onClick={() => isChecked && navigate("/balance")}
          >
            Next
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default SecretRecoveryPhrase;
