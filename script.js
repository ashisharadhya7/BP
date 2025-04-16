const { ethers } = require("ethers");

// Replace with your Ethereum provider URL (e.g., Infura, Alchemy)
const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID");

// Replace with your wallet private key
const privateKey = "YOUR_PRIVATE_KEY";
const wallet = new ethers.Wallet(privateKey, provider);

// Contract address and ABI
const contractAddress = "0xe248de43bbda470C9cA0262d09865f53270ce76d";
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextTokenId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "mintedCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Create a contract instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Function to mint an NFT
async function mintNFT(toAddress) {
  try {
    console.log(`Minting NFT for address: ${toAddress}`);
    const tx = await contract.mint(toAddress);
    console.log("Transaction sent. Waiting for confirmation...");
    const receipt = await tx.wait();
    console.log("Minting successful! Transaction hash:", receipt.transactionHash);
  } catch (error) {
    console.error("Error minting NFT:", error.message);
  }
}

// Function to get the next token ID
async function getNextTokenId() {
  try {
    const nextTokenId = await contract.nextTokenId();
    console.log("Next Token ID:", nextTokenId.toString());
  } catch (error) {
    console.error("Error getting next token ID:", error.message);
  }
}

// Function to check how many NFTs a user has minted
async function getMintedCount(address) {
  try {
    const count = await contract.mintedCount(address);
    console.log(`Address ${address} has minted ${count.toString()} NFTs.`);
  } catch (error) {
    console.error("Error getting minted count:", error.message);
  }
}

// Example usage
(async () => {
  const recipientAddress = "0xRecipientAddressHere"; // Replace with the recipient's Ethereum address

  console.log("Fetching next token ID...");
  await getNextTokenId();

  console.log(`Checking minted count for: ${recipientAddress}`);
  await getMintedCount(recipientAddress);

  console.log(`Attempting to mint an NFT for: ${recipientAddress}`);
  await mintNFT(recipientAddress);
})();
