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
        
        document.getElementById('mint').onclick = async () => {
            var amount = $("#mintAmount").val();
            var content = "minting chimps: " + amount;
            $("#chimpspan").html(content);
            chimpsNFT.methods.mint(amount).send({from: chimpers, gasPrice: 258000000000, value: 10000000000000000000 * amount }).then(function (receipt) {
                console.log(receipt);
                var content = "minted!";
                $("chimpspan").html(content);
            });;
        }
        //
    }
}
