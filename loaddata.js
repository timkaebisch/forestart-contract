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

//getURI(1)

// get all nfts (id) for a certain address

async function getIDs(address) {

    const amount = await nftContract.methods.balanceOf(address).call()
    const ids = []

    for(i=1; i<= amount; i++){
        const owner = await nftContract.methods.ownerOf(i).call()
        if (address == owner) {
            ids.push(i)
        }
    }

    console.log(ids)

}

getIDs("0x68DB45FcC9005d4f1BF60D7Cb0D8475D8a5B7a54")


