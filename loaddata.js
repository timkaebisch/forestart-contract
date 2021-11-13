require("dotenv").config()
const { API_URL } = process.env; // get variables from .env


const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("./artifacts/contracts/FORESTART.sol/FORESTART.json"); // path to abi
const contractAddress = "0x4AC16984351AFf86d54388d7D5ae43B4C787eA0D" // address contract
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function getURI(id) {
    const uri = await nftContract.methods.tokenURI(id).call()
    console.log(uri)
}

getURI(1)

