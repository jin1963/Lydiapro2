
const connectButton = document.getElementById('connectButton');
const walletInfo = document.getElementById('walletInfo');
const walletAddressDisplay = document.getElementById('walletAddress');
const stakedAmount = document.getElementById('stakedAmount');
const earnedAmount = document.getElementById('earned');

const stakingContractAddress = "0x6e9E4FBEeEd3DDb0B932a7dAc6A725e0497a63Ff";
const abi = [
  {
    "inputs": [],
    "name": "getUserInfo",
    "outputs": [
      { "internalType": "uint256", "name": "staked", "type": "uint256" },
      { "internalType": "uint256", "name": "earned", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

let provider, signer, contract;

connectButton.addEventListener('click', async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const userAddress = accounts[0];
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      contract = new ethers.Contract(stakingContractAddress, abi, signer);
      walletInfo.style.display = 'block';
      walletAddressDisplay.textContent = userAddress.slice(0, 6) + '...' + userAddress.slice(-4);
      loadUserData();
    } catch (err) {
      console.error("User denied access", err);
    }
  } else {
    alert("MetaMask not detected.");
  }
});

async function loadUserData() {
  try {
    const [staked, earned] = await contract.getUserInfo();
    stakedAmount.textContent = (staked / 1e18).toFixed(2);
    earnedAmount.textContent = (earned / 1e18).toFixed(2) + " LYDIA";
  } catch (err) {
    console.error("Failed to load user data", err);
  }
}

document.getElementById('claimButton').addEventListener('click', async () => {
  try {
    const tx = await contract.claimReward();
    await tx.wait();
    loadUserData();
  } catch (err) {
    console.error("Claim failed", err);
  }
});
