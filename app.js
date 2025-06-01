
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const walletAddress = accounts[0];
            document.getElementById('walletAddress').textContent = walletAddress;
        } catch (error) {
            console.error("User denied account access");
        }
    } else {
        alert("Please install MetaMask to use this feature.");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const connectBtn = document.getElementById("connectButton");
    if (connectBtn) {
        connectBtn.addEventListener("click", connectWallet);
    }
});
