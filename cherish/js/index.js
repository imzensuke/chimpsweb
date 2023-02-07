var chimpers = null;
var contract = null;
const chimpsAddress = "0xfb035Ab15A174F6c0702901e7b2A24DB8f8cD026";
const treeHouseAddress = "0xA9c5Cc3CA2723136CbFe61f2256d05946F2fbe42";
const wwDOGEAddress = "0xB7ddC6414bf4F5515b52D8BdD69973Ae205ff101";
const cherishedChimpsAddress = "0xccf3f232bE95B316040b49C3AFbFD73d5B83E61c";

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
        wwDOGE = new web3.eth.Contract(wwDOGEABI, wwDOGEAddress);
        cchimps = new web3.eth.Contract(ccABI, cherishedChimpsAddress);
        treeHouse = new web3.eth.Contract(treeHouseAbi, treeHouseAddress);
        
        var cherishedNFT = chimpsNFT.methods.balanceOf("0xA9c5Cc3CA2723136CbFe61f2256d05946F2fbe42").call({ from: chimpers })
            .then(function (result) {
                document.getElementById('tchimp').textContent = result;
            });
        //
       var treeHouseBal = wwDOGE.methods.balanceOf("0xA9c5Cc3CA2723136CbFe61f2256d05946F2fbe42").call({ from: chimpers })
           .then(function (result) {
                document.getElementById('thb').textContent = result;
            });
        
        var customerChimps = cchimps.methods.balanceOf("0xA9c5Cc3CA2723136CbFe61f2256d05946F2fbe42").call({ from: chimpers })
            .then(function (result) {
                document.getElementById('cchimp').textContent = result;
            });
        var chimpsInWallet = chimpsNFT.methods.balanceOf(chimpers).call({ from: chimpers })
            .then(function (result) {
                document.getElementById('wchimp').textContent = result;
            });
        
    }else{
        document.getElementById('mmwallet').textContent = "Failed! :<";
        document.getElementById('cherishChimp').textContent = "Metamask Required! :<";
        document.getElementByClassName('ccmchimp').textContent = "Metamask Required! :<";
    }
}
