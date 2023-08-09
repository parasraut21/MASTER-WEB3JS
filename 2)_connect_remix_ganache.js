const Contract = require("web3-eth-contract") ;

Contract.setProvider("HTTP://127.0.0.1:7545") ; // since we are taking with the ganach blockchain .

 async function instanceContract(){ // this will provide the instance of smart contract which we are going to use .
    
    ABI = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_x",
                    "type": "uint256"
                }
            ],
            "name": "setX",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getX",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    ContractAddress = "0x0244C0caf029824ae90A21E2366129680eFc2bFA" ;
    const contract = new Contract(ABI,ContractAddress) ; // here we got the instance of our smart contract  

    //console.log(contract)

    //get
    contract.methods.getX().call({from : "0xD78D6F2e6E0E261d0FA43C1C0c56c105ebD2dE5C"}).then(console.log) // 10

    // whenever we are going to chnage the state of your smart contract in any way then use the send function
    
    //set
    contract.methods.setX(18).send({from : "0xD78D6F2e6E0E261d0FA43C1C0c56c105ebD2dE5C"}) ;

    //console.log the new value 
    contract.methods.getX().call({from : "0xD78D6F2e6E0E261d0FA43C1C0c56c105ebD2dE5C"}).then(console.log) ;

}
instanceContract() ;






