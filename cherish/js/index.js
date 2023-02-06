var chimpers = null;
var contract = null;
const chimpsAddress = "0xfb035Ab15A174F6c0702901e7b2A24DB8f8cD026";

document.getElementById('mmwallet').onclick = async () => {
    if (window.ethereum){
        await window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum);
        var accounts = await web3.eth.getAccounts();
        chimpers = accounts[0];
        document.getElementById('mmwallet').textContent = "Connected";
        console.log(chimpers);
        document.getElementById('addy').textContent = chimpers;
        chimpsNFT = new web3.eth.Contract(chimpsNFTAbi, chimpsAddress);
        var cherishedNFT = chimpsNFT.methods.balanceOf("0xA9c5Cc3CA2723136CbFe61f2256d05946F2fbe42").call();
        document.getElementById('tchimp').textContent = cherishedNFT;
        //
    }
}
