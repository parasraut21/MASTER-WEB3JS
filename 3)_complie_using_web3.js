
// const solc = require("solc");
// const fs = require("fs"); // file system - read and write files to your computer . // ganache - local blockchain
// const Web3 = require("web3"); // // web3 interface

// // Setup a HTTP provider for web3
// const web3 = new Web3("http://127.0.0.1:7545");

// // Read the file contents of the smart contract
// const fileContent = fs.readFileSync("demo.sol", "utf8");
// console.log(fileContent);

// // Create an input structure for the Solidity compiler
// const input = {
//   language: "Solidity",
//   sources: {
//     "demo.sol": {
//       content: fileContent,
//     },
//   },
//   settings: {
//     outputSelection: {
//       "*": {
//         "*": ["*"],
//       },
//     },
//   },
// };

// // Compile the Solidity code
// const output = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log("Output: ", output);

// // Check if the compilation was successful and access contract information
// if (output.contracts && output.contracts["demo.sol"] && output.contracts["demo.sol"]["demo"]) {
//   var ABI = output.contracts["demo.sol"]["demo"].abi;
//   var bytecode = output.contracts["demo.sol"]["demo"].evm.bytecode.object;
//   console.log("Bytecode: ", bytecode);
//   console.log("ABI: ", ABI);
// } else {
//   console.log("Error: Unable to access contract information in the output object.");
// }


// contract = new web3.eth.Contract(ABI);
//  let defaultAccount;
//   web3.eth.getAccounts().then((accounts) => {
//        console.log("Accounts:", accounts); //it will show all the ganache accounts

// defaultAccount = accounts[0]; 

// console.log("Default Account:", defaultAccount); //to deploy the contract from default Account 

// contract.deploy({ data: bytecode })
//   .send({ from: defaultAccount, gas: 80000 })
//   .on("receipt", (receipt) => {
//     console.log("Contract Address:", receipt.contractAddress);
//   })
//   .then((demoContract) => {
//     demoContract.methods.x().call((err, data) => {
//       console.log("Initial Value:", data);
//     });
//   });
// })

const solc = require("solc");
const fs = require("fs");
const Web3 = require("web3");

// Create a web3 instance
const web3 = new Web3("http://127.0.0.1:7545"); // Replace with your desired provider URL

// Read the Solidity source code from file
const fileContent = fs.readFileSync("demo.sol", "utf-8");

// Compile the Solidity contract
const input = {
  language: "Solidity",
  sources: {
    "demo.sol": {
      content: fileContent,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const compiledData = JSON.parse(solc.compile(JSON.stringify(input)));
const contractBytecode = compiledData.contracts["demo.sol"]["demo"].evm.bytecode.object;
const contractABI = compiledData.contracts["demo.sol"]["demo"].abi;

// Create a new contract instance
const contract = new web3.eth.Contract(contractABI);

// Deploy the contract
const deployContract = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    const defaultAccount = accounts[0];

    const deployedContract = await contract
      .deploy({
        data: "0x" + contractBytecode,
      })
      .send({
        from: defaultAccount,
        gas: 6721975, // Adjust the gas limit according to your contract's requirement
      });

    console.log("Contract deployed at address:", deployedContract.options.address);

    // Interact with the contract
    const xValue = await deployedContract.methods.getX().call();
    console.log("Current value of x:", xValue);

    await deployedContract.methods.setX(20).send({ from: defaultAccount });

    const updatedXValue = await deployedContract.methods.getX().call();
    console.log("Updated value of x:", updatedXValue);
  } catch (error) {
    console.error("Error deploying contract:", error);
  }
};

deployContract();
