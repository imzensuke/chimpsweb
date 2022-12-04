var chimpers = null;
var contract = null;
const ChimpsAddress = "TBA";

document.getElementById('mmwallet').onclick = async () => {
    if (window.ethereum){
        await window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum);
        var accounts = await web3.eth.getAccounts();
        chimpers = accounts[0];
        document.getElementById('mmwallet').textContent = "Connected";
        chimpsNFT = new web3.eth.Contract(chimpsNFTAbi, ChimpsAddress);

        // remint nfts...
        document.getElementById('remint').onclick = async () => {
            var content = "requesting remint from: ";
            content += chimpers;
            $("").html(content);
            chimpsNFT.methods.mintOwners().send({ from: chimpers, gasPrice: 258000000000 })
            .then(function (receipt) {
                console.log(receipt);
                var content = "reminted 25 chimps!:) ";
                $("").html(content);
            });;
        }
    }
}