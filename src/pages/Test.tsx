import { mnemonicToSeedSync } from 'bip39';
import React, { useEffect } from 'react'
import { deriveKeyPairForEthereum } from '../services/KeyDerivationService';
import { Mnemonic } from 'ethers';

function Test() {
  useEffect(() => {
    const mnemonicString = "have glad high peanut seven bicycle expect lounge resist demand unable phone";
    const mnemonic = Mnemonic.fromPhrase(mnemonicString);
    const derivationPath =  "m/44'/60'/0'/0'"
    deriveKeyPairForEthereum(mnemonic,derivationPath);
  }, [])
  return (
    <div>Test</div>
  )
}

export default Test