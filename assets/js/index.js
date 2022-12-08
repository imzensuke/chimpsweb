var chimpers = null;
var contract = null;
const chimpsAddress = "0xfb035Ab15A174F6c0702901e7b2A24DB8f8cD026";
const oldChimpsAddress = "0xDB89785426FCcded4C2A24EB6De11c964179561c";

document.getElementById('mmwallet').onclick = async () => {
    if (window.ethereum){
        await window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum);
        var accounts = await web3.eth.getAccounts();
        chimpers = accounts[0];
        document.getElementById('mmwallet').textContent = "Connected";
        document.getElementById('addy').textContent = chimpers;
        chimpsNFT = new web3.eth.Contract(chimpsNFTAbi, chimpsAddress);
        oldChimpsNFT = new web3.eth.Contract(oldChimpsAbi, oldChimpsAddress);
        
        // take approval for oldChimps
        document.getElementById('oldApprove').onclick = async () => {
            var content = "requesting approval for all oldChimps";
            $("#chimpspan").html(content);
            oldChimpsNFT.methods.setApprovalForAll("0xfb035Ab15A174F6c0702901e7b2A24DB8f8cD026", true).send({ from: chimpers })
            .then(function (receipt) {
                console.log(receipt);
                var content = "approved oldChimps!:)";
                $("#chimpspan").html(content);
            });;
        }
        
        // remint nfts...
        document.getElementById('remint').onclick = async () => {
            var content = "requesting remint from: ";
            content += chimpers;
            $("#chimpspan").html(content);
            chimpsNFT.methods.mintOwners().send({ from: chimpers, gasPrice: 258000000000 })
            .then(function (receipt) {
                console.log(receipt);
                var content = "reminted 25 chimps!:) ";
                $("#chimpspan").html(content);
            });;
        }
    }
}
