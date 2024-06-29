import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [recipient, setRecipient] = useState("");
  const [transferAmount, setTransferAmount] = useState(0);
  const [contractBalance, setContractBalance] = useState(undefined);
  const [ownerAddress, setOwnerAddress] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const initializeWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectToWallet = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const fetchBalance = async () => {
    if (atm) {
      const updatedBalance = await atm.getBalance();
      setBalance(updatedBalance.toNumber());
    }
  };

  const depositFunds = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      await fetchBalance();
    }
  };

  const withdrawFunds = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      await fetchBalance();
    }
  };

  const checkWalletConnection = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    if (!account) {
      return <button onClick={connectToWallet}>Please connect your Metamask wallet</button>;
    }

    if (balance === undefined) {
      fetchBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <button onClick={depositFunds}>Deposit 1 ETH</button>
        <button onClick={withdrawFunds}>Withdraw 1 ETH</button>
        <br />
        <button onClick={getContractOwner}>Get Account Owner</button>
        {ownerAddress && <p>Contract Owner: {ownerAddress}</p>}
      </div>
    );
  };

  const transferFunds = async () => {
    if (atm && recipient && transferAmount > 0) {
      let tx = await atm.transfer(recipient, ethers.utils.parseEther(transferAmount.toString()));
      await tx.wait();
      await fetchBalance();
      setRecipient("");
      setTransferAmount(0);
    }
  };

  const getContractOwner = async () => {
    if (atm) {
      const owner = await atm.getAccountOwner();
      setOwnerAddress(owner);
    }
  };

  useEffect(() => {
    initializeWallet();
  }, []);

  return (
    <main className="atm-container">
      <header>
        <h1>Welcome to the Metacrafters ATM!</h1>
      </header>
      {checkWalletConnection()}
      <div>
        {contractBalance !== undefined && <p>Contract Balance: {contractBalance}</p>}
      </div>
      <style jsx>{`
        .atm-container {
          text-align: center;
          background-color: #f0f0f0;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        header {
          margin-bottom: 20px;
        }
        button {
          margin: 5px;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          background-color: #0070f3;
          color: white;
          cursor: pointer;
        }
        button:hover {
          background-color: #005bb5;
        }
        input {
          margin: 5px;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      `}</style>
    </main>
  );
}
