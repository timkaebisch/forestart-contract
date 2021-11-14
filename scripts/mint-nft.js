const path = require('path')
require("dotenv").config({path: path.resolve(__dirname, '../.env') }) // configure path to .env
const { API_URL, PRIVATE_KEY, PUBLIC_KEY } = process.env; // get variables from .env


const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/FORESTART.sol/FORESTART.json"); // path to abi
const contractAddress = "0x9B117bC41f66FE6968a6A5A78FA9633b7904651C" // address contract
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)


async function mintNFT(tokenURI) {

    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); // get latest nonce

    // create tx
    const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 500000,
        'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI() 
    };

    // sign tx
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            function(err, hash) {
                if(!err) {
                    console.log("The hash of your transaction is: ", hash)
                } else {
                  console.log("Something went wrong when submitting your transaction:", err)
                }
            }
        )
    })
    .catch((err) => {
        console.log("Promise failed: ", err)
    })
}

mintNFT("https://gateway.pinata.cloud/ipfs/QmZVW6KAHv8zRCWmDbDoWLBtZfnisTCLbt1msSCuTPThb5") // URI of nft-metadata.json





