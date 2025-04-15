let userAddress = ""; // Holds the Ethereum address entered by the user

// Smart contract details
const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your deployed contract address
const contractABI = [
  // Replace with your contract ABI
];

function startCourse() {
  const input = document.getElementById("walletInput").value.trim();

  // Validate Ethereum address
  if (!/^0x[a-fA-F0-9]{40}$/.test(input)) {
    alert("Please enter a valid Ethereum address.");
    return;
  }

  userAddress = input;

  // Show the next step in the UI
  document.getElementById("step1").classList.add("hidden");
  document.getElementById("step2").classList.remove("hidden");
}

function showCompletion() {
  // Move to the NFT minting step
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step3").classList.remove("hidden");
}

async function mintCertificate() {
  // Check if MetaMask is installed
  if (!window.ethereum) {
    alert("Please install MetaMask to proceed!");
    return;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // Interact with the contract to mint the certificate
    const tx = await contract.completeCourse(userAddress);
    await tx.wait();

    // Notify the user and update the UI
    generateNFT();
    alert("NFT Certificate minted successfully!");
  } catch (err) {
    console.error("Error minting certificate:", err);
    alert("Failed to mint NFT. Please try again.");
  }
}

function generateNFT() {
  // Show the certificate UI and display the wallet address
  document.getElementById("step3").classList.add("hidden");
  document.getElementById("certificate").classList.remove("hidden");
  document.getElementById("walletDisplay").innerText = userAddress;
}

function copyAddress() {
  // Copy the wallet address to the clipboard
  navigator.clipboard.writeText(userAddress);
  alert("Wallet address copied! Use it to mint your certificate on Remix.");
}
