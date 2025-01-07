import React from "react";
import Button from "../components/Button";
import goldCoin from "../assets/coin-gold.svg";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();
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
          textAlign: "center",
          padding: "2rem",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <img className="logo" src={goldCoin} alt="CoinGuard Logo" style={{ marginBottom: "20px" }} />
        <h1 style={{ marginBottom: "20px" }}>Welcome to CoinGuard</h1>
        <p style={{ color: "#5A5E70", marginBottom: "30px" }}>Let's get Started</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px", alignItems: "center" }}>
          <Button
            buttonText="Create a new wallet"
            backgroundColor={"#EDEDED"}
            size="medium"
            style={{
              color: "#2D2E36",
              width: "100%",
              maxWidth: "400px",
              marginBottom: "10px",
            }}
            onClick={() => navigate("/select-network")}
          />
          <Button
            buttonText="Import Wallet"
            backgroundColor={"#2D2E36"}
            size="medium"
            style={{
              color: "#EDEDED",
              width: "100%",
              maxWidth: "400px",
            }}
            onClick={() => navigate('/select-network')}
          />
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
