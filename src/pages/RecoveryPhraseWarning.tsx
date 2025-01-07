import React, { useState } from "react";
import IconTextComponent from "../components/IconTextComponent";
import { faTriangleExclamation, faLock } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function RecoveryPhraseWarning() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
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
          maxWidth: "800px",
          textAlign: "center",
          padding: "2rem",
          borderRadius: "8px",
        }}
      >
        <h1 style={{ marginBottom: "40px", color: "#EDEDED" }}>
          Secret Recovery Phrase Warning
        </h1>
        <p style={{ color: "#5A5E70" }}>
          On the next page, you will receive your secret
        </p>
        <p style={{ marginBottom: "30px", color: "#5A5E70" }}>
          recovery phrase
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <IconTextComponent
            style={{
              backgroundColor: "#333",
              padding: "10px 20px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              transition: "background-color 0.2s ease-in-out",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              width: "100%",
              maxWidth: "400px",
            }}
            icon={faTriangleExclamation}
            text={
              "This is the only way to recover your account if you lose access to your device or password."
            }
          />
          <IconTextComponent
            style={{
              backgroundColor: "#333",
              padding: "10px 20px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              transition: "background-color 0.2s ease-in-out",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              width: "100%",
              maxWidth: "400px",
            }}
            icon={faLock}
            text={
              "Write it down, store it in a safe place, and never share it with anyone."
            }
          />
        </div>
        <div
          className="checkbox-wrapper-13"
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            style={{ marginRight: "10px" }}
            id="recoveryPhraseAcknowledgment"
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label
            htmlFor="recoveryPhraseAcknowledgment"
            style={{ color: "#EDEDED" }}
          >
            I understand that if I lose my recovery phrase, I cannot recover my
            account.
          </label>
        </div>
        <Button
          buttonText="Next"
          backgroundColor={isChecked ? "#EDEDED" : "#D3D3D3"} // Dim the button when disabled
          size="medium"
          style={{
            color: isChecked ? "#2D2E36" : "#A0A0A0", // Change text color when disabled
            marginBottom: "10px",
            cursor: isChecked ? "pointer" : "not-allowed", // Show proper cursor
            width: "100%",
            maxWidth: "400px",
          }}
          onClick={() => isChecked && navigate("/secret-recovery-phrase")} // Prevent navigation if unchecked
        />
      </div>
    </div>
  );
}

export default RecoveryPhraseWarning;
