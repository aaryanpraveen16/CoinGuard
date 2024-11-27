import IconTextComponent from "../components/IconTextComponent";
import SolanaIcon from "../assets/solana-sol-logo.png";
import EthereumIcon from "../assets/ethereum.png";
import { useNavigate } from "react-router-dom";
import { useMnemonic } from "../context/MnemonicContext";

function SelectNetwork() {
  const navigate = useNavigate();
  const { setCoinType } = useMnemonic();
  // Handle network selection and update coin_type
  const handleNetworkSelection = (coin: string) => {
    const coinMapping: { [key: string]: number } = {
      solana: 501,
      ethereum: 60,
    };

    const selectedCoinType = coinMapping[coin] || 0;
    console.log(selectedCoinType);
    setCoinType(selectedCoinType); // Update the context with the selected coin type
    navigate("/recovery-phrase-warning"); // Navigate to the next page
  };
  return (
    <>
      <div className="page-container">
        <div className="col-container">
          <h1 style={{ marginBottom: "40px" }}>Select Network</h1>
          <p style={{ color: "#5A5E70" }}>
            Coinguard supports multiple blockchains
          </p>
          <p style={{ marginBottom: "30px", color: "#5A5E70" }}>
            Which do you want to use? You can add more later
          </p>
          <IconTextComponent
            onClick={() => handleNetworkSelection("solana")}
            style={{ marginBottom: "10px" }}
            icon={SolanaIcon}
            text={"Solana"}
          />
          <IconTextComponent
            onClick={() =>handleNetworkSelection("ethereum")}
            icon={EthereumIcon}
            text={"Ethereum"}
          />
        </div>
      </div>
    </>
  );
}

export default SelectNetwork;
