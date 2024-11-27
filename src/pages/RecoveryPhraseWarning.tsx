import IconTextComponent from "../components/IconTextComponent";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function RecoveryPhraseWarning() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };
  return (
    <>
      <div className="page-container">
        <div className="col-container">
          <h1 style={{ marginBottom: "40px" }}>
            Secret Recovery Phrase Warning
          </h1>
          <p style={{ color: "#5A5E70" }}>
            On the next page, you will receive your secret
          </p>
          <p style={{ marginBottom: "30px", color: "#5A5E70" }}>
            recovery phrase
          </p>
          <IconTextComponent
            style={{ marginBottom: "10px" }}
            icon={faTriangleExclamation}
            text={
              "This is the only way to recover your account if you lose access to your device or password."
            }
          />
          <IconTextComponent
            style={{ marginBottom: "10px" }}
            icon={faLock}
            text={
              "Write it down, store it in a safe place, and never share it with anyone."
            }
          />
          <div
            className="checkbox-wrapper-13"
            style={{ marginBottom: "20px", width: "90%",display:"flex" }}
          >
            <input
            style={{marginRight:"10px"}}
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
          onClick={() => isChecked && navigate("/secret-recovery-phrase")} // Prevent navigation if unchecked
        />

        </div>
      </div>
    </>
  );
}

export default RecoveryPhraseWarning;
