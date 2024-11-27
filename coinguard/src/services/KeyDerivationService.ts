import { HDNodeWallet, Mnemonic} from "ethers"; // For generating public keys (Bitcoin/Ethereum-specific)
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

export const deriveKeyPairForEthereum = async (mnemonicString:Mnemonic,path:string) => {
  const etherWallet:HDNodeWallet = HDNodeWallet.fromMnemonic(mnemonicString,path);
  const privateKey = etherWallet.privateKey;
  const publicKey = await etherWallet.getAddress();
  console.log(etherWallet.privateKey,"private key");
  console.log(etherWallet.getAddress(),"public key");
  return {privateKey,publicKey};
};

export const deriveKeyPairForSolana = (seed:string,derivationPath:string) => {
  console.log(typeof derivationPath, seed);
    const {key,chainCode} = derivePath(derivationPath, seed);
    const privateKey = nacl.sign.keyPair.fromSeed(key).secretKey;
    const publicKey = Keypair.fromSecretKey(privateKey).publicKey.toBase58();
    return{privateKey,publicKey};
};
