# CoinGuard

**A Web-Based Cryptocurrency HD Wallet**

CoinGuard is a web-based cryptocurrency hierarchical deterministic (HD) wallet application designed to provide a secure and intuitive interface for managing digital assets. Currently, the wallet supports Ethereum and Solana, offering features such as mnemonic generation, seed derivation, and multi-account management, all adhering to industry standards like BIP-44.


## Features

- **Hierarchical Deterministic Wallet**:
  - Implements BIP-44 standards for mnemonic generation and seed derivation.
  - Supports multi-account functionality with unique address indices for Ethereum and Solana.

- **Blockchain Compatibility**:
  - Ethereum (Coin Type: `60`)
  - Solana (Coin Type: `501`)

- **Secure Key Management**:
  - Utilizes `bip39`, `ed25519-hd-key`, and `nacl` for mnemonic-based keypair derivation.
  - Handles public and private key generation while ensuring user privacy.

- **Persistent State Management**:
  - React Context API for state handling.
  - Data persistence via LocalStorage for mnemonic, seed, and account information.

## Tech Stack

- **Frontend**: React, TypeScript
- **Key Derivation Libraries**: Bip39, Ed25519-hd-key, Nacl
- **Blockchain SDKs**: Web3.js (Ethereum), Solana Web3.js (Solana)
- **State Management**: React Context API

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/aaryanpraveen16/CoinGuard.git
    cd coinguard
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

4. Access the app in your browser:
    ```
    http://localhost:3000
    ```

## Usage

1. **Generate Recovery Phrase**: Start by generating a 12-word mnemonic recovery phrase.
2. **Add Accounts**:
    - Select a blockchain (Ethereum or Solana).
    - Generate accounts with unique public/private keys and address indices.
3. **View Balances**: Check account balances and manage multiple addresses.

## File Structure

```
coinguard/
├── src/
│   ├── components/    # Reusable UI components
│   ├── context/       # React Context for global state management
│   ├── services/      # Key derivation and wallet logic
│   ├── pages/         # Application pages (e.g., BalancePage, RecoveryPage)
│   ├── App.tsx        # Main application entry point
│   └── index.tsx      # React DOM rendering
├── public/            # Public assets and HTML template
├── package.json       # Project metadata and dependencies
└── README.md          # Project documentation
```

## Key Commands

- **Run the development server**:
    ```bash
    npm run dev
    ```


## License

This project is licensed under the MIT License.


## Contact

For questions or feedback, feel free to reach out:
- **Email**: aaryan.praveen@gmail.com
- **GitHub**: [aaryanpraveen16]([https://github.com/your-username](https://github.com/aaryanpraveen16/aaryanpraveen16))



