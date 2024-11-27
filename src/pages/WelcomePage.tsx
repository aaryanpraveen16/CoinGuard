import Button from "../components/Button";
import goldCoin from "../assets/coin-gold.svg";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="page-container">
        <div className="col-container">
          <img className="logo" src={goldCoin} alt="" />
          <h1>Welcome to CoinGuard</h1>
          <p style={{ color: "#5A5E70" }}>Lets get Started</p>
          <div className="col-container">
            <Button
              buttonText="Create a new wallet"
              backgroundColor={"#EDEDED"}
              size="medium"
              style={{
                color: "#2D2E36",
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
              }}
              onClick={() => navigate('/select-network')}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default WelcomePage;
