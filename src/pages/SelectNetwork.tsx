import React from "react";
import IconTextComponent from "../components/IconTextComponent";
import SolanaIcon from "../assets/solana-sol-logo.png";
import EthereumIcon from "../assets/ethereum.png";
import { useNavigate } from "react-router-dom";
import { useMnemonic } from "../context/MnemonicContext";

function SelectNetwork() {
  const navigate = useNavigate();
  const { addAccount , accounts} = useMnemonic();

  const handleNetworkSelection = (coin: string) => {
    const coinMapping: { [key: string]: number } = {
      solana: 501,
      ethereum: 60,
    };

    const selectedCoinType = coinMapping[coin] || 0;
    addAccount({
      id: accounts.length,
      username: "",
      mnemonicString:"",
      type: selectedCoinType,
      wallets: [{
        id: 0, 
        publicKey: "",
        privateKey:"",
        seed:"",
        balance:0,
      }],
    });
    console.log(selectedCoinType);
    navigate("/recovery-phrase-warning");
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#0E0F14",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#EDEDED",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
          padding: "2rem",
          borderRadius: "8px",
        }}
      >
        <h1 style={{ marginBottom: "40px", color: "#EDEDED" }}>Select Network</h1>
        <p style={{ color: "#5A5E70", marginBottom: "10px" }}>
          Coinguard supports multiple blockchains
        </p>
        <p style={{ marginBottom: "30px", color: "#5A5E70" }}>
          Which do you want to use? You can add more later
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px", // Space between the components
          }}
        >
          <IconTextComponent
            onClick={() => handleNetworkSelection("solana")}
            style={{
              backgroundColor: "#333",
              padding: "10px 20px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              transition: "background-color 0.2s ease-in-out",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            }}
            icon={SolanaIcon}
            text="Solana"
          />
          <IconTextComponent
            onClick={() => handleNetworkSelection("ethereum")}
            style={{
              backgroundColor: "#333",
              padding: "10px 20px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              transition: "background-color 0.2s ease-in-out",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            }}
            icon={EthereumIcon}
            text="Ethereum"
          />
        </div>
      </div>
    </div>
  );
}

export default SelectNetwork;
