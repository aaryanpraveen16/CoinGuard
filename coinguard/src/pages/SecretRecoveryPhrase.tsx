import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import Button from "../components/Button";
import { useMnemonic } from "../context/MnemonicContext";

function SecretRecoveryPhrase() {
  const navigate = useNavigate();
  // const [mnemonic, setmnemonic] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const {setMnemonicString, setSeedState } = useMnemonic();
  const [mnemonicArray, setMnemonicArray] = useState<string[]>([]);
  const [mnemonicString, setMnemonicStringState] = useState<string>(""); // Full mnemonic string
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };
  // Generate a 12-word mnemonic
  useEffect(() => {
    const mnemonic = generateMnemonic(128); // Generate mnemonic
    setMnemonicArray(mnemonic.split(" ")); // Split mnemonic into words
    setMnemonicStringState(mnemonic); // Save full mnemonic as a string
    setMnemonicString(mnemonic); // Save to context
    const seed:string = mnemonicToSeedSync(mnemonic).toString("hex"); // Generate seed
    setSeedState(seed); // Save seed to context as hex string
    console.log("Generated Seed:", seed);
  }, []); // Dependencies: Only context setters

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mnemonicString);
    alert("Recovery Phrase copied to clipboard!");
  };
  return (
    <>
      <div className="page-container">
        <div
          className="col-container"
          style={{ display: "flex", flexDirection: "column", gap: "2vh" }}
        >
          <h1>Secret Recovery Phrase</h1>
          <p style={{ color: "#5A5E70" }}>Save these words in a safe place</p>
          <p
            style={{ color: "#4c94ff", cursor: "pointer" }}
            onClick={() => navigate("/recovery-phrase-warning")}
          >
            Read the warnings again
          </p>
          <div className="grid-container" onClick={(e)=>copyToClipboard()}>
            {mnemonicArray.map((mnemonicWord: string,index:number) => (
              <div className="grid-item" key={index}>{mnemonicWord}</div>
            ))}

            <hr style={{ border: "1px solid #ffffff1a", width: "100%" }} />
            <div className="card-text-container">
              <p style={{ color: "#5A5E70", textAlign: "center" }}>
                Click anywhere on this card to copy
              </p>
            </div>
          </div>
          <div
            className="checkbox-wrapper-13"
            style={{ marginBottom: "20px", width: "90%", display: "flex", justifyContent:"center" }}
          >
            <input
              style={{ marginRight: "10px" }}
              id="recoveryPhraseAcknowledgment"
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="recoveryPhraseAcknowledgment">
              I understand that if I lose my recovery phrase, I cannot recover
              my account.
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
            }}
            onClick={() => isChecked && navigate("/balance")} // Prevent navigation if unchecked
          />
        </div>
      </div>
    </>
  );
}

export default SecretRecoveryPhrase;
