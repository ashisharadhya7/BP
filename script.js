let userAddress = "";

function startCourse() {
  const input = document.getElementById("walletInput").value.trim();
  if (!/^0x[a-fA-F0-9]{40}$/.test(input)) {
    alert("Please enter a valid Ethereum address.");
    return;
  }

  userAddress = input;
  document.getElementById("step1").classList.add("hidden");
  document.getElementById("step2").classList.remove("hidden");
}

function showCompletion() {
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step3").classList.remove("hidden");
}

function generateNFT() {
  document.getElementById("step3").classList.add("hidden");
  document.getElementById("certificate").classList.remove("hidden");
  document.getElementById("walletDisplay").innerText = userAddress;
}

function copyAddress() {
  navigator.clipboard.writeText(userAddress);
  alert("Wallet address copied! Head to Remix and mint your certificate.");
}
