let userAddress = ""; // Holds the Ethereum address entered by the user

// Smart contract details
const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your deployed contract address
const contractABI = [ /* Replace with your contract ABI */ ];

async function startCourse() {
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
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step3").classList.remove("hidden");
}

// Function to interact with the smart contract and mint the NFT
async function mintCertificate() {
  if (!window.ethereum) {
    alert("Please install MetaMask to proceed!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  try {
    // Call the smart contract to mint the NFT
    const tx = await contract.completeCourse(userAddress);
    await tx.wait();

    // Update the UI to show the certificate
    generateNFT();
    alert("NFT Certificate minted successfully!");
  } catch (err) {
    console.error("Error minting certificate:", err);
    alert("Failed to mint NFT. Please try again.");
  }
}

function generateNFT() {
  document.getElementById("step3").classList.add("hidden");
  document.getElementById("certificate").classList.remove("hidden");
  document.getElementById("walletDisplay").innerText = userAddress;
}

function copyAddress() {
  navigator.clipboard.writeText(userAddress);
  alert("Wallet address copied! Use it to mint your certificate on Remix.");
}
