# Smart Contract Management

## Overview

The **Smart Contract Management** project aims to create a simple Ethereum smart contract with 2-3 functions and display the values of those functions in the frontend of the application. The project leverages Metamask for wallet connectivity and interacts with the Ethereum blockchain.

## Project Structure

- **Frontend**: The frontend of the application is built using React.js and communicates with the Ethereum smart contract.
  - File: `pages/index.js`
  - Functions:
    - `initializeWallet`: Initializes the Metamask wallet connection.
    - `handleAccount`: Handles the connected account (address) from Metamask.
    - `connectToWallet`: Connects to the Metamask wallet and retrieves the account.
    - `getATMContract`: Retrieves the deployed smart contract instance.
    - `fetchBalance`: Fetches the account balance from the smart contract.
    - `depositFunds`: Deposits 1 ETH into the smart contract.
    - `withdrawFunds`: Withdraws 1 ETH from the smart contract.
    - `checkWalletConnection`: Displays wallet connection status and account balance.
    - `transferFunds`: Transfers funds to a specified recipient.
    - `getContractOwner`: Retrieves the contract owner's address.

## Smart Contract

- **Contract File**: `contracts/assignment.sol`
- Functions:
  - `getBalance()`: Returns the contract balance.
  - `deposit(uint256 _amount)`: Deposits funds into the contract.
  - `withdraw(uint256 _withdrawAmount)`: Withdraws funds from the contract.
  - `getContractOwner()`: Returns the contract owner's address.

## Usage

1. Install Metamask and connect to the Ethereum mainnet or testnet.
2. Deploy the smart contract to an Ethereum network.
3. Run the React frontend locally (`npm start`).
4. Connect your Metamask wallet.
5. Interact with the functions:
   - Deposit funds.
   - Withdraw funds.
   - Get account balance.
   - Transfer funds.
   - Get contract owner.
  
## License
This project is licensed under the MIT License. You can find the full license text in the LICENSE.md file.

## Author

- **Aditya Tiwari**
