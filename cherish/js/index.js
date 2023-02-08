var chimpers = null;
var contract = null;
const chimpsAddress = "0xfb035Ab15A174F6c0702901e7b2A24DB8f8cD026";
const treeHouseAddress = "0x8f1C648d3e2F9f8DeC269397f288DA5c2A73c691";
const wwDOGEAddress = "0xB7ddC6414bf4F5515b52D8BdD69973Ae205ff101";
const cherishedChimpsAddress = "0x58AD22348216bdb0A3a544Ad365eE82187D0E8aa";
const cherishPoolAddress = "0x4fE2e898cFC9E26d2F73B2111b5cdca4105989A9";

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
        cherishPool = new web3.eth.Contract(cherishPoolAbi, cherishPoolAddress);
        
        var cherishedNFT = chimpsNFT.methods.balanceOf("0x8f1C648d3e2F9f8DeC269397f288DA5c2A73c691").call({ from: chimpers })
            .then(function (result) {
                document.getElementById('tchimp').textContent = result;
            });
        //
       var treeHouseBal = wwDOGE.methods.balanceOf("0x8f1C648d3e2F9f8DeC269397f288DA5c2A73c691").call({ from: chimpers })
           .then(function (result) {
               var content = JSON.stringify(result.toString() / 1000000000000000000);
               var contente = Number(content).toFixed(3);
                contente += " wwDOGE";
                document.getElementById('thb').textContent = contente;
            });
        
        var customerChimps = cchimps.methods.balanceOf("0x8f1C648d3e2F9f8DeC269397f288DA5c2A73c691").call({ from: chimpers })
            .then(function (result) {
                document.getElementById('cchimp').textContent = result;
            });
        var chimpsInWallet = chimpsNFT.methods.balanceOf(chimpers).call({ from: chimpers })
            .then(function (result) {
                document.getElementById('wchimp').textContent = result;
            });
        var currnPool = cherishPool.methods.calculatePool().call({ from: chimpers })
            .then(function (result) {
                var content = JSON.stringify(result.toString() / 1000000000000000000);
                document.getElementById('currPool').textContent = "PartyPool: " + content;
            });
        
        var currnMultiplier = cherishPool.methods.multiplier().call({ from: chimpers })
            .then(function (result) {
                document.getElementById('multiplier').textContent = "PoolMultiplier: " + result + "x";
            });
        
        document.getElementById('currPool').onclick = async () => {
            var content = "Loading Pool Value:";
            document.getElementById('currPool').textContent = content;
            var event = cherishPool.methods.calculatePool().call({ from: chimpers })
                .then(function (result) {
                    var content = JSON.stringify(result.toString() / 1000000000000000000);
                    document.getElementById('currPool').textContent = "PartyPool: " + content;
                });;
        };
        
        document.getElementById('claimCrrPool').onclick = async () => {
            var content = "Verifing..";
            document.getElementById('claimCrrPool').textContent = content;
            var event = cherishPool.methods.cherisherClaim().send({ from: chimpers })
                .then(function (result) {
                    var content = "Claimed Extra Wages!";
                    document.getElementById('claimCrrPool').textContent = content;
                });;
        };
        
        
        document.getElementById('approveAll').onclick = async () => {
            var content = "Allowing Chimps..";
            document.getElementById('approveAll').textContent = content;
            var event = chimpsNFT.methods.setApprovalForAll("0x8f1C648d3e2F9f8DeC269397f288DA5c2A73c691", true).send({ from: chimpers })
                .then(function (result) {
                    console.log(result);
                    var content = "Allowed Chimps!";
                    document.getElementById('approveAll').textContent = content;
                });;
        };
        
        document.getElementById('approveCC').onclick = async () => {
            var content = "Allowing CChimps..";
            document.getElementById('approveCC').textContent = content;
            var event = cchimps.methods.setApprovalForAll("0x8f1C648d3e2F9f8DeC269397f288DA5c2A73c691", true).send({ from: chimpers })
                .then(function (result) {
                    console.log(result);
                    var content = "Allowed CChimps!";
                    document.getElementById('approveCC').textContent = content;
                });;
        };
        
        document.getElementById('cherishChimp').onclick = async () => {
            var tokenId = $("#cnftid").val();
            var content = "Joining..Cherishment TreeHouse";
            document.getElementById('cherishChimp').textContent = content;
            var event = treeHouse.methods.startCherish(tokenId).send({ from: chimpers, value: 100000000000000000 })
                .then(function (receipt) {
                    console.log(receipt);
                    var content = "Joined Cherishment TreeHouse!";
                    document.getElementById('cherishChimp').textContent = content;
                });;
        };
        
        document.getElementById('viewRewards').onclick = async () => {
            var tokenId = $("#mgChimp").val();
            var content = "Calculating income..";
            document.getElementById('viewRewards').textContent = content;
            var event = treeHouse.methods.calculateIncome(tokenId).call({ from: chimpers })
                .then(function (receipt) {
                    console.log(receipt);
                    var content = "wwDOGE Income: ";
                    content += JSON.stringify(receipt.toString() / 1000000000000000000);
                    document.getElementById('viewRewards').textContent = content;
                });;
        };
        
        document.getElementById('claimRewards').onclick = async () => {
                var tokenId = $("#mgChimp").val();
                var content = "Verifing Income...";
                document.getElementById('claimRewards').textContent = content;
                var event = treeHouse.methods.incomeOfChimp(tokenId).send({ from: chimpers })
                    .then(function (receipt) {
                        console.log(receipt);
                        var content = "Claimed!";
                        document.getElementById('claimRewards').textContent = content;
                    });;
            };
        
        document.getElementById('fchimp').onclick = async () => {
            var content = "";
        var event = cchimps.methods.balanceOf(chimpers).call({ from: chimpers })
        .then(function (result) {
    balance = result;
    for(var i = 0; i < balance; i++){
    var event = cchimps.methods.tokenOfOwnerByIndex(chimpers, i).call({ from: chimpers })
        .then(function (result) {
    var event = cchimps.methods.tokenURI(Number(result)).call()
        .then(function (result1) {
            var content = "";
    content += " Id: " + result;
    document.getElementById('fchimp').textContent = "Refresh";
            $("#fchimp2").html(content);
    });
    });
    };
    });
        };
        
        document.getElementById('unCherish').onclick = async () => {
            var tokenId = $("#mgChimp").val();
            var content = "Leaving TreeHouse..";
            document.getElementById('unCherish').textContent = content;
            var event = treeHouse.methods.unCherish(tokenId).send({ from: chimpers, value: 100000000000000000 })
                .then(function (receipt) {
                    console.log(receipt);
                    var content = "Left! :<";
                    document.getElementById('unCherish').textContent = content;
                });;
        };
        
    }else{
        document.getElementById('mmwallet').textContent = "Failed! :<";
        document.getElementById('cherishChimp').textContent = "Metamask Required! :<";
        document.getElementByClassName('ccmchimp').textContent = "Metamask Required! :<";
    }
}
