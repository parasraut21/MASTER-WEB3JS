let Web3 = require("web3");

let web3 = new Web3("HTTP://127.0.0.1:7545") ; // this will help us to get connected with blockchain , bring the link from the RPC server from ganache .

// console.log(web3); // we get lots of methods 


async function getBalance (){ // async bcoz we are going to get lots of promises

    const balance = await web3.eth.getBalance("0x03eAb4e3dB37A592191Af7647580222c2da3809E");

    console.log(balance); // // 100000000000000000000 wei

    const balanceToEther = await web3.utils.fromWei(balance, "ether"); 

    const balanceToWei = await web3.utils.toWei(balanceToEther, "ether"); 

    console.log(balanceToWei," - ",balanceToEther);

}   
getBalance(); 


async function sendEther() {
     var txnHash = await web3.eth.sendTransaction({ 
         from: "0x03eAb4e3dB37A592191Af7647580222c2da3809E", 
         to: "0x31FBA064F3C61Ec7D4b828c50d263b73257fE806", 
         value: web3.utils.toWei("1", "ether"), 
        });
         console.log("Transfer successful"); 
        }
sendEther();












