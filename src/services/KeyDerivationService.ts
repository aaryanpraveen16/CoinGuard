import { HDNodeWallet, Mnemonic} from "ethers"; // For generating public keys (Bitcoin/Ethereum-specific)
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

console.log(derivePath); // Should not be undefined

export const deriveKeyPairForEthereum = async (mnemonicString:Mnemonic,path:string) => {
  const etherWallet:HDNodeWallet = HDNodeWallet.fromMnemonic(mnemonicString,path);
  const privateKey = etherWallet.privateKey;
  const publicKey = await etherWallet.getAddress();
  console.log(etherWallet.privateKey,"private key");
  console.log(etherWallet.getAddress(),"public key");
  return {privateKey,publicKey};
};
export const deriveKeyPairForSolana = (seed:any,derivationPath:any) => {
    const key = derivePath(derivationPath, seed).key;
    const secret = nacl.sign.keyPair.fromSeed(key).secretKey;
    const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
    const privateKey = Buffer.from(Keypair.fromSecretKey(secret).secretKey).toString("base64");
    return{privateKey,publicKey};
};
